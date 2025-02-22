import { classNames } from "shared/lib/classNames/classnames"
import cls from "./Card.module.scss"
import { HTMLAttributes, memo, ReactNode } from "react"

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string
    children: ReactNode
}

export const Card = memo((props: CardProps) => {

    const { className, children, ...otherProps } = props
 
    return (
        <div {...otherProps} className={classNames(cls.Card, {}, [className])}>
            {children}
        </div>
    )
})
