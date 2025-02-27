// fetchArticleRecommendations

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig } from "app/providers/StoreProvider"
import { Article } from "entities/Article"
import { addQueryParams } from "shared/lib/url/addQueryParams/addQueryParams"
import { ArticleType } from "entities/Article/model/types/article"

export const fetchArticleRecommendations = createAsyncThunk<
    Article[],
    void,
    ThunkConfig<string>
>(
    // 1 аргумент, что что возвращаем
    // 2 аргумент, что принимаем
    "articleDetailsPage/fetchArticleRecommendations",
    async (_, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI
        try {
            const response = await extra.api.get<Article[]>("/articles", {
                params: {
                    _limit: 4,
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
