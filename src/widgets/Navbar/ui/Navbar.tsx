import { classNames } from "shared/lib/classNames/classnames"
import cls from "./Navbar.module.scss"
import { memo, useCallback, useState } from "react"
import { Button, ButtonTheme } from "shared/ui/Button/Button"
import { useTranslation } from "react-i18next"
import { LoginModal } from "features/AuthByUsername"
import { useSelector } from "react-redux"
import { getUserAuthData } from "entities/User"
import { Text, TextTheme } from "shared/ui/Text/Text"
import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink"
import { RoutesPath } from "shared/config/routeConfig/routeConfig"
import { HStack } from "shared/ui/Stack/Flex"
import { NotificationButton } from "features/notificationButton"
import { AvatarDropdown } from "features/avatarDropdown"
import { Drawer } from "shared/ui/Drawer/Drawer"
import { NotificationList } from "entities/Notification"

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
                    to={RoutesPath.article_create}
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
