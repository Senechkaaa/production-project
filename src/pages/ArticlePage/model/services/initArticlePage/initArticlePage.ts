import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig } from "app/providers/StoreProvider"
import { articlesPageActions } from "../../slices/articlePageSlice"
import { fetchArticlesList } from "../fetchArticleList/fetchArticleList"
import { getArticlesPageInited } from "../../selectors/articlesPageSelector"

export const initArticlesPage = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>("articlesPage/initArticlesPage", async (_, thunkAPI) => {
    const inited = getArticlesPageInited(thunkAPI.getState())

    // Флаг инитед делает так, чтобы после того как мы зашли на статью и вернулись к списку не проходил запрос заново
    if (!inited) {
        thunkAPI.dispatch(articlesPageActions.initState())
        thunkAPI.dispatch(
            fetchArticlesList({
                page: 1,
            }),
        )
    }
})
