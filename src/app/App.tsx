import { classNames } from "shared/lib/classNames/classnames"
import { AppRouter } from "./providers/router"
import { NavBar } from "widgets/Navbar"
import { useTheme } from "./providers/ThemeProvider"
import { Sidebar } from "widgets/Sidebar"
import { Suspense, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUserInited, userActions } from "entities/User"

const App = () => {
    const { theme } = useTheme()
    const dispatch = useDispatch()
    const inited = useSelector(getUserInited)

    useEffect(() => {
        dispatch(userActions.initAuthData())
    }, [dispatch])

    return (
        <div className={classNames("app", {}, [theme])}>
            {/*  Добавляем Suspense чтобы подгружался перевод чанками */}
            <Suspense fallback="">
                <NavBar />
                <div className="content-page">
                    <Sidebar />
                    {inited && <AppRouter />}
                    {/* На момент когда отрендерился AppRouter, мы еще не авторизованы И когда придут данные inited станет true */}
                </div>
            </Suspense>
        </div>
    )
}

export default App
