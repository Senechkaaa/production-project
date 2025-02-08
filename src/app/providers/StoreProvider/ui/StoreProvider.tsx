import { ReactNode } from "react"
import { Provider } from "react-redux"
import { createReduxStore } from "../config/store"
import { StateSchema } from "../config/StateSchema"
import { ReducersMapObject } from "@reduxjs/toolkit"
import { useNavigate } from "react-router-dom"

interface StoreProviderProps {
    children?: ReactNode
    initialState?: DeepPartial<StateSchema>
    asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>
    // asyncReducers для того, чтобы можно было рабоать сторибуку с асинхронными редюсерами
}


export const StoreProvider = (props: StoreProviderProps) => {
    const { children, initialState, asyncReducers } = props
    const navigate = useNavigate()
    const store = createReduxStore(
        initialState as StateSchema,
        asyncReducers as ReducersMapObject<StateSchema>,
        // Так как изначально нет loginReducer, а подгружается они только при открытии формы мы доавбляем асинхронные редюсеры для тестов
        navigate,
    )
    return <Provider store={store}>{children}</Provider>
}
