import { classNames } from "shared/lib/classNames/classnames"
import cls from "./Navbar.module.scss"
import { useCallback, useState } from "react"
import { Button, ButtonTheme } from "shared/ui/Button/Button"
import { useTranslation } from "react-i18next"
import { LoginModal } from "features/AuthByUsername"

interface NavbarProps {
    className?: string
}

export const NavBar = ({ className }: NavbarProps) => {
    const [isAuthModal, setIsAuthModal] = useState(false)
    const { t } = useTranslation()

    const onCloseModal = useCallback(() => {
        setIsAuthModal(false)
    }, [setIsAuthModal])

    const onShowModal = useCallback(() => {
        setIsAuthModal(true)
    }, [setIsAuthModal])

    return (
        <div className={classNames(cls.navbar, {}, [className])}>
            <Button
                theme={ButtonTheme.CLEAR_INVERTED}
                onClick={onShowModal}
                className={cls.links}
            >
                {t("Войти")}
            </Button>
            <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
        </div>
    )
}
