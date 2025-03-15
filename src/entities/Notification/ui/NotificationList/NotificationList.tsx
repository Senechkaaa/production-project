import { classNames } from "@/shared/lib/classNames/classnames"
import cls from "./NotificationList.module.scss"
import { memo } from "react"
import { useNotifications } from "@/entities/Notification/api/notificationApi"
import { VStack } from "@/shared/ui/Stack"
import { NotificationItem } from "../NotificationItem/NotificationItem"
import { Skeleton } from "@/shared/ui/Skeleton"

interface NotificationListProps {
    className?: string
}

export const NotificationList = memo(({ className }: NotificationListProps) => {
    const { data, isLoading } = useNotifications(null, {
        pollingInterval: 5000,
        // каждые 5 секунд делаем запрос 
        // long pulling
    })

    if (isLoading) {
        return (
            <VStack
                gap="16"
                max
                className={classNames(cls.NotificationList, {}, [className])}
            >
                <Skeleton width={"100%"} border={"8px"} height={"80px"} />
                <Skeleton width={"100%"} border={"8px"} height={"80px"} />
                <Skeleton width={"100%"} border={"8px"} height={"80px"} />
            </VStack>
        )
    }

    return (
        <VStack
            gap="16"
            max
            className={classNames(cls.NotificationList, {}, [className])}
        >
            {data?.map((item) => (
                <NotificationItem key={item.id} item={item} />
            ))}
        </VStack>
    )
})
