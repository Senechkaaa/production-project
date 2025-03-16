import { classNames } from "@/shared/lib/classNames/classnames"
import cls from "./AvatarDropdown.module.scss"
import { useTranslation } from "react-i18next"
import { memo, useCallback } from "react"
import {
    getUserAuthData,
    isUserAdmin,
    isUserManager,
    userActions,
} from "@/entities/User"
import { useSelector } from "react-redux"
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch"
import { DropDown } from "@/shared/ui/Popups"
import { Avatar } from "@/shared/ui/Avatar"
import { getRouteAdminPanel, getRouteProfile } from "@/shared/const/router"

interface AvatarDropdownProps {
    className?: string
}

export const AvatarDropdown = memo(({ className }: AvatarDropdownProps) => {
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const isAdmin = useSelector(isUserAdmin)
    const isManager = useSelector(isUserManager)
    const authData = useSelector(getUserAuthData)
    const isAdminPanelAvaliable = isAdmin || isManager

    const onLogout = useCallback(() => {
        dispatch(userActions.logout())
    }, [dispatch])

    if (!authData) {
        return null
    }
    
    return (
        <DropDown
            className={classNames(cls.AvatarDropdown, {}, [className])}
            direction="bottom left"
            items={[
                ...(isAdminPanelAvaliable
                    ? [{ content: t("Админка"), href: getRouteAdminPanel() }]
                    : []),
                {
                    content: t("Профиль"),
                    href: getRouteProfile(authData.id),
                },
                {
                    content: t("Выйти"),
                    onClick: onLogout,
                },
            ]}
            trigger={<Avatar fallbackInverted size={30} src={authData.avatar} />}
        />
    )
})
