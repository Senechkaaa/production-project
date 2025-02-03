import {
    configureStore,
    ReducersMapObject,
} from "@reduxjs/toolkit"
import { StateSchema } from "./StateSchema"
import { counterReducer } from "entities/Counter"
import { userReducer } from "entities/User"
import { createReducerManager } from "./reducerManager"

export function createReduxStore(
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>,
    // asyncReducers для того, чтобы можно было рабоать сторибуку с асинхронными редюсерами
) {
    const rootReducers: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        counter: counterReducer,
        user: userReducer,
    }
    // тут храним только обязательные редюсеры

    const reducerManager = createReducerManager(rootReducers)

    const store = configureStore<StateSchema>({
        reducer: reducerManager.reduce,
        devTools: __IS_DEV__,
        preloadedState: initialState,
        // для предварительной загрузки данных
    })

    // @ts-expect-error
    store.reducerManager = reducerManager

    return store
}
