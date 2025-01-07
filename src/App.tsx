import { Route, Routes, Link } from 'react-router-dom'
import './styles/index.scss'
import './index'
import { AboutPageAsync } from './pages/AboutPage/AboutPage.async'
import { MainPageAsync } from './pages/MainPage/MainPage.async'
import { Suspense, useContext, useState } from 'react'
import { Theme, ThemeContext } from './theme/ThemeContext'
import { useTheme } from './theme/useTheme'
import { classNames } from './helpers/classNames/classnames'

const App = () => {

    const {theme, toggleTheme} = useTheme()
    
    return (
        <div className={classNames('app', {}, [theme])}>
            <button onClick={toggleTheme}>Toggle</button>
            <Link to={'/'}>Главная</Link>
            <Link to={'/about'}>О сайте</Link>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route element={<AboutPageAsync />} path={'/about'} />
                    <Route element={<MainPageAsync />} path={'/'} />
                </Routes>
            </Suspense>
        </div>
    )
}

export default App
