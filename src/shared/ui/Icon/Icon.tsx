import { classNames } from "@/shared/lib/classNames/classnames"
import cls from "./Icon.module.scss"
import { memo, SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
    className?: string
    Svg: React.VFC<React.SVGProps<SVGSVGElement>>
    inverted?: boolean
}

export const Icon = memo(
    ({ className, Svg, inverted, ...otherProps }: IconProps) => {
        return (
            <Svg
                {...otherProps}
                className={classNames(inverted ? cls.inverted : cls.Icon, {}, [
                    className,
                ])}
            ></Svg>
        )
    },
)
