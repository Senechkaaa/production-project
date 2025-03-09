import { AnyAction, CombinedState, EnhancedStore, ReducersMapObject } from "@reduxjs/toolkit";
import { CounterSchema } from "entities/Counter";
import { UserSchema } from "entities/User";
import { LoginSchema } from "features/AuthByUsername";
import { Reducer } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";
import { ArticleDetailsSchema } from "entities/Article";
import { ArticleDetailsPageSchema } from "pages/ArticleDetailsPage";
import { AddComentFormSchema } from "features/addCommentForm";
import { ArticlePageSchema } from "pages/ArticlePage";
import { UISchema } from "features/UI";
import { rtkApi } from "shared/api/rtkApi";
import { ProfileSchema } from "features/editableProfileCard";



export interface StateSchema {
    counter: CounterSchema
    user: UserSchema
    ui: UISchema
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>

    // Асинхронные редюсеры
    // мы будем подгружать их через reducerManager
    loginForm?: LoginSchema
    profile?: ProfileSchema
    articleDetails?: ArticleDetailsSchema
    articleDetailsPage?: ArticleDetailsPageSchema
    addCommentForm?: AddComentFormSchema
    articlesPage?: ArticlePageSchema
}

export type StateSchemaKey = keyof StateSchema
// получаем название схем - ключей
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>
    reduce: (
        state: StateSchema,
        action: AnyAction,
    ) => CombinedState<StateSchema>
    add: (key: StateSchemaKey, reducer: Reducer) => void
    remove: (key: StateSchemaKey) => void
    //  true - reducer монтирован, false - reducer не в монтирован или уже анмонтирован
    getMountedReducers: () => MountedReducers
}


// EnhancedStore стандартный типа при создании store
export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager
}

export interface ThunkExtraArg {
    api: AxiosInstance,
}

export interface ThunkConfig<T> {
    rejectValue: T
    extra: ThunkExtraArg
    state: StateSchema
}