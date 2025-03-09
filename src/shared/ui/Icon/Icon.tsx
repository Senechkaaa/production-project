import { classNames } from 'shared/lib/classNames/classnames'
import cls from './Icon.module.scss'
import { memo } from 'react'

interface IconProps {
    className?: string
    Svg: React.VFC<React.SVGProps<SVGSVGElement>>
    inverted?: boolean
}


export const Icon = memo(({ className, Svg, inverted }: IconProps) => {
    return <Svg className={classNames(inverted ? cls.inverted : cls.Icon, {}, [className])}></Svg>
})