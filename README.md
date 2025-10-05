# Weather App   

A modern weather web application that provides real-time weather data, forecasts, and interactive features to enhance the user experience. Design is focused on separation of concerns and maintainability.

---

## Table of Contents

- [Overview](#overview)
  - [Features](#features)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My Process](#my-process)
  - [Built With](#built-with)
  - [Error handling](#error-handling)
  - [What I Learned](#what-i-learned)
  - [Useful Resources](#useful-resources)
- [Installation](#installation)
- [Changelog](/changelog.md)
- [Author](#author)
- [License](#license)

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
- 🎙 Use voice search to find weather quickly.  

### Screenshot  
![Project Preview](/docs/project_preview.png)

### Links
- 🚀 [Live Demo](https://weather-inky-delta.vercel.app/)  

---

## My Process

### Built With
- **Vite** (bundler)  
- **React** + **React Query (TanStack)**  
- **CSS Modules** with custom properties & variable fonts  
- **Mobile-first workflow**  
- Light/Dark mode via system preference  
- **Vitest** + **React Testing Library** for testing

### Error handling
Used a class-based ErrorBoundary integrated with React Query’s QueryErrorResetBoundary and useQueryErrorResetBoundary hook.
This setup ensures query errors and runtime errors are gracefully isolated to their component scope.
The Retry button in the fallback UI calls both the local ErrorBoundary.reset() and React Query’s reset() to trigger automatic re-fetching of failed data.

### What I Learned
- Efficient data fetching and caching using React Query.  
- Managing geolocation APIs and permissions. 
- Creating a scalable and responsive UI with CSS Grid and Flexbox.  
- Implementing accessibility best practices for interactive UI elements.  
- Testing react query
- Error Boundaries : Error handling in react query. Catching runtime errors that happen during rendering, and react properly to them by displaying a fallback UI instead.

### Useful Resources
- [OpenMeteo API](https://open-meteo.com/) – Free weather data API used.  
- [TanStack Query Docs](https://tanstack.com/query/latest) – React Query documentation.  
- [React query error handling](https://tkdodo.eu/blog/react-query-error-handling) - TkDodo's blog post on react query handling

---

## Installation

Clone and set up the project locally:

```bash
# Clone the repository
git clone https://github.com/ShubhamOulkar/weather.git

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
## Changelog 
 - [changelog](./changelog.md)

## Author

- LinkedIn - [@shubham](www.linkedin.com/in/shubham-oulkar)
- Frontend Mentor - [@shubham](https://www.frontendmentor.io/profile/ShubhamOulkar)
- X - [@shubham](https://x.com/shubhuoulkar)
## License

Content submitted by [shubham oulkar](https://github.com/ShubhamOulkar) is Creative Commons Attribution 4.0 International licensed, as found in the [LICENSE](/LICENSE) file.