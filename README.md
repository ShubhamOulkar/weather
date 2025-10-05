# Weather App   

A modern weather web application that provides real-time weather data, forecasts, and interactive features to enhance the user experience. Design is focused on separation of concerns and maintainability.

---

## Table of Contents

- [Overview](#overview)
  - [Screenshot](#screenshot)
  - [Links](#links)
  - [Features](#features)
- [My Process](#my-process)
  - [Built With](#built-with)
  - [Keyboard Search functionality](#search-functionality)
  - [useDismissalOutside hook](#useDismissalOutside-hook)
  - [Voice search features](#voice-search-features)
  - [Error handling](#error-handling)
  - [What I Learned](#what-i-learned)
  - [Useful Resources](#useful-resources)
- [Installation](#installation)
- [Changelog](/changelog.md)
- [Author](#author)
- [License](#license)

---

## Overview

### Screenshot  
![Project Preview](/docs/project_submission.png)

### Links
- 🚀 [Live Demo](https://weather-inky-delta.vercel.app/) 

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
- 🎙 Use voice search to find weather quickly(🚧).   

---

## My Process

### Built With
- **Vite** (bundler)  
- **React** + **React Query (TanStack)**  
- **CSS Modules** with custom properties & variable fonts  
- **Mobile-first workflow**  
- Light/Dark mode via system preference  
- **Vitest** + **React Testing Library** for testing

### Keyboard search functionality
The SearchForm component is a feature-rich, interactive input for location-based search. It combines immediate feedback (live search), client-side validation, accessibility features, and GPS integration to provide a robust user experience.

Key Features: 
- Live Search with Debouncing: Provides real-time suggestions as the user types, using the useLiveSearch hook to efficiently query data. The search query is debounced by 500ms to prevent excessive API calls while the user is actively typing.

- Form Validation: Uses SearchSchema for client-side validation of the search input, displaying immediate error messages when invalid input is detected.

- Dismissal Outside: Uses the useDismissalOutside hook to close the live search dropdown when the user clicks or focuses anywhere outside the search input and dropdown area.

- GPS Integration: Allows users to automatically use their current location with the "Locate me" button, utilizing the useGpsLocation hook.

- Speech Recognition: Includes a dedicated button for voice input, enhancing accessibility and ease of use.

- Location Context Management: Updates the global application state for the user's current location (city and/or coords) via the useLocation context.

### useDismissalOutside hook
  A React hook to manage the dismissal of components (like dropdowns, modals, or tooltips) when a user clicks or focuses outside of the component and its associated trigger element. This hook is reusable on all dropdowns from search dropdowns to any select dropdown.

### Voice search features 
  - Starts listening when the button is clicked.
  - Automatically stops after 10 seconds.
  - Updates the search query live while listening.
  - Validates the search input using `SearchSchema`.
  - Shows toast notifications for errors and info.

### Error handling
  Used a class-based ErrorBoundary integrated with React Query’s QueryErrorResetBoundary and useQueryErrorResetBoundary hook.
  This setup ensures query errors and runtime errors are gracefully isolated to their component scope.
  The Retry button in the fallback UI calls both the local ErrorBoundary.reset() and React Query’s reset() to trigger automatic re-fetching of failed data.

### Testing
  Vitest for the test runner and React Testing Library (RTL) to ensure the hook functions correctly from a user's perspective.

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