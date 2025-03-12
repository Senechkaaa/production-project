import { TestAsyncThunk } from "@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk"
import { updateProfileData } from "./updateProfileData"
import { Currency } from "@/entities/Currency"
import { Country } from "@/entities/Country"
import { ValidateProfileError } from "../../consts/consts"

const data = {
    username: "admin",
    age: 15,
    city: "fdsfd",
    first: "Loloshka",
    lastname: "Lolokov",
    country: Country.Canada,
    currency: Currency.USD,
    id: "1"
}


describe("updateProfileData.test", () => {
    test("success", async () => {
        const thunk = new TestAsyncThunk(updateProfileData, {
            profile: {
                form: data
            }
        })
        thunk.api.put.mockReturnValue(Promise.resolve({ data: data }))
        const result = await thunk.callThunk()

        expect(thunk.api.put).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe("fulfilled")
        expect(result.payload).toEqual(data)
    })

    test("error", async () => {
        const thunk = new TestAsyncThunk(updateProfileData, {
            profile: {
                form: data,
            },
        })
        thunk.api.put.mockReturnValue(Promise.resolve({ status: 403 }))
        
        const result = await thunk.callThunk()

        expect(result.meta.requestStatus).toBe("rejected")
        expect(result.payload).toEqual([
            ValidateProfileError.SERVER_ERROR
        ])
    })

    test("error", async () => {
        const thunk = new TestAsyncThunk(updateProfileData, {
            profile: {
                form: {...data, lastname: ''},
            },
        })

        const result = await thunk.callThunk()

        expect(result.meta.requestStatus).toBe("rejected")
        expect(result.payload).toEqual([ValidateProfileError.INCORECT_USER_DATA])
    })
})
