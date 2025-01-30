import { classNames } from 'shared/lib/classNames/classnames'
import cls from './Button.module.scss'
import { ButtonHTMLAttributes, FC } from 'react'



export enum ButtonTheme {
    CLEAR = "clear",
    CLEAR_INVERTED = "clearInverted",
    OUTLINE = "outline",
    BACKGROUND = "background",
    BACKGROUND_INVERTED = "backgroundInverted",
}

export enum ButtonSize {
    M = 'size_m',
    L= 'size_l',
    XL = 'size_xl',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string
    theme?: ButtonTheme
    square?: boolean
    size?: ButtonSize
}

export const Button: FC<ButtonProps> = (props) => {
    const {
        children,
        theme = ButtonTheme.CLEAR,
        className,
        square,
        size = ButtonSize.M,
        ...otherProps
    } = props

    const mods: Record<string, boolean> = {
        [cls[theme]]: true,
        [cls.square]: square,
        [cls[size]]: true,
    }

    return (
        <button
            {...otherProps}
            className={classNames(cls.Button, mods, [className])}
        >
            {children}
        </button>
    )
}
