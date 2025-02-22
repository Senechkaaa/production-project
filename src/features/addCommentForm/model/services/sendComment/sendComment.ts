import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig } from "app/providers/StoreProvider"
import { Comment } from "entities/Comment"
import { getUserAuthData } from "entities/User"
import { getAddCommentFormText } from "../../selectors/addCommentFormSelectors"
import { getArticleDetailsData } from "entities/Article/model/selectors/articleDetails"
import { addCommentFormActions } from "../../slices/addCommentFormSlice"

export const sendComment = createAsyncThunk<Comment, void, ThunkConfig<string>>(
    "addCommentForm/sendComment",
    async (_, thunkAPI) => {
        const {dispatch, extra, rejectWithValue, getState } = thunkAPI
        const userData = getUserAuthData(getState())
        const text = getAddCommentFormText(getState())
        const article = getArticleDetailsData(getState())

        if (!userData || !text || !article) {
            return rejectWithValue("no data")
        }

        try {
            const response = await extra.api.post<Comment>("/comments", {
                articleId: article?.id,
                userId: userData.id,
                text,
            })
            if (!response.data) {
                throw new Error()
            }

            dispatch(addCommentFormActions.setText(''))

            return response.data
        } catch (e) {
            return rejectWithValue("error")
        }
    },
)
