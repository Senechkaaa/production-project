import { TestAsyncThunk } from "shared/lib/tests/TestAsyncThunk/TestAsyncThunk"
import { fetchProfileData } from "./fetchProfileData"
import { Currency } from "entities/Currency"
import { Country } from "entities/Country"

const data = {
    username: "admin",
    age: 15,
    city: "fdsfd",
    first: "Loloshka",
    lastname: "Lolokov",
    country: Country.Canada,
    currency: Currency.USD,
}


describe("fetchProfileData.test", () => {
    test("success", async () => {

        const thunk = new TestAsyncThunk(fetchProfileData)
        thunk.api.get.mockReturnValue(Promise.resolve({ data: data }))
        const result = await thunk.callThunk();

        expect(thunk.api.get).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe("fulfilled");
        expect(result.payload).toEqual(data)
    })

    test("error login", async () => {
        const thunk = new TestAsyncThunk(fetchProfileData)
        thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }))
        const result = await thunk.callThunk();

        expect(result.meta.requestStatus).toBe("rejected")
    })
})
