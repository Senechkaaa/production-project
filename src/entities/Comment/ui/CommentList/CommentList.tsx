import { classNames } from "@/shared/lib/classNames/classnames"
import { memo } from "react"
import { Text } from "@/shared/ui/Text/Text"
import { useTranslation } from "react-i18next"
import { CommentCard } from "../CommentCard/CommentCard"
import { Comment } from "@/entities/Comment/model/types/comment"
import { VStack } from "@/shared/ui/Stack/Flex"

interface CommentListProps {
    className?: string
    comments?: Comment[]
    isLoading?: boolean
}

export const CommentList = memo((props: CommentListProps) => {
    const { className, comments, isLoading } = props
    const { t } = useTranslation("article-details")

    if (isLoading) {
        return (
            <VStack gap="16" max className={classNames('cls.ComponentList', {}, [className])}>
                <CommentCard isLoading />
                <CommentCard isLoading />
                <CommentCard isLoading />
            </VStack>
        )
    }

    return (
        <VStack gap="16" max className={classNames('cls.ComponentList', {}, [className])}>
            {comments?.length ? (
                comments.map((comment) => (
                    <CommentCard
                        isLoading={isLoading}
                        comment={comment}
                        key={comment.id}
                    />
                ))
            ) : (
                <Text text={t("Комментарии отсутствуют")} />
            )}
        </VStack>
    )
})
