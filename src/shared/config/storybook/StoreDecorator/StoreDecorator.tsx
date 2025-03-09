import "app/styles/index.scss"
import { Story } from "@storybook/react"
import { StateSchema, StoreProvider } from "app/providers/StoreProvider"
import { loginReducer } from "features/AuthByUsername/model/slice/loginSlice"
import { ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader"
import { articleDetailsReducer } from "entities/Article/model/slice/articleDetailsSlice"
import { addCommentFormReducer } from "features/addCommentForm/model/slices/addCommentFormSlice"
import { profileReducer } from "features/editableProfileCard/model/slice/profileSlice"

const defaultAsyncReducers: ReducersList = {
    loginForm: loginReducer,
    profile: profileReducer,
    articleDetails: articleDetailsReducer,
    addCommentForm: addCommentFormReducer,
    articleDetailsPage: articleDetailsReducer,
}
// создаем фейковый reducer

export const StoreDecorator =
    (
        state: DeepPartial<StateSchema>,
        asyncReducers?:ReducersList
    ) =>
        (StoryComponent: Story) =>
            (
            // декоратор для redux и asyncReducers
                <StoreProvider
                    asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}
                    initialState={state}
                >
                    <StoryComponent />
                </StoreProvider>
            )
