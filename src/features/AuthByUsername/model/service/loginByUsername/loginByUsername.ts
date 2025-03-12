import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig } from "@/app/providers/StoreProvider"
import { User, userActions } from "@/entities/User"
import { USER_LOCALSTORAGE_KEY } from "@/shared/const/localStorage"

interface LoginByUsernameProps {
    username: string
    password: string
}
// 3 вызова диспатча

// 1 вызов dispatch
export const loginByUsername = createAsyncThunk<
    User,
    LoginByUsernameProps,
    ThunkConfig<string>
>("users/loginByUsername", async (authData, thunkAPI) => {
    const { dispatch, extra, rejectWithValue } = thunkAPI

    try {
        const response = await extra.api.post<User>("/login", authData)
        if (!response.data) {
            throw new Error()
        }

        localStorage.setItem(
            USER_LOCALSTORAGE_KEY,
            JSON.stringify(response.data),
        )
        // 2 вызов dispatch
        dispatch(userActions.setAuthData(response.data))


        // 3 вызов dispatch
        return response.data
    } catch (e) {
        // 1 вызов dispatch
        console.log(e)
        // 2 вызов dispatch
        return rejectWithValue("error")
    }
})
