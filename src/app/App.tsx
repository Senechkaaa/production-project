import './styles/index.scss'
import { classNames } from 'shared/lib/classNames/classnames'
import { AppRouter } from './providers/router'
import { NavBar } from 'widgets/Navbar'
import { useTheme } from './providers/ThemeProvider'
import { Sidebar } from 'widgets/Sidebar'
import { Suspense, useState } from 'react'

const App = () => {
    const { theme } = useTheme()

    const [sigma, setSigma] = useState()

    return (
        <div className={classNames('app', {}, [theme])}>
            {/*  Добавляем Suspense чтобы подгружался перевод чанками */}
            <Suspense fallback="">
                <NavBar />
                <div className="content-page">
                    <Sidebar />
                    <AppRouter />
                </div>
            </Suspense>
        </div>
    )
}

export default App
