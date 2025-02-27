import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig } from "app/providers/StoreProvider"
import { articlesPageActions } from "../../slices/articlePageSlice"
import { fetchArticlesList } from "../fetchArticleList/fetchArticleList"
import { getArticlesPageInited } from "../../selectors/articlesPageSelector"
import { ArticleSortField } from "entities/Article"
import { SortOrder } from "shared/types"
import { ArticleType } from "entities/Article/model/types/article"

export const initArticlesPage = createAsyncThunk<
    void,
    URLSearchParams,
    ThunkConfig<string>
>("articlesPage/initArticlesPage", async (searchParams, thunkAPI) => {
    const inited = getArticlesPageInited(thunkAPI.getState())

    // Флаг инитед делает так, чтобы после того как мы зашли на статью и вернулись к списку не проходил запрос заново
    if (!inited) {
        const orderFromUrl = searchParams.get("order") as SortOrder
        const sortFromUrl = searchParams.get("sort") as ArticleSortField
        const searchFromUrl = searchParams.get("search")
        const typeFromUrl = searchParams.get("type") as ArticleType

        if (orderFromUrl) {
            thunkAPI.dispatch(articlesPageActions.setOrder(orderFromUrl))
        }
        if (sortFromUrl) {
            thunkAPI.dispatch(articlesPageActions.setSort(sortFromUrl))
        }

        if (searchFromUrl) {
            thunkAPI.dispatch(articlesPageActions.setSearch(searchFromUrl))
        }

        if (typeFromUrl) {
            thunkAPI.dispatch(articlesPageActions.setType(typeFromUrl))
        }

        thunkAPI.dispatch(articlesPageActions.initState())
        thunkAPI.dispatch(fetchArticlesList({}))
    }
})
