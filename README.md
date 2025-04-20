# Movie Recommendation Frontend

This is the frontend of the **Movie Recommendation System**, a full-stack web application that allows users to register, log in, browse movie data, and view automatically recommended related movies based on their searches. The project is structured across separate repositories for the frontend, backend, and infrastructure.

🛠️ This frontend is built using **React + Vite**, and communicates with a Spring Boot backend deployed on AWS EC2.

> ⚠️ This project is currently in development. 

---

## 🌐 Live Deployment (Vercel)

Frontend is deployed at:  
*(I will update it later)*

---

## 📦 Tech Stack

- **Frontend**: React + Vite + Axios
- **State Management**: useState, useContext, localStorage
- **Routing**: React Router DOM
- **Deployment**: Vercel
- **Auth**: JWT via Authorization Header

---

## 📊 Data Visualization Highlight

One of the most notable features of this frontend is the **interactive rating-based visualization** of the user's movie search history:

### 🎯 Search History Rating Chart

- Visualizes previously searched movies as **dots on a vertical rating axis**
- Movies are sorted by rating (**high scores appear at the top**)
- Each dot represents a movie; hovering shows a floating movie card
- Newly added search results will **auto-highlight** for a few seconds
- **Color intensity** is mapped to score magnitude (higher scores = darker dots)
- Genre tags are color-coded for improved differentiation and contrast

Built using **D3.js**, fully integrated with React components.

![Rating Visualization](./movie-recommendation/assets/visual-demo.png)

---

## 🔗 Related Repositories

- **Backend** (Spring Boot + JWT Auth + RESTful APIs + Packer):  
  👉 [Backend Repo](https://github.com/xiaoyuwang0314/cloud-computing-project/tree/main/cloud-native-web-application)

- **Infrastructure** (AWS EC2 + Terraform CI/CD):  
  🛠️ [Infra Repo](https://github.com/xiaoyuwang0314/cloud-computing-infra)

- **Recommendation Engine (Planned)**  
  > 🚧 Not started yet — still in “thinking real hard about it” phase.
