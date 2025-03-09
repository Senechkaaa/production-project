import { Country } from "entities/Country"
import { ProfileSchema } from "../types/editableProfileCardSchema"
import { profileActions, profileReducer } from "./profileSlice"
import { Currency } from "entities/Currency"
import { updateProfileData } from "../service/updateProfileData/updateProfileData"
import { ValidateProfileError } from "../consts/consts"

const data = {
    username: "admin",
    age: 15,
    city: "fdsfd",
    first: "Loloshka",
    lastname: "Lolokov",
    country: Country.Canada,
    currency: Currency.USD,
}

describe("profileSlice.test", () => {
    test("test set Readonly", () => {
        const state: DeepPartial<ProfileSchema> = { readonly: false }
        expect(
            profileReducer(
                state as ProfileSchema,
                profileActions.setReadonly(true),
            ),
        ).toEqual({ readonly: true })
    })

    test("test cancel edit", () => {
        const state: DeepPartial<ProfileSchema> = {
            readonly: false,
            form: { username: "" },
            data,
        }
        expect(
            profileReducer(state as ProfileSchema, profileActions.cancelEdit()),
        ).toEqual({
            readonly: true,
            validateError: undefined,
            form: data,
            data,
        })
    })

    test("exit update profile", () => {
        const state: DeepPartial<ProfileSchema> = {
            form: { first: "dfsjoifds" },
        }
        expect(
            profileReducer(
                state as ProfileSchema,
                profileActions.updateProfile({ first: "Hoshy" }),
            ),
        ).toEqual({
            form: { first: "Hoshy" },
        })
    })

    test("exit update profile service pending", () => {
        const state: DeepPartial<ProfileSchema> = {
            isLoading: false,
            validateError: [ValidateProfileError.SERVER_ERROR],
        }
        expect(
            profileReducer(state as ProfileSchema, updateProfileData.pending),
        ).toEqual({
            isLoading: true,
            validateError: undefined,
        })
    })

    test("exit update profile service fullfiled", () => {
        const state: DeepPartial<ProfileSchema> = {
            isLoading: true,
            validateError: [ValidateProfileError.SERVER_ERROR],
        }
        expect(
            profileReducer(state as ProfileSchema, updateProfileData.fulfilled(data, '')),
        ).toEqual({
            isLoading: false,
            readonly: true,
            validateError: undefined,
            form: data,
            data
        })
    })
})
