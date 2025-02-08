import { CombinedState, configureStore, Reducer, ReducersMapObject } from "@reduxjs/toolkit"
import { StateSchema, ThunkExtraArg } from "./StateSchema"
import { counterReducer } from "entities/Counter"
import { userReducer } from "entities/User"
import { createReducerManager } from "./reducerManager"
import { $api } from "shared/api/api"
import { NavigateOptions, To } from "react-router-dom"

export function createReduxStore(
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>,
    navigate?: (to: To, options?: NavigateOptions) => void,
    // asyncReducers для того, чтобы можно было рабоать сторибуку с асинхронными редюсерами
) {
    const rootReducers: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        counter: counterReducer,
        user: userReducer,
    }
    // тут храним только обязательные редюсеры

    const reducerManager = createReducerManager(rootReducers)

    const extraArg: ThunkExtraArg = {
        api: $api,
        navigate,
        //  thunkAPI.extra.navigate
    }

    const store = configureStore({
        // Reducer<CombinedState<StateSchema>, AnyAction - тип редюсера
        reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
        devTools: __IS_DEV__,
        preloadedState: initialState, // для предварительной загрузки данных
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                thunk: {
                    extraArgument: extraArg,
                },
            }),
        // настройка для запросов thunkAPI.extra.api.post()
    })

    // @ts-expect-error@typescript-eslint/ban-ts-comment
    store.reducerManager = reducerManager

    return store
}

export type AppDispatch = ReturnType<typeof createReduxStore>["dispatch"]
