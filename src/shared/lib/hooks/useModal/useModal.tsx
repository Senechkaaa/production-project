import { MutableRefObject, useCallback, useEffect, useRef, useState } from "react"

interface UseModalProps {
    onClose?: () => void
    isOpen?: boolean
    animationDelay: number
}

export function useModal(props: UseModalProps) {
    const { animationDelay, isOpen, onClose } = props

    const [isClosing, setIsClosing] = useState(false)
    const [isMounted, setIsMounted] = useState(false)
    const timerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>
    // обычно timerRef.current = нельзя изменять тк он не мутабильный, но мы меняем тип на MutableRefObject

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true)
            // при открытии сразу маунтим его
        }
    }, [isOpen])

    // на каждый перерендер компонент эти функции создаются заново => у каждой функции новая ссылка, и чтобы ее сохраняться мы используем useCallback
    const close = useCallback(() => {
        if (onClose) {
            setIsClosing(true)
            // функция выполнется через 0.3 секунды
            timerRef.current = setTimeout(() => {
                onClose()
                setIsClosing(false)
            }, animationDelay)
        }
    }, [onClose, animationDelay])

    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                close()
            }
        },
        [close],
    )

    useEffect(() => {
        if (isOpen) {
            window.addEventListener("keydown", onKeyDown)
        }
        return () => {
            clearTimeout(timerRef.current)
            window.removeEventListener("keydown", onKeyDown)
        }
    }, [isOpen, onKeyDown])

    return {
        isClosing,
        isMounted,
        close
    }
}
