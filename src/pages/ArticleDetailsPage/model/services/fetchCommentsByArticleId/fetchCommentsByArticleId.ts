import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig } from "app/providers/StoreProvider"
import { Comment } from "entities/Comment"

export const fetchCommentsByArticleId = createAsyncThunk<
    Comment[],
    string | undefined,
    ThunkConfig<string>
>(
    // 1 аргумент, что что возвращаем
    // 2 аргумент, что принимаем
    "articleDetails/fetchCommentsByArticleId",
    async (articleId, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI

        if (!articleId) {
            return rejectWithValue("error")
        }

        try {
            const response = await extra.api.get<Comment[]>(
                '/comments', {
                    params: {
                        articleId,
                        _expand: 'user'
                        // указываем, что к комментариям нужно добавить юзера
                    }
                }
            )

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

