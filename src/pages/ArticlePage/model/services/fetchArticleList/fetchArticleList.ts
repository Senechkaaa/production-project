import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig } from "app/providers/StoreProvider"
import { Article } from "entities/Article"

export const fetchArticlesList = createAsyncThunk<
    Article[],
    void,
    ThunkConfig<string>
>(
    // 1 аргумент, что что возвращаем
    // 2 аргумент, что принимаем
    "articlesPage/fetchArticlesList",
    async (_, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI

        try {
            const response = await extra.api.get<Article[]>("/articles", {
                params: {
                    _expand: "user",
                    // указываем, что к комментариям нужно добавить юзера
                },
            })

            if (!response.data) {
                throw new Error()
            }

            return response.data
        } catch (e) {
            return rejectWithValue("error")
        }
    },
)

