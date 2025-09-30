import { describe, it, expect } from "vitest"
import getAqiIndex from "./getAqiIndex"

const aqi: number[] = [20, 80, 120, 180, 220, 330]
const label: string[] = ['Good', 'Moderate', 'Bad', 'Unhealthy', 'Danger', 'Hazardous']

describe("Test get aqui index utility", () => {
    it("should return label with value", () => {
        aqi.forEach((a, i) => {
            const res = getAqiIndex(a)
            expect(res).toEqual({ label: label[i], value: aqi[i] })
        })
    })

    it("Should return null if aqi value is not given", () => {
        //@ts-expect-error
        const res = getAqiIndex()
        expect(res).toBe(null)
    })
})