import { classNames } from "shared/lib/classNames/classnames"
import cls from "./Navbar.module.scss"
import { memo, useCallback, useState } from "react"
import { Button, ButtonTheme } from "shared/ui/Button/Button"
import { useTranslation } from "react-i18next"
import { LoginModal } from "features/AuthByUsername"
import { useDispatch, useSelector } from "react-redux"
import {
    getUserAuthData,
    isUserAdmin,
    isUserManager,
    userActions,
} from "entities/User"
import { Text, TextTheme } from "shared/ui/Text/Text"
import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink"
import { RoutesPath } from "shared/config/routeConfig/routeConfig"
import { DropDown } from "shared/ui/DropDown/DropDown"
import { Avatar } from "shared/ui/Avatar/Avatar"

interface NavbarProps {
    className?: string
}

export const NavBar = memo(({ className }: NavbarProps) => {
    const { t } = useTranslation()
    const [isAuthModal, setIsAuthModal] = useState(false)
    const authData = useSelector(getUserAuthData)
    const dispatch = useDispatch()
    const isAdmin = useSelector(isUserAdmin)
    const isManager = useSelector(isUserManager)

    const onCloseModal = useCallback(() => {
        setIsAuthModal(false)
    }, [setIsAuthModal])

    const onShowModal = useCallback(() => {
        setIsAuthModal(true)
    }, [setIsAuthModal])

    const onLogout = useCallback(() => {
        dispatch(userActions.logout())
    }, [dispatch])

    const isAdminPanelAvaliable = isAdmin || isManager

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
                <DropDown
                    direction="bottom left"
                    className={cls.dropdown}
                    items={[
                        ...(isAdminPanelAvaliable ? [{
                            content: t("Админка"),
                            href: RoutesPath.admin_panel,
                        }] : []),
                        {
                            content: t("Профиль"),
                            href: RoutesPath.profile + authData.id,
                        },
                        {
                            content: t("Выйти"),
                            onClick: onLogout,
                        },
                    ]}
                    trigger={<Avatar size={30} src={authData.avatar} />}
                />
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
