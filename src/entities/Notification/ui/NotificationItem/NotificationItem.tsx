import { classNames } from "@/shared/lib/classNames/classnames"
import cls from "./NotificationItem.module.scss"
import { memo } from "react"
import { Notification } from "@/entities/Notification/model/types/notification"
import { Card, CardTheme } from "@/shared/ui/Card"
import { Text } from "@/shared/ui/Text"

interface NotificationItemProps {
    className?: string
    item: Notification
}

export const NotificationItem = memo(
    ({ className, item }: NotificationItemProps) => {
        const content = (
            <Card
                theme={CardTheme.OUTLINED}
                className={classNames(cls.NotificationItem, {}, [className])}
            >
                <Text title={item.title} text={item.descriptions} />
            </Card>
        )

        if (item.href) {
            return (
                <a className={cls.link} target="_blank" href={item.href} rel="noreferrer">
                    {content}
                </a>
            )
        }

        return content
    },
)
