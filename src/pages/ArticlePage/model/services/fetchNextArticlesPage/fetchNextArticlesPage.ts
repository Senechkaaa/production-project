import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig } from "app/providers/StoreProvider"
import {
    getArticlesPageHasMore,
    getArticlesPageIsLoading,
    getArticlesPageNum,
} from "../../selectors/articlesPageSelector"
import { articlesPageActions } from "../../slices/articlePageSlice"
import { fetchArticlesList } from "../fetchArticleList/fetchArticleList"

export const fetchNextArticlePage = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>(
    "articlesPage/fetchNextArticlePage",
    async (_, thunkAPI) => {
        const { getState, dispatch } = thunkAPI
        const hasMore = getArticlesPageHasMore(getState())
        const isLoading = getArticlesPageIsLoading(getState())
        const page = getArticlesPageNum(getState())

        if (hasMore && !isLoading) {
            dispatch(articlesPageActions.setPage(page + 1))
            dispatch(
                fetchArticlesList({
                    page: page + 1,
                }),
            )
        }
    },
)
