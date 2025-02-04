import { Reducer } from "@reduxjs/toolkit"
import { ReduxStoreWithManager } from "app/providers/StoreProvider"
import { StateSchemaKey } from "app/providers/StoreProvider/config/StateSchema"
import { FC, useEffect } from "react"
import { useDispatch, useStore } from "react-redux"

export type ReducersList = {
    [name in StateSchemaKey]?: Reducer
}
// тип для для списка reducers - ключ - значение

type ReducersListEntry = [StateSchemaKey, Reducer]
// тип ключ - значение

interface DynamicModuleLoaderProps {
    reducers: ReducersList
    removeAfterUnmount?: boolean
    // пропс - будем ли мы удалять компонент посел анмаунта
}

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = (
    props,
) => {
    const { children, reducers, removeAfterUnmount } = props
    const store = useStore() as ReduxStoreWithManager
    // useStore достает основной store из store.ts
    const dispatch = useDispatch()
    useEffect(() => {
        Object.entries(reducers).forEach(
            // бегаем по reducers и добавляем их
            ([name, reducer]: ReducersListEntry) => {
                store.reducerManager.add(name, reducer)
                // при моунте компонента, добавляем reducers, а именно - loginreducer
                dispatch({ type: `@INIT ${name} reducer` })
            },
        )

        return () => {
            if (removeAfterUnmount) {
                Object.entries(reducers).forEach(
                    // бегаем по reducers и удаляем их при анмаунте компонента
                    ([name]: ReducersListEntry) => {
                        dispatch({ type: `@DESTROY ${name} reducer` })
                        store.reducerManager.remove(name)
                    },
                )
            }
        }
        // eslint-disable-next-line
    }, [])

    return <>{children}</>
}
