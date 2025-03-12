import { classNames } from "@/shared/lib/classNames/classnames"
import cls from "./NotificationButton.module.scss"
import { memo, useCallback, useState } from "react"
import { Popover } from "@/shared/ui/Popups"
import { Button, ButtonTheme } from "@/shared/ui/Button/Button"
import { Icon } from "@/shared/ui/Icon/Icon"
import { NotificationList } from "@/entities/Notification"
import NotificationIcon from "@/shared/assets/icons/notification-20-20.svg"
import { Drawer } from "@/shared/ui/Drawer/Drawer"
import { BrowserView, MobileView } from "react-device-detect"

interface NotificationButtonProps {
    className?: string
}

export const NotificationButton = memo(
    ({ className }: NotificationButtonProps) => {
        const [isOpened, setIsOpened] = useState(false)

        const onOpenDrawer = useCallback(() => {
            setIsOpened(true)
        }, [])

        const onCloseDrawer = useCallback(() => {
            setIsOpened(false)
        }, [])

        const trigger = (
            <Button onClick={onOpenDrawer} theme={ButtonTheme.CLEAR}>
                <Icon inverted Svg={NotificationIcon} />
            </Button>
        )

        return (
            <div>
                <BrowserView>
                    <Popover
                        className={classNames(cls.NotificationButton, {}, [
                            className,
                        ])}
                        direction="bottom left"
                        trigger={trigger}
                    >
                        <NotificationList className={cls.notifications} />
                    </Popover>
                </BrowserView>
                <MobileView>
                    {trigger}
                    <Drawer onClose={onCloseDrawer} isOpen={isOpened}>
                        <NotificationList />
                    </Drawer>
                </MobileView>
            </div>
        )
    },
)
