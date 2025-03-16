import { Reducer } from "@reduxjs/toolkit"
import { ReduxStoreWithManager } from "@/app/providers/StoreProvider"
import {
    StateSchema,
    StateSchemaKey,
} from "@/app/providers/StoreProvider/config/StateSchema"
import { ReactNode, useEffect } from "react"
import { useDispatch, useStore } from "react-redux"

export type ReducersList = {
    [name in StateSchemaKey]?: Reducer<NonNullable<StateSchema[name]>>
}
// тип для для списка reducers - ключ - значение
// Reducer<NonNullable<StateSchema[name]>> редюсер, который исключает undefined и null NonNullable и достает имя из StateSchema

interface DynamicModuleLoaderProps {
    reducers: ReducersList
    removeAfterUnmount?: boolean
    // пропс - будем ли мы удалять компонент посел анмаунта
    children: ReactNode
}

export const DynamicModuleLoader = (props: DynamicModuleLoaderProps) => {
    const { children, reducers, removeAfterUnmount } = props
    const store = useStore() as ReduxStoreWithManager
    // useStore достает основной store из store.ts
    const dispatch = useDispatch()
    useEffect(() => {
        const mounterReducers = store.reducerManager.getMountedReducers()
        // получаем редюсерс

        Object.entries(reducers).forEach(
            // бегаем по reducers и добавляем их
            ([name, reducer]) => {
                const mounted = mounterReducers[name as StateSchemaKey]
                // достаем его, если он есть, то он вмонитрован. Если его нет, то добавляем новый редюсер
                if (!mounted) {
                    store.reducerManager.add(name as StateSchemaKey, reducer)
                    // при моунте компонента, добавляем reducers, а именно - loginreducer
                    dispatch({ type: `@INIT ${name} reducer` })
                }
            },
        )

        return () => {
            if (removeAfterUnmount) {
                Object.entries(reducers).forEach(
                    // бегаем по reducers и удаляем их при анмаунте компонента
                    ([name]) => {
                        dispatch({ type: `@DESTROY ${name} reducer` })
                        store.reducerManager.remove(name as StateSchemaKey)
                    },
                )
            }
        }
        // eslint-disable-next-line
    }, [])

    return <>{children}</>
}
