import {
    ImgHTMLAttributes,
    memo,
    ReactElement,
    useLayoutEffect,
    useState,
} from "react"

interface AppImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    className?: string
    fallback?: ReactElement
    errorFallback?: ReactElement
}

export const AppImage = memo((props: AppImageProps) => {
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)
    const {
        className,
        src,
        alt = " image",
        errorFallback,
        fallback,
        ...otherProps
    } = props

    // вызывается до того, когда компонент вмонтируется
    useLayoutEffect(() => {
        const img = new Image() // Объект img создается не для отображения, а для проверки загрузки изображения
        img.src = src ?? ""
        img.onload = () => {
            // onload - завершение загрузки
            setIsLoading(false)
        }
        img.onerror = () => {
            setIsLoading(false)
            setHasError(true)
        }
    }, [src])

    if (isLoading && fallback) {
        return fallback
    }

    if (hasError && errorFallback) {
        return errorFallback
    }

    return <img {...otherProps} src={src} alt={alt} className={className} />
})
