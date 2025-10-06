- 06-10-2025 : feat : native useSpeechRecognitionNative hook [PR#16](https://github.com/ShubhamOulkar/weather/pull/16)

- 05-10-2025 : feat + testing [PR#13](https://github.com/ShubhamOulkar/weather/pull/13)
    - Add animations
    - add react query hooks testing
    
- 05-10-2025 : feat : voice search [PR #14](https://github.com/ShubhamOulkar/weather/pull/14)
    - Starts listening when the button is clicked.
    - Automatically stops after 10 seconds.
    - Updates the search query live while listening.
    - Validates the search input using `SearchSchema`.
    - Shows toast notifications for errors and info.

- 04-10-2025 : feat: Error handling [(PR #10)](https://github.com/ShubhamOulkar/weather/pull/10)
    - Error handling in react query and react error boundaries
    - improve design for visual interaction
    - SEO
    - Accessibility
    
- 03-10-2025 : feat: add to favorite location [(PR #09)](https://github.com/ShubhamOulkar/weather/pull/9)
    - added favorite location context
    - User can add locations into favorites list
    - reduce JS bundle by `6kb`. Logo and background are rendered as images using picture element.
    - fixed layout issues
    - [hook: add hook to toggle dropdowns](https://github.com/ShubhamOulkar/weather/pull/8/commits/14d655f26f7f589bb86866da5c785281cb1fd4bb)
    - [fix: show houly data from current time](https://github.com/ShubhamOulkar/weather/pull/8/commits/7f9de70299203be4c7fe69422548e681feb355da)

- 30-09-2025 : Add website functionality
    - custom hooks (useLocationWeather, useIplookup, useLiveSearch, useGpsLocation, etc)
    - weather API calls (open-meteo, open weather map, ipwhois)
    - custom utility functions (getWeatherIcon, groupHourlyByDay, getAqiIndex, getLocalDate, etc)
    - used tan stack react query for API calls
    - Added some unit testing for the utilities functions
    - Added Unit system context
    - Added Current location context (query weather data for latitude, longitude, place name and weather metrics) 
    - geocoding, reverse geocoding, weather(current, daily, hourly) api's

- 22-09-2025 : custom hook useDismisal(#3)
    - add `useDismissalOutside` hook with tests
    - fix responsive UI issues
    - Add custom dropdown components with a11y improvements 
    - This PR is dedicated to improving client performance and responsive website
    - Achieved 100% results as planned, verify it from lighthouse results. 🥳

- 17-09-2025 : *feat: responsive UI*
    - Add responsive UI
    - Update license and features list
    - add compressed web fonts

- 10-09-2025 : *Project setup*
    - CSS custom properties and global CSS reset
    - Self hosted variable fonts
    - CSS Grid, flex box
    - Setup light/dark system color theme prefernces
    - CSS modules
    - Mobile-first workflow
    - React
    - vite
    - Setup vercel development server