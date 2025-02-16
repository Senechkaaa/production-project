import { useContext } from "react"
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from "./ThemeContext"

interface UseThemeResult {
    toggleTheme: () => void
    theme: Theme
}

export function useTheme(): UseThemeResult {
    const { setTheme, theme } = useContext(ThemeContext)
    // Изначало контекст undefined, поэтому ставим setTheme?.
    const toggleTheme = () => {
        let newTheme: Theme

        switch (theme) {
        case Theme.DARK:
            newTheme = Theme.LIGHT
            break
        case Theme.LIGHT:
            newTheme = Theme.ORANCGE
            break
        case Theme.ORANCGE:
            newTheme = Theme.DARK
            break
        default:
            newTheme = Theme.DARK
        }

        setTheme?.(newTheme)
        document.body.className = newTheme
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme)
    }
    return {
        theme: theme || Theme.LIGHT,
        toggleTheme,
    }
}
