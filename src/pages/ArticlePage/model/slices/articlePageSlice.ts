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
import { ArticleSortField, ArticleType } from "entities/Article/model/types/article"
import { SortOrder } from "shared/types"

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
        page: 1,
        hasMore: true,
        _inited: false,
        limit: 9,
        order: "asc",
        sort: ArticleSortField.CREATED,
        search: "",
        type: ArticleType.ALL,
    }),
    reducers: {
        setView: (state, action: PayloadAction<ArticleView>) => {
            state.view = action.payload
            localStorage.setItem(ARTICLE_VIEW_LOCALSTORAGE_KEY, action.payload)
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload
        },
        setOrder: (state, action: PayloadAction<SortOrder>) => {
            state.order = action.payload
        },
        setSort: (state, action: PayloadAction<ArticleSortField>) => {
            state.sort = action.payload
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload
        },
        setType: (state, action: PayloadAction<ArticleType>) => {
            state.type = action.payload
        },
        initState: (state) => {
            const view = localStorage.getItem(
                ARTICLE_VIEW_LOCALSTORAGE_KEY,
            ) as ArticleView
            state.view = view
            state.limit = view === ArticleView.BIG ? 4 : 9
            state._inited = true
            //         // Флаг инитед делает так, чтобы после того как мы зашли на статью и вернулись к списку не проходил запрос заново
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder
            .addCase(fetchArticlesList.pending, (state, action) => {
                state.error = undefined
                state.isLoading = true

                if (action.meta.arg.replace) {
                    articlesAdapter.removeAll(state)
                }
            })
            .addCase(fetchArticlesList.fulfilled, (state, action) => {
                state.isLoading = false
                state.hasMore = action.payload.length >= state.limit

                if (action.meta.arg.replace) {
                    articlesAdapter.setAll(state, action.payload)
                    // если реплэйс то все посты
                } else {
                    articlesAdapter.addMany(state, action.payload)
                    //иначе добавляем данные в конец
                }
            })
            .addCase(fetchArticlesList.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
    },
})

export const { reducer: articlesPageReducer } = articlesPage
export const { actions: articlesPageActions } = articlesPage
