import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { StateSchema } from "@/app/providers/StoreProvider"
import { Comment } from "@/entities/Comment"
import { ArticleDetailsCommentSchema } from "../types/ArticleDetailsCommentSchema"
import { fetchCommentsByArticleId } from "../services/fetchCommentsByArticleId/fetchCommentsByArticleId"

const commentsAdapter = createEntityAdapter<Comment>({
    // указываем тип, с которым будет работать адаптер
    selectId: (comment) => comment.id,
})

export const getArticleComments = commentsAdapter.getSelectors<StateSchema>(
    (state) =>
        state.articleDetailsPage?.comments || commentsAdapter.getInitialState(),
    // получаем комменты или начальное состояние
)

const articleDetailsCommentsSlice = createSlice({
    name: "articleDetailsCommentsSlice",
    initialState: commentsAdapter.getInitialState<ArticleDetailsCommentSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
    }),
    reducers: {},
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder
            .addCase(fetchCommentsByArticleId.pending, (state) => {
                state.error = undefined
                state.isLoading = true
            })
            .addCase(
                fetchCommentsByArticleId.fulfilled,
                (state, action: PayloadAction<Comment[]>) => {
                    state.isLoading = false
                    commentsAdapter.setAll(state, action.payload)
                    // добавляем данные
                },
            )
            .addCase(fetchCommentsByArticleId.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
    },
})

export const { reducer: articleDetailsCommentsReducer } =
    articleDetailsCommentsSlice
