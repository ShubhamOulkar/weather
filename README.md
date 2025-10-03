# Weather App  

![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)  
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)  
![TanStack Query](https://img.shields.io/badge/TanStack%20Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white)  
![CSS Modules](https://img.shields.io/badge/CSS%20Modules-000000?style=for-the-badge&logo=css3&logoColor=blue)  
![License](https://img.shields.io/github/license/ShubhamOulkar/weather-app?style=for-the-badge)  
![Build](https://img.shields.io/github/actions/workflow/status/ShubhamOulkar/weather-app/ci.yml?style=for-the-badge&label=build)  
![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)  

A modern weather web application that provides real-time weather data, forecasts, and interactive features to enhance the user experience.

---

## Table of Contents

- [Overview](#overview)
  - [Features](#features)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My Process](#my-process)
  - [Built With](#built-with)
  - [What I Learned](#what-i-learned)
  - [Continued Development](#continued-development)
  - [Useful Resources](#useful-resources)
- [Installation](#installation)
- [Author](#author)
- [License](#license)
- [Changelog](/changelog.md)

---

## Overview

### Features (The Challenge)

Users can:  
- 🔍 Search for weather by entering a city or using device geolocation.  
- 🌡 View current conditions: temperature, weather icon, and location details.  
- 📊 Explore metrics: "feels like", humidity, wind speed, precipitation, AQI.  
- 📅 Check a **7-day forecast** with highs/lows and weather icons.  
- 🕒 Browse **hourly forecasts** with temperature trends.  
- 📌 Switch between days in the hourly forecast.  
- 🔄 Toggle between **Metric** and **Imperial** units (C°/F°, km/h/mph, mm/inch).  
- 📱 Enjoy responsive layouts optimized for all devices.  
- 🖱 Experience hover/focus states for all interactive elements.  
- 📍 Detect current location automatically (first visit).  
- ⭐ Save favorite locations for quick access.  
- 🌞 View sunrise/sunset times with visual indicators.  
- ☀️🌧 Animated weather backgrounds based on live conditions.  
- 📲 Install as a **PWA** (Progressive Web App).  
- 🎙 Use voice search to find weather quickly.  

### Screenshot  
![Project Preview](/docs/project_preview.png)

### Links
- 🚀 [Live Demo](https://weather-inky-delta.vercel.app/)  
- 📂 [Repository](https://github.com/ShubhamOulkar/weather-app)

---

## My Process

### Built With
- ⚡ **Vite** (bundler)  
- ⚛️ **React** + **React Query (TanStack)**  
- 🎨 **CSS Modules** with custom properties & variable fonts  
- 📱 **Mobile-first workflow**  
- 🌗 Light/Dark mode via system preference  
- 🧪 **Vitest** + **React Testing Library** for testing  

### What I Learned
- Efficient data fetching and caching using React Query.  
- Managing geolocation APIs and permissions. 
- Creating a scalable and responsive UI with CSS Grid and Flexbox.  
- Implementing accessibility best practices for interactive UI elements.  

### Useful Resources
- [OpenMeteo API](https://open-meteo.com/) – Free weather data API used.  
- [TanStack Query Docs](https://tanstack.com/query/latest) – React Query documentation.  
- [PWA Guide](https://web.dev/learn/pwa/) – Best practices for Progressive Web Apps.  

---

## Installation

Clone and set up the project locally:

```bash
# Clone the repository
git clone https://github.com/ShubhamOulkar/weather-app.git

# Navigate to project
cd weather-app

# Install dependencies
pnpm install

# Create .env file and add your API keys if needed
cp .env.example .env

# Start development server
pnpm dev
```
for testing

```bash
pnpm test 
pnpm coverage
pnpm test:preview
```
for build and preview
```bash
pnpm preview
```
## Author

- LinkedIn - [@shubham](www.linkedin.com/in/shubham-oulkar)
- Frontend Mentor - [@shubham](https://www.frontendmentor.io/profile/ShubhamOulkar)
- X - [@shubham](https://x.com/shubhuoulkar)
## License

Content submitted by [shubham oulkar](https://github.com/ShubhamOulkar) is Creative Commons Attribution 4.0 International licensed, as found in the [LICENSE](/LICENSE) file.