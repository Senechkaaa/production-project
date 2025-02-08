import { LoginSchema } from "../types/loginSchema"
import { loginActions, loginReducer } from "./loginSlice"

describe("loginSlice.test", () => {
    test("test set username", () => {
        const state: DeepPartial<LoginSchema> = {
            username: "user1",
        };
        expect(
            loginReducer(
                state as LoginSchema,
                loginActions.setUsername("123123"),
                // вызываем Action setUsername изменяя значение
            ),
        ).toEqual({ username: "123123" })
    })

    test("test set password", () => {
        const state: DeepPartial<LoginSchema> = {
            password: "qwerty",
        }
        expect(
            loginReducer(
                state as LoginSchema,
                loginActions.setPassword("qwertt12"),
                // вызываем Action setPassword изменяя значение
            ),
        ).toEqual({ password: "qwertt12" })
    })

})
