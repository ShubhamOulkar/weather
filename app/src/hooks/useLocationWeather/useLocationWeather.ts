import { useQuery } from "@tanstack/react-query"
import { fetchCityData } from "../../utils/apis/fetchCityData/fetchCityData"
import { fetchCurrentWeatherData } from "../../utils/apis/fetchCurrentWeatherData/fetchCurrentWeatherData"
import type { LocationInput, FormattedDateParts, Cooradinates, LookUpReturn } from "../../types/types"
import { getLocalDate } from "../../utils/local_date/getLocalDate"
import { fetchLocationByCoords } from "../../utils/apis/fetchLocByCoords/fetchLocByCoords"
import formatBtnTitle from "../../utils/formatBtnTitle/formatBtnTitle"
/**
 * This hook return weather data by city name and GPS with fallback to ip address
 */

export default function useLocationWeather(input?: LocationInput, ipData?: LookUpReturn) {
  const getDate = () => {
    return getLocalDate(undefined,
      { minute: '2-digit' })
  }
  return useQuery({
    queryKey: ["locWeather", input, ipData],
    queryFn: async () => {
      let coords: Cooradinates
      let place: string
      let date: FormattedDateParts = getDate()

      if (!input) {
        // fallback: get location data from ip
        const res = await fetchCityData(ipData?.capital!, 1)
        coords = res[0].coords
        place = `${ipData?.capital}, ${ipData?.country}`
      } else if (input.city) {
        // here two search action happens
        // 1st on when user types and select place from drop down then
        // dont need to find coordinates since dropdown already have coordinates
        if (input.coords) {
          coords = input.coords!
          place = input.city
        } else {
          // 2nd user did not select from drop down but directly click on search button
          // then we need to find coordinates for a place
          const res = await fetchCityData(input.city, 1)
          coords = res[0].coords
          place = formatBtnTitle(res[0])
        }
      } else if (input.coords) {
        // get location data from gps
        coords = input.coords
        const res = await fetchLocationByCoords(coords)
        place = formatBtnTitle(res)
      } else {
        throw new Error('Invalid location input')
      }

      // get weather data for coords
      const weatherData = await fetchCurrentWeatherData(coords)

      return { ...coords, ...weatherData, place, date }
    },
    initialData: {
      place: 'Hupari, MH, IN',
      date: getDate(),
      temp: 20,
      wmo: 96,
      metrics: [
        { value: 10, key: "Feels Like" },
        { value: 8, key: "Humidity" },
        { value: 10, key: "Wind" },
        { value: 2, key: "Precipitation" }
      ],
      latitude: 16.61622093,
      longitude: 74.4059719,
      locDate: getDate(),
    }
  })
}
