import { classNames, Mods } from "shared/lib/classNames/classnames"
import cls from "./Avatar.module.scss"
import { CSSProperties, useMemo } from "react"

interface AvatarProps {
    className?: string
    src?: string
    size?: number
    alt?: string
}

export const Avatar = ({ className, src, size, alt }: AvatarProps) => {
    const mods: Mods = {}

    const styles = useMemo<CSSProperties>(() => {
        return {
            width: size || 100,
            height: size || 100,
        }
    }, [size])

    return (
        <img
            src={src}
            alt={alt}
            style={styles}
            className={classNames(cls.Avatar, mods,[className])}
        />
    )
}
