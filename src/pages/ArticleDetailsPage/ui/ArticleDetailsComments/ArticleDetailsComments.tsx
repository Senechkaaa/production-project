import { classNames } from "@/shared/lib/classNames/classnames"
import { useTranslation } from "react-i18next"
import { memo, Suspense, useCallback } from "react"
import { AddCommentForm } from "@/features/addCommentForm"
import { CommentList } from "@/entities/Comment"
import { Text } from "@/shared/ui/Text"
import { useSelector } from "react-redux"
import { getArticleComments } from "../../model/slices/articleDetailsCommentsSlice"
import { getArticleCommentsIsLoading } from "../../model/selectors/comments"
import { addCommentForArticle } from "../../model/services/addCommentForArticle/addCommentForArticle"
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch"
import { useInitialEffect } from "@/shared/lib/hooks/useInitialEffect/useInitialEffect"
import { fetchCommentsByArticleId } from "../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId"
import { VStack } from "@/shared/ui/Stack"
import { Loader } from "@/shared/ui/Loader"

interface ArticleDetailsCommentsProps {
    className?: string
    id?: string
}

export const ArticleDetailsComments = memo(
    ({ className, id }: ArticleDetailsCommentsProps) => {
        const { t } = useTranslation()

        const comments = useSelector(getArticleComments.selectAll)
        const commentsIsLoading = useSelector(getArticleCommentsIsLoading)
        const dispatch = useAppDispatch()

        const onSendComment = useCallback(
            (text: string) => {
                dispatch(addCommentForArticle(text))
            },
            [dispatch],
        )

        useInitialEffect(() => {
            dispatch(fetchCommentsByArticleId(id))
        })

        return (
            <VStack gap="16" max className={classNames("", {}, [className])}>
                <Text title={t("Комментарии")} />
                <Suspense fallback={<Loader />}>
                    <AddCommentForm onSendComment={onSendComment} />
                </Suspense>
                <CommentList
                    isLoading={commentsIsLoading}
                    comments={comments}
                />
            </VStack>
        )
    },
)
