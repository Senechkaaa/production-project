import "app/styles/index.scss"
import { Story } from "@storybook/react"
import { StateSchema, StoreProvider } from "app/providers/StoreProvider"
import { DeepPartial, ReducersMapObject } from "@reduxjs/toolkit"
import { loginReducer } from "features/AuthByUsername/model/slice/loginSlice"
import { profileReducer } from "entities/Profile"

const defaultAsyncReducers: DeepPartial<ReducersMapObject<StateSchema>> = {
    loginForm: loginReducer,
    profile: profileReducer
}
// создаем фейковый reducer

export const StoreDecorator =
    (
        state: DeepPartial<StateSchema>,
        asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>,
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
