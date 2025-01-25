import { classNames } from 'shared/lib/classNames/classnames'
import cls from './Navbar.module.scss'
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink'

interface NavbarProps {
    className?: string
}

export const NavBar = ({ className }: NavbarProps) => {
    return (
        <div className={classNames(cls.navbar, {}, [className])}>
            <div className={cls.links}>
                /
            </div>
        </div>
    )
}
