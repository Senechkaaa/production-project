import { classNames } from '@/shared/lib/classNames/classnames'
import cls from './AppLink.module.scss'
import { Link, LinkProps } from 'react-router-dom'
import { memo, ReactNode } from 'react'

export enum AppLinkTheme {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
}

interface AppLinkProps extends LinkProps {
    className?: string
    theme?: AppLinkTheme
    children?: ReactNode
}

export const AppLink = memo((props: AppLinkProps) => {
    const { className, children, to, theme = AppLinkTheme.PRIMARY } = props

    return (
        <Link
            to={to}
            className={classNames(cls.AppLink, {}, [className, cls[theme]])}
        >
            {children}
        </Link>
    )
})
