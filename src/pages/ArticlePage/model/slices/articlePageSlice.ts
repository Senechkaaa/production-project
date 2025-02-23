import {
    createEntityAdapter,
    createSlice,
    PayloadAction,
} from "@reduxjs/toolkit"
import { StateSchema } from "app/providers/StoreProvider"
import { Article, ArticleView } from "entities/Article"
import { ArticlePageSchema } from "../types/articlesPageSchema"
import { fetchArticlesList } from "../services/fetchArticleList/fetchArticleList"
import { ARTICLE_VIEW_LOCALSTORAGE_KEY } from "shared/const/localStorage"

const articlesAdapter = createEntityAdapter<Article>({
    // указываем тип, с которым будет работать адаптер
    selectId: (article) => article.id,
})

export const getArticles = articlesAdapter.getSelectors<StateSchema>(
    (state) => state.articlesPage || articlesAdapter.getInitialState(),
    // получаем комменты или начальное состояние
)

const articlesPage = createSlice({
    name: "articlesPage",
    initialState: articlesAdapter.getInitialState<ArticlePageSchema>({
        isLoading: false,
        error: undefined,
        view: ArticleView.SMALL,
        ids: [],
        entities: {},
    }),
    reducers: {
        setView: (state, action: PayloadAction<ArticleView>) => {
            state.view = action.payload
            localStorage.setItem(ARTICLE_VIEW_LOCALSTORAGE_KEY, action.payload)
        },
        initState: (state) => {
            state.view = localStorage.getItem(
                ARTICLE_VIEW_LOCALSTORAGE_KEY,
            ) as ArticleView
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder
            .addCase(fetchArticlesList.pending, (state) => {
                state.error = undefined
                state.isLoading = true
            })
            .addCase(
                fetchArticlesList.fulfilled,
                (state, action: PayloadAction<Article[]>) => {
                    state.isLoading = false
                    articlesAdapter.setAll(state, action.payload)
                    // добавляем данные
                },
            )
            .addCase(fetchArticlesList.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
    },
})

export const { reducer: articlesPageReducer } = articlesPage
export const { actions: articlesPageActions } = articlesPage
