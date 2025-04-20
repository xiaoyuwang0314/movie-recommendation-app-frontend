import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import MovieCard from "./MovieCard";
import "../styles/MovieTimeline.css";

export default function MovieTimeline({ history }) {
    const svgRef = useRef();
    const [hoveredMovie, setHoveredMovie] = useState(null);
    const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
    const [autoShowMovieId, setAutoShowMovieId] = useState(null);

    useEffect(() => {
        if (!history || history.length === 0) return;

        const filtered = history.filter(d => typeof d.rating === "number");
        const sorted = [...filtered].sort((a, b) => b.rating - a.rating);

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        const margin = { top: 20, right: 20, bottom: 20, left: 50 };
        const width = 300;
        const height = 500;
        const dotX = 40;

        const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

        const y = d3.scaleLinear()
            .domain([2, 5])
            .range([height - margin.top - margin.bottom, 0]);

        g.append("g")
            .call(d3.axisLeft(y).tickFormat(d3.format(".1f")).ticks(7))
            .selectAll("text")
            .style("font-size", "11px");

        const x = dotX;

        const colorScale = d3.scaleLinear()
            .domain([1, 5])
            .range([0.2, 1]);

        const dotGroups = g.selectAll(".dot-group")
            .data(sorted)
            .enter()
            .append("g")
            .attr("class", "dot-group")
            .attr("transform", (d) => {
                const yPos = y(d.rating);
                d._dotPos = { x: x + margin.left, y: yPos + margin.top };
                return `translate(${x}, ${yPos})`;
            });

        dotGroups.append("circle")
            .attr("class", "dot")
            .attr("r", 6)
            .style("fill", d => `rgba(74, 144, 226, ${colorScale(d.rating)})`)
            .style("cursor", "pointer")
            .on("mouseover", (event, d) => {
                setHoveredMovie(d);
                setTooltipPos(d._dotPos);
                d3.select(event.currentTarget)
                    .transition().duration(200)
                    .attr("r", 8)
                    .style("stroke", "#333")
                    .style("stroke-width", 1.5);
            })
            .on("mouseout", (event, d) => {
                setHoveredMovie(null);
                d3.select(event.currentTarget)
                    .transition().duration(200)
                    .attr("r", 6)
                    .style("stroke", "none");
            });

        dotGroups.append("text")
            .attr("x", 16)
            .attr("dy", "0.35em")
            .attr("text-anchor", "start")
            .text(d => d.title)
            .style("font-size", "12px")
            .style("fill", "#555");

        const last = history[history.length - 1];
        const autoItem = sorted.find(item => item.movieId === last.movieId);
        if (autoItem) {
            setHoveredMovie(autoItem);
            setTooltipPos(autoItem._dotPos);
            setAutoShowMovieId(autoItem.movieId);

            const timeout = setTimeout(() => {
                setHoveredMovie(null);
                setAutoShowMovieId(null);
            }, 3000);

            return () => clearTimeout(timeout);
        }

    }, [history]);

    if (!history || history.length === 0) return null;

    return (
        <div className="timeline-container">
            <h3>Rating Distribution (High → Low)</h3>
            <svg ref={svgRef} width={600} height={600}></svg>

            {hoveredMovie && tooltipPos && (
                <div
                    className={`timeline-tooltip ${autoShowMovieId === hoveredMovie.movieId ? "auto-show" : ""}`}
                    style={{
                        top: tooltipPos.y + "px",
                        left: tooltipPos.x + 300 + "px",
                    }}
                >
                    <MovieCard movie={hoveredMovie} />
                </div>
            )}
        </div>
    );
}