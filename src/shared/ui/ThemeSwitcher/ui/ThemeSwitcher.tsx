import { classNames } from 'shared/lib/classNames/classnames'
import { useTheme, Theme } from 'app/providers/ThemeProvider'
import LightIcon from 'shared/assets/icons/theme-light.svg'
import DarkIcon from 'shared/assets/icons/theme-dark.svg'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'

interface ThemeSwitcherProps {
    className?: string
}

// лучше сделать его в слое Widget
export const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
    const { theme, toggleTheme } = useTheme()
    console.log(theme)
    return (
        <Button
            theme={ButtonTheme.CLEAR}
            onClick={toggleTheme}
            className={classNames('', {}, [className])}
        >
            {theme === Theme.DARK ? <DarkIcon /> : <LightIcon />}
        </Button>
    )
}
