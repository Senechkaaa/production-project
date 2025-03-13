import { classNames, Mods } from "@/shared/lib/classNames/classnames"
import cls from "./Modal.module.scss"
import { ReactNode } from "react"
import { Portal } from "../Portal/Portal"
import { useTheme } from "@/app/providers/ThemeProvider"
import { Overlay } from "../Overlay/Overlay"
import { useModal } from "@/shared/lib/hooks/useModal/useModal"

interface ModalProps {
    className?: string
    children?: ReactNode
    isOpen?: boolean
    onClose?: () => void
    lazy?: boolean
}

const ANIMATIONDELAY = 300

export const Modal = (props: ModalProps) => {
    const { children, className, isOpen, onClose, lazy } = props
    const { isClosing, isMounted, close } = useModal({
        animationDelay: ANIMATIONDELAY,
        onClose,
        isOpen,
    })
    // обычно timerRef.current = нельзя изменять тк он не мутабильный, но мы меняем тип на MutableRefObject
    const { theme } = useTheme()

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
                <Overlay onClick={close} />
                <div className={cls.content}>{children}</div>
            </div>
        </Portal>
    )
}
