import axios from "axios"
import { loginByUsername } from "./loginByUsername"
import { userActions } from "entities/User"
import { TestAsyncThunk } from "shared/lib/tests/TestAsyncThunk/TestAsyncThunk"

jest.mock("axios")
// мокаем axios

const mockedAxios = jest.mocked(axios, true)
// флаг true укаывает что мы мокаем внутренние поля, например post

describe("loginByUsername.test", () => {

    test("success login", async () => {
        const userValue = { username: "user1", id: "1" }
        mockedAxios.post.mockReturnValue(Promise.resolve({ data: userValue }))

        const thunk = new TestAsyncThunk(loginByUsername)
        const result = await thunk.callThunk({
            username: "123",
            password: "123",
        })

        expect(thunk.dispatch).toHaveBeenCalledWith(
            userActions.setAuthData(userValue),
        ) // проверка аргументов dispacth
        expect(thunk.dispatch).toHaveBeenCalledTimes(3) // проверка, сколько раз вызвался dispatch
        expect(mockedAxios.post).toHaveBeenCalled() // проверим, что post вообще вызвался
        expect(result.meta.requestStatus).toBe("fulfilled") // проверка, что выполнилось без ошибки
        expect(result.payload).toEqual(userValue) // сравниваем
    })

    test("error login", async () => {
        mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 }))
        const thunk = new TestAsyncThunk(loginByUsername)
        const result = await thunk.callThunk({
            username: "123",
            password: "123",
        })

        expect(thunk.dispatch).toHaveBeenCalledTimes(2) // вызов dispatch 2 раза
        expect(mockedAxios.post).toHaveBeenCalled() // проверим, что post вообще вызвался
        expect(result.meta.requestStatus).toBe("rejected") // проверка, что статус с ошибкой
        expect(result.payload).toBe("error") // payload - error
    })
})
