import { AnyAction, CombinedState, EnhancedStore, ReducersMapObject } from "@reduxjs/toolkit";
import { CounterSchema } from "entities/Counter";
import { UserSchema } from "entities/User";
import { LoginSchema } from "features/AuthByUsername";
import { Reducer } from "@reduxjs/toolkit";
import { ProfileSchema } from "entities/Profile";
import { AxiosInstance } from "axios";
import { NavigateOptions, To } from "react-router-dom";
import { ArticleDetailsSchema } from "entities/Article";
import { ArticleDetailsCommentSchema } from "pages/ArticleDetailsPage";


export interface StateSchema {
    counter: CounterSchema
    user: UserSchema

    // Асинхронные редюсеры
    // мы будем подгружать их через reducerManager
    loginForm?: LoginSchema
    profile?: ProfileSchema
    articleDetails?: ArticleDetailsSchema
    articleDetailsComments?: ArticleDetailsCommentSchema
}

export type StateSchemaKey = keyof StateSchema
// получаем название схем - ключей

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>
    reduce: ( state: StateSchema, action: AnyAction) => CombinedState<StateSchema>,
    add: (key: StateSchemaKey, reducer: Reducer) => void
    remove: (key: StateSchemaKey) => void
}


// EnhancedStore стандартный типа при создании store
export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager
}

export interface ThunkExtraArg {
    api: AxiosInstance,
    navigate?: (to: To, options?: NavigateOptions) => void,
}

export interface ThunkConfig<T> {
    rejectValue: T
    extra: ThunkExtraArg
    state: StateSchema
}