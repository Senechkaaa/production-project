import { validateProfileData } from "./validateProfileData"
import { Currency } from "entities/Currency"
import { Country } from "entities/Country"
import { ValidateProfileError } from "../../consts/consts"

const data = {
    username: "admin",
    age: 15,
    city: "fdsfd",
    first: "Loloshka",
    lastname: "Lolokov",
    country: Country.Canada,
    currency: Currency.USD,
}

describe("validateProfileData.test", () => {
    test("success", async () => {
        const result = validateProfileData(data)

        expect(result).toEqual([])
    })

    test("without first and last name", async () => {
        const result = validateProfileData({...data, first: '', lastname: ''})
        expect(result).toEqual([ValidateProfileError.INCORECT_USER_DATA])
    })

    test("incorrect age", async () => {
        const result = validateProfileData({ ...data, age: undefined })
        expect(result).toEqual([ValidateProfileError.INCORECT_AGE])
    })

    test("incorrect country", async () => {
        const result = validateProfileData({ ...data, country: undefined })
        expect(result).toEqual([ValidateProfileError.INCORECT_COUNTRY])
    })

    test("incorrect all", async () => {
        const result = validateProfileData({})
        expect(result).toEqual([
            ValidateProfileError.INCORECT_USER_DATA,
            ValidateProfileError.INCORECT_AGE,
            ValidateProfileError.INCORECT_COUNTRY,
        ])
    })
})
