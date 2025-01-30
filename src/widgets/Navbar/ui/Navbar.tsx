import { classNames } from "shared/lib/classNames/classnames"
import cls from "./Navbar.module.scss"
import { Modal } from "shared/ui/Modal/Modal"
import { useCallback, useState } from "react"
import { Button, ButtonTheme } from "shared/ui/Button/Button"
import { useTranslation } from "react-i18next"

interface NavbarProps {
    className?: string
}

export const NavBar = ({ className }: NavbarProps) => {
    const [isAuthModal, setIsAuthModal] = useState(false)
    const { t } = useTranslation()

    const onToggleModal = useCallback(() => {
        setIsAuthModal(prev => !prev)
    }, [setIsAuthModal])

    return (
        <div className={classNames(cls.navbar, {}, [className])}>
            <Button
                theme={ButtonTheme.CLEAR_INVERTED}
                onClick={onToggleModal}
                className={cls.links}
            >
                {t("Войти")}
            </Button>
            <Modal isOpen={isAuthModal} onClose={onToggleModal}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Impedit perspiciatis neque aspernatur ducimus quia illo at, vero
                sint voluptatum est cumque voluptate earum quod maxime vel amet
                officia perferendis consequuntur?
            </Modal>
        </div>
    )
}
