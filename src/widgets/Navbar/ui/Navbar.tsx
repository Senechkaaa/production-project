import { classNames } from "@/shared/lib/classNames/classnames"
import cls from "./Navbar.module.scss"
import { memo, useCallback, useState } from "react"
import { Button, ButtonTheme } from "@/shared/ui/Button"
import { useTranslation } from "react-i18next"
import { LoginModal } from "@/features/AuthByUsername"
import { useSelector } from "react-redux"
import { getUserAuthData } from "@/entities/User"
import { Text, TextTheme } from "@/shared/ui/Text"
import { AppLink, AppLinkTheme } from "@/shared/ui/AppLink"
import { HStack } from "@/shared/ui/Stack"
import { NotificationButton } from "@/features/notificationButton"
import { AvatarDropdown } from "@/features/avatarDropdown"
import { getRouteArticleCreate } from "@/shared/const/router"

interface NavbarProps {
    className?: string
}

export const NavBar = memo(({ className }: NavbarProps) => {
    const { t } = useTranslation()
    const [isAuthModal, setIsAuthModal] = useState(false)
    const authData = useSelector(getUserAuthData)

    const onCloseModal = useCallback(() => {
        setIsAuthModal(false)
    }, [setIsAuthModal])

    const onShowModal = useCallback(() => {
        setIsAuthModal(true)
    }, [setIsAuthModal])


    if (authData) {
        return (
            <header className={classNames(cls.navbar, {}, [className])}>
                <Text
                    theme={TextTheme.INVERTED}
                    className={cls.appName}
                    title={t("Сигмаааа")}
                />
                <AppLink
                    className={cls.createBtn}
                    theme={AppLinkTheme.SECONDARY}
                    to={getRouteArticleCreate()}
                >
                    {t("Создать статью")}
                </AppLink>
                <HStack gap="16" className={cls.actions}>
                    <NotificationButton/>
                    <AvatarDropdown />
                </HStack>
                <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
            </header>
        )
    }

    return (
        <header className={classNames(cls.navbar, {}, [className])}>
            <Button
                theme={ButtonTheme.CLEAR_INVERTED}
                onClick={onShowModal}
                className={cls.links}
            >
                {t("Войти")}
            </Button>
            {/* для оптимизации и чтобы не был лишнем в дом дереве */}
            {isAuthModal && (
                <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
            )}
        </header>
    )
})
