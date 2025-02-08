import { classNames, Mods } from "shared/lib/classNames/classnames"
import cls from "./Modal.module.scss"
import {
    MutableRefObject,
    ReactNode,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react"
import { Portal } from "../Portal/Portal"
import { useTheme } from "app/providers/ThemeProvider"

interface ModalProps {
    className?: string
    children?: ReactNode
    isOpen?: boolean
    onClose?: () => void
    lazy: boolean
}

const ANIMATIONDELAY = 300

export const Modal = (props: ModalProps) => {
    const { children, className, isOpen, onClose, lazy } = props

    const [isClosing, setIsClosing] = useState(false)
    const [isMounted, setIsMounted] = useState(false)
    const timerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>
    // обычно timerRef.current = нельзя изменять тк он не мутабильный, но мы меняем тип на MutableRefObject
    const { theme } = useTheme()

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true)
            // при открытии сразу маунтим его
        }
    }, [isOpen])

    // на каждый перерендер компонент эти функции создаются заново => у каждой функции новая ссылка, и чтобы ее сохраняться мы используем useCallback
    const closeHandler = useCallback(() => {
        if (onClose) {
            setIsClosing(true)
            // функция выполнется через 0.3 секунды
            timerRef.current = setTimeout(() => {
                onClose()
                setIsClosing(false)
            }, ANIMATIONDELAY)
        }
    }, [onClose])

    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                closeHandler()
            }
        },
        [closeHandler],
    )

    const contentClick = (e: React.MouseEvent) => {
        e.stopPropagation()
    }

    useEffect(() => {
        if (isOpen) {
            window.addEventListener("keydown", onKeyDown)
        }
        return () => {
            clearTimeout(timerRef.current)
            window.removeEventListener("keydown", onKeyDown)
        }
    }, [isOpen, onKeyDown])

    const mods: Mods = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing,
    }

    if (lazy && !isMounted) {
        return null
    }

    // Если компонент не замаунтился то не создаем его

    return (
        <Portal>
            <div
                className={classNames(cls.Modal, mods, [
                    className,
                    theme,
                    "app_modal",
                ])}
            >
                <div className={cls.overlay} onClick={closeHandler}>
                    <div onClick={contentClick} className={cls.content}>
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    )
}
