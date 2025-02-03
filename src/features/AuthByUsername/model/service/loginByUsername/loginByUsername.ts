import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { User, userActions } from "entities/User"
import { USER_LOCALSTORAGE_KEY } from "shared/const/localStorage"

interface LoginByUsernameProps {
    username: string
    password: string
}
// 3 вызова диспатча

// 1 вызов dispatch
export const loginByUsername = createAsyncThunk<
    User,
    LoginByUsernameProps,
    { rejectValue: string }
>("users/loginByUsername", async (authData, thunkAPI) => {
    try {
        const response = await axios.post<User>(
            "http://localhost:8000/login",
            authData,
        )
        if (!response.data) {
            throw new Error()
        }

        // 2 вызов dispatch
        thunkAPI.dispatch(userActions.setAuthData(response.data))
        localStorage.setItem(
            USER_LOCALSTORAGE_KEY,
            JSON.stringify(response.data),
        )

        // 3 вызов dispatch
        return response.data
    } catch (e) { // 1 вызов dispatch
        console.log(e)
        // 2 вызов dispatch
        return thunkAPI.rejectWithValue("error")
    }
})
