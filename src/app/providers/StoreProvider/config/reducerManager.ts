import {
    AnyAction,
    combineReducers,
    Reducer,
    ReducersMapObject,
} from "@reduxjs/toolkit"
import { ReducerManager, StateSchema, StateSchemaKey } from "./StateSchema"

export function createReducerManager(
    initialReducers: ReducersMapObject<StateSchema>,
): ReducerManager {
    // принимает дефолтные редюсеры
    const reducers = { ...initialReducers }

    let combinedReducer = combineReducers(reducers)
    // Создаем корневой редюсер

    let keysToRemove: StateSchemaKey[] = []
    // хранит названия редюсеров, которые мы хотим удалить

    return {
        getReducerMap: () => reducers,
        reduce: (state: StateSchema, action: AnyAction) => {
            // если есть редюсеры, то удаляет
            if (keysToRemove.length > 0) {
                state = { ...state }
                keysToRemove.forEach((key) => {
                    delete state[key]
                    // удаляем редюсеры
                })
                keysToRemove = []
            }

            return combinedReducer(state, action)
        },

        add: (key: StateSchemaKey, reducer: Reducer) => {
            //  эта же функция их добавляет
            if (!key || reducers[key]) {
                return
            }
            reducers[key] = reducer
            combinedReducer = combineReducers(reducers)
        },

        remove: (key: StateSchemaKey) => {
            if (!key || !reducers[key]) {
                return
            }
            delete reducers[key]
            keysToRemove.push(key)
            // добавляет ключ в массив и удаляет редюсер
            combinedReducer = combineReducers(reducers)
        },
    }
}
