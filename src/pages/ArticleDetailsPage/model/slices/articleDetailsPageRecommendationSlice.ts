import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { StateSchema } from "app/providers/StoreProvider"
import { Article } from "entities/Article"
import { ArticleDetailsRecommendationsSchema } from "../types/ArticleDetailsRecommendationSchema"
import { fetchArticleRecommendations } from "../services/fetchArticleRecommendations/fetchArticleRecommendations"

const recommendationsAdapter = createEntityAdapter<Article>({
    // указываем тип, с которым будет работать адаптер
    selectId: (article) => article.id,
})

export const getArticleRecommendation =
    recommendationsAdapter.getSelectors<StateSchema>(
        (state) => state.articleDetailsPage?.recommendation || recommendationsAdapter.getInitialState(),
        // получаем комменты или начальное состояние
    )

const articleDetailsPageRecommendationSlice = createSlice({
    name: "articleDetailsPageRecommendationSlice",
    initialState:
        recommendationsAdapter.getInitialState<ArticleDetailsRecommendationsSchema>(
            {
                isLoading: false,
                error: undefined,
                ids: [],
                entities: {},
            },
        ),
    reducers: {},
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder
            .addCase(fetchArticleRecommendations.pending, (state) => {
                state.error = undefined
                state.isLoading = true
            })
            .addCase(
                fetchArticleRecommendations.fulfilled,
                (state, action: PayloadAction<Article[]>) => {
                    state.isLoading = false
                    recommendationsAdapter.setAll(state, action.payload)
                    // добавляем данные
                },
            )
            .addCase(fetchArticleRecommendations.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
    },
})

export const { reducer: articleDetailsPageRecommendationReducer } =
    articleDetailsPageRecommendationSlice
