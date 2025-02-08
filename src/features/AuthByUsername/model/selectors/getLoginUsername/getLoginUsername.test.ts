import { StateSchema } from "app/providers/StoreProvider"
import { getLoginUsername } from "./getLoginUsername"

describe("getLoginUsername.test", () => {
    test("should return value", () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: {
                username: "Tom"
            },
        }
        expect(getLoginUsername(state as StateSchema)).toEqual("Tom")
    })

    test("should work with empty state", () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getLoginUsername(state as StateSchema)).toEqual("")
    })
})
