import { Link } from 'react-router-dom'
import { classNames } from 'shared/lib/classNames/classnames'
import cls from './Navbar.module.scss'
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink'
import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher'

interface NavbarProps {
    className?: string
}

export const NavBar = ({ className }: NavbarProps) => {
    return (
        <div className={classNames(cls.navbar, {}, [className])}>
            <div className={cls.links}>
                <AppLink
                    theme={AppLinkTheme.SECONDARY}
                    className={cls.mainLink}
                    to={'/'}
                >
                    Главная
                </AppLink>
                <AppLink theme={AppLinkTheme.SECONDARY} to={'/about'}>
                    О сайте
                </AppLink>
            </div>
        </div>
    )
}
