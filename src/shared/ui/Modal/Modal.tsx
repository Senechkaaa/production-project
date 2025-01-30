import { classNames } from 'shared/lib/classNames/classnames'
import cls from './Modal.module.scss'
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import { Portal } from '../Portal/Portal'
import { useTheme } from 'app/providers/ThemeProvider'

interface ModalProps {
    className?: string
    children?: ReactNode
    isOpen?: boolean
    onClose?: () => void
}

const ANIMATIONDELAY = 300

export const Modal = (props: ModalProps) => {
    const { children, className, isOpen, onClose } = props

    const [isClosing, setIsClosing] = useState(false)
    const timerRef = useRef<ReturnType<typeof setTimeout>>()
    const {theme} = useTheme()

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
            if (e.key === 'Escape') {
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
            window.addEventListener('keydown', onKeyDown)
        }
        return () => {
            clearTimeout(timerRef.current)
            window.removeEventListener('keydown', onKeyDown)
        }
    }, [isOpen, onKeyDown])

    const mods: Record<string, boolean> = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing,
    }

    return (
        <Portal>
            <div className={classNames(cls.Modal, mods, [className, theme, 'app_modal'])}>
                <div className={cls.overlay} onClick={closeHandler}>
                    <div onClick={contentClick} className={cls.content}>
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    )
}
