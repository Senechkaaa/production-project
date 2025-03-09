import { StateSchema } from "app/providers/StoreProvider"
import { getProfileValidateError } from "./getProfileValidateErrors"
import { ValidateProfileError } from "../../types/editableProfileCardSchema"

describe("getProfileValidateError.test", () => {
    test("should return error", () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                validateError: [
                    ValidateProfileError.SERVER_ERROR,
                    ValidateProfileError.INCORECT_AGE
                ],
            },
        }
        expect(getProfileValidateError(state as StateSchema)).toEqual([
            ValidateProfileError.SERVER_ERROR,
            ValidateProfileError.INCORECT_AGE,
        ])
    })

    test("should work with empty state", () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getProfileValidateError(state as StateSchema)).toEqual(undefined)
    })
})
