import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig } from "app/providers/StoreProvider"
import { Article } from "entities/Article"
import { getArticlesPageLimit } from "../../selectors/articlesPageSelector"

interface FetchArticlesListProps {
    page?: number
}

export const fetchArticlesList = createAsyncThunk<
    Article[],
    FetchArticlesListProps,
    ThunkConfig<string>
>(
    // 1 аргумент, что что возвращаем
    // 2 аргумент, что принимаем
    "articlesPage/fetchArticlesList",
    async (props, thunkAPI) => {
        const { extra, rejectWithValue, getState } = thunkAPI
        const { page = 1 } = props
        const limit = getArticlesPageLimit(getState())

        try {
            const response = await extra.api.get<Article[]>("/articles", {
                params: {
                    _expand: "user",
                    // указываем, что к комментариям нужно добавить юзера
                    _limit: limit,
                    _page: page
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
