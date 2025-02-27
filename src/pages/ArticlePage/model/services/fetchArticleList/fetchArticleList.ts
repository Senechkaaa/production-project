import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig } from "app/providers/StoreProvider"
import { Article } from "entities/Article"
import {
    getArticlesPageLimit,
    getArticlesPageNum,
    getArticlesPageOrder,
    getArticlesPageSearch,
    getArticlesPageSort,
    getArticlesPageType,
} from "../../selectors/articlesPageSelector"
import { addQueryParams } from "shared/lib/url/addQueryParams/addQueryParams"
import { ArticleType } from "entities/Article/model/types/article"

interface FetchArticlesListProps {
    replace?: boolean
}

export const fetchArticlesList = createAsyncThunk<
    Article[],
    FetchArticlesListProps,
    ThunkConfig<string>
>(
    // 1 аргумент, что что возвращаем
    // 2 аргумент, что принимаем
    "articlesPage/fetchArticlesList",
    async (_, thunkAPI) => {
        const { extra, rejectWithValue, getState } = thunkAPI
        const page = getArticlesPageNum(getState())
        const limit = getArticlesPageLimit(getState())
        const sort = getArticlesPageSort(getState())
        const order = getArticlesPageOrder(getState())
        const search = getArticlesPageSearch(getState())
        const type = getArticlesPageType(getState())
        try {
            addQueryParams({ sort, order, search, type })
            const response = await extra.api.get<Article[]>("/articles", {
                params: {
                    _expand: "user",
                    // указываем, что к комментариям нужно добавить юзера
                    _limit: limit,
                    _page: page,
                    _sort: sort,
                    _order: order,
                    q: search,
                    type: type === ArticleType.ALL ? undefined : type,
                },
            })

            if (!response.data) {
                throw new Error()
            }

            return response.data
        } catch (e) {
            console.log(e)
            return rejectWithValue("error")
        }
    },
)
