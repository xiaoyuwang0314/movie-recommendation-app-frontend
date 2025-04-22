# Movie Recommendation Frontend

This is the frontend of the **Movie Recommendation System**, a full-stack web application that allows users to register, log in, browse movie data, rate movies, and view intelligent visualizations based on their history. It communicates with a Spring Boot backend deployed on AWS EC2, and the frontend is hosted via Vercel with HTTPS enabled via Cloudflare.

> This project is under active development. Some features are experimental or incomplete.

---

## Live Site

- https://frontend.justanotherapp.me  

---

## Key Features

- **JWT Authentication**  
  Secure registration and login with token-based authentication.

- **Movie Search**  
  Users can query movies by entering a numeric `movieId`.

- **Rating Visualization**  
  - Vertical chart sorted by rating (5.0 at the top)  
  - Circle markers with color intensity mapped to rating scores  
  - Hover to reveal floating movie cards  
  - Auto-display of latest result using debounce and fade-out animation

- **Search History Management**  
  - Avoids duplicate entries  
  - Maintained with Context API and localStorage  
  - One-click to clear all history

- **Input Validation**  
  - Accepts only numeric movie IDs  
  - Provides real-time feedback for invalid input

---

## Visualization Example

An interactive timeline of searched movies, built with D3.js and React:

![Rating Chart Demo](./movie-recommendation/assets/visual-demo.png)

---

## Tech Stack

| Layer         | Technology                                      |
|---------------|--------------------------------------------------|
| Frontend      | React (with Vite), React Router, Axios           |
| State Management | React Context API, localStorage             |
| Visualization | D3.js and SVG                                    |
| Authentication | JWT via `Authorization: Bearer` header         |
| Deployment    | Vercel (frontend), EC2 (backend), Cloudflare DNS |

---

## Related Repositories

- **Backend** (Spring Boot + JWT + REST API):  
  [cloud-native-web-application](https://github.com/xiaoyuwang0314/cloud-computing-project/tree/main/cloud-native-web-application)

- **Infrastructure** (Terraform + Packer + EC2):  
  [cloud-computing-infra](https://github.com/xiaoyuwang0314/cloud-computing-infra)  
  > Note: While this repo provides full AWS provisioning (including NLB, CloudWatch, multi-tier setup), current deployment skips some components (like load balancer) to reduce cost.

- **Recommendation Engine**  
  Not yet implemented – under planning and design.

---

## In Progress

| Feature | Status | Notes |
|--------|--------|-------|
| TMDB Poster Integration | Planned | Will use `/v1/link/{id}` to get `tmdbId` and fetch movie images |
| Dark Mode Toggle | Planned | To be implemented using CSS variables in the footer |
| Genre-based Graph Visualization | Designing | Interactive network graph of movies sharing common genres |
| CI/CD and Deployment | Complete | Vercel + Cloudflare, auto-deployment via GitHub commits |

---

## Known Issues

- **Token Storage (localStorage)**  
  Token is currently stored in `localStorage`, which may be vulnerable to XSS. For better security, consider switching to HttpOnly cookies in production.

- **Load Balancer Skipped in Deployment**  
  NLB and is excluded in current deployment to save cost, although supported in infrastructure code.

- **Token Not Cleared on Logout**  
  After logout, the token remains in localStorage until page refresh. Needs improvement in session cleanup logic.
