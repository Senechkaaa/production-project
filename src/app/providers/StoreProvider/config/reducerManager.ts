import {
    AnyAction,
    combineReducers,
    Reducer,
    ReducersMapObject,
} from "@reduxjs/toolkit"
import { MountedReducers, ReducerManager, StateSchema, StateSchemaKey } from "./StateSchema"

export function createReducerManager(
    initialReducers: ReducersMapObject<StateSchema>,
): ReducerManager {
    const reducers = { ...initialReducers }
    let combinedReducer = combineReducers(reducers)
    let keysToRemove: StateSchemaKey[] = []
    const mounterReducers: MountedReducers = {}

    return {
        getReducerMap: () => reducers,
        // можно не делать getMountedReducers, а использовать getReducerMap
        getMountedReducers: () => mounterReducers,
        reduce: (state: StateSchema, action: AnyAction) => {
            if (keysToRemove.length > 0) {
                state = { ...state }
                keysToRemove.forEach((key) => {
                    delete state[key]
                })
                keysToRemove = []
            }

            return combinedReducer(state, action)
        },
        add: (key: StateSchemaKey, reducer: Reducer) => {
            if (!key || reducers[key]) {
                return
            }
            reducers[key] = reducer
            mounterReducers[key] = true
            // указываем, что вмонтирован редюсер
            combinedReducer = combineReducers(reducers)
        },

        remove: (key: StateSchemaKey) => {
            if (!key || !reducers[key]) {
                return
            }
            delete reducers[key]
            keysToRemove.push(key)
            // добавляет ключ в массив и удаляет редюсер

            mounterReducers[key] = false
            // указываем, что анмонтирован редюсер
            combinedReducer = combineReducers(reducers)
        },
    }
}
