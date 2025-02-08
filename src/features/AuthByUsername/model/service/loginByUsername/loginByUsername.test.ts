import { loginByUsername } from "./loginByUsername"
import { userActions } from "entities/User"
import { TestAsyncThunk } from "shared/lib/tests/TestAsyncThunk/TestAsyncThunk"


describe("loginByUsername.test", () => {
    test("success login", async () => {
        const userValue = { username: "user1", id: "1" }

        const thunk = new TestAsyncThunk(loginByUsername)
        thunk.api.post.mockReturnValue(Promise.resolve({ data: userValue }))
        const result = await thunk.callThunk({
            username: "123",
            password: "123",
        })

        expect(thunk.dispatch).toHaveBeenCalledWith(
            userActions.setAuthData(userValue),
        ) // проверка аргументов dispacth
        expect(thunk.dispatch).toHaveBeenCalledTimes(3) // проверка, сколько раз вызвался dispatch
        expect(thunk.api.post).toHaveBeenCalled() // проверим, что post вообще вызвался
        expect(result.meta.requestStatus).toBe("fulfilled") // проверка, что выполнилось без ошибки
        expect(result.payload).toEqual(userValue) // сравниваем
    })

    test("error login", async () => {
        const thunk = new TestAsyncThunk(loginByUsername)
        thunk.api.post.mockReturnValue(Promise.resolve({ status: 403 }))
        const result = await thunk.callThunk({
            username: "123",
            password: "123",
        })

        expect(thunk.dispatch).toHaveBeenCalledTimes(2) // вызов dispatch 2 раза
        expect(thunk.api.post).toHaveBeenCalled() // проверим, что post вообще вызвался
        expect(result.meta.requestStatus).toBe("rejected") // проверка, что статус с ошибкой
        expect(result.payload).toBe("error") // payload - error
    })
})
