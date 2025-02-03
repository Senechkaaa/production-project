import { ReactNode } from "react"
import { Provider } from "react-redux"
import { createReduxStore } from "../config/store"
import { StateSchema } from "../config/StateSchema"
import { DeepPartial, ReducersMapObject } from "@reduxjs/toolkit"

interface StoreProviderProps {
    children?: ReactNode
    initialState?: DeepPartial<StateSchema>
    asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>
    // asyncReducers для того, чтобы можно было рабоать сторибуку с асинхронными редюсерами
}


export const StoreProvider = (props: StoreProviderProps) => {
    const { children, initialState, asyncReducers } = props
    const store = createReduxStore(
        initialState as StateSchema,
        asyncReducers as ReducersMapObject<StateSchema>,
        // Так как изначально нет loginReducer, а подгружается они только при открытии формы
    )
    return <Provider store={store}>{children}</Provider>
}
