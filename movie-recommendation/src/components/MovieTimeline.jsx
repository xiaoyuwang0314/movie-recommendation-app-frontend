import {useEffect, useRef, useState} from "react";
import * as d3 from "d3";
import "../styles/MovieTimeline.css";
import MovieCard from "./MovieCard"

export default function MovieTimeline({history}) {
    const svgRef = useRef();
    const [hoveredMovie, setHoveredMovie] = useState(null);

    useEffect(() => {
        if (!history || history.length === 0) return;

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove(); // 清除之前的绘制

        const margin = {top: 20, right: 20, bottom: 30, left: 40};
        const width = 800 - margin.left - margin.right;
        const height = 100 - margin.top - margin.bottom;

        // SVG
        const g = svg.append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // timeline
        const x = d3.scaleLinear()
            .domain([0, history.length - 1])
            .range([0, width]);

        // add timeline
        g.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x).ticks(history.length).tickFormat(""));

        // dot
        const dots = g.selectAll(".dot")
            .data(history)
            .enter()
            .append("g")
            .attr("class", "dot-group")
            .attr("transform", (d, i) => `translate(${x(i)},${height / 2})`);

        // dot
        dots.append("circle")
            .attr("class", "dot")
            .attr("r", 6)
            .style("fill", "#4a90e2")
            .style("cursor", "pointer")
            .on("mouseover", (event, d) => {
                setHoveredMovie(d);
                d3.select(event.currentTarget)
                    .transition()
                    .duration(200)
                    .attr("r", 8)
                    .style("fill", "#357abd");
            })
            .on("mouseout", (event) => {
                setHoveredMovie(null);
                d3.select(event.currentTarget)
                    .transition()
                    .duration(200)
                    .attr("r", 6)
                    .style("fill", "#4a90e2");
            });

        // title
        dots.append("text")
            .attr("class", "movie-title")
            .attr("y", -15)
            .text(d => d.title)
            .style("font-size", "12px")
            .style("fill", "#666")
            .style("text-anchor", "middle");

    }, [history]);

    if (!history || history.length === 0) {
        return null;
    }

    return (
        <div className="timeline-container">
            <h3>Search History Timeline</h3>
            <svg ref={svgRef} width={800} height={120}></svg>
            {hoveredMovie && (
                <div className="timeline-tooltip">
                    <MovieCard movie={hoveredMovie}/>
                </div>
            )}
        </div>
    );
} 