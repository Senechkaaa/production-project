import { classNames } from "shared/lib/classNames/classnames"
import cls from "./NotificationButton.module.scss"
import { useTranslation } from "react-i18next"
import { memo } from "react"
import { Popover } from "shared/ui/Popups"
import { Button, ButtonTheme } from "shared/ui/Button/Button"
import { Icon } from "shared/ui/Icon/Icon"
import { NotificationList } from "entities/Notification"
import NotificationIcon from "shared/assets/icons/notification-20-20.svg"

interface NotificationButtonProps {
    className?: string
}

export const NotificationButton = memo(
    ({ className }: NotificationButtonProps) => {
        const { t } = useTranslation()

        return (
            <Popover
                className={classNames(cls.NotificationButton, {}, [className])}
                direction="bottom left"
                trigger={
                    <Button theme={ButtonTheme.CLEAR}>
                        <Icon inverted Svg={NotificationIcon} />
                    </Button>
                }
            >
                <NotificationList className={cls.notifications} />
            </Popover>
        )
    },
)
