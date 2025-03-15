import { useTranslation } from "react-i18next"
import { memo, useCallback } from "react"
import { RatingCard } from "@/entities/RatingCard"
import { useGetArticleRating, useRateArticle } from "../../api/articleRatingApi"
import { useSelector } from "react-redux"
import { getUserAuthData } from "@/entities/User"
import { Skeleton } from "@/shared/ui/Skeleton"

export interface ArticleRatingProps {
    className?: string
    articleId: string
}

const ArticleRating = memo((props: ArticleRatingProps) => {
    const { t } = useTranslation()
    const { className, articleId } = props
    const userData = useSelector(getUserAuthData)

    const { data, isLoading } = useGetArticleRating({
        articleId,
        userId: userData?.id ?? "",
    })

    const [rateArticleMutation] = useRateArticle()

    const handleRateArticle = useCallback(
        (starCount: number, feedback?: string) => {
            try {
                rateArticleMutation({
                    articleId: articleId,
                    rate: starCount,
                    userId: userData?.id ?? "",
                    feedback: feedback,
                })
            } catch (e) {
                console.log(e)
            }
        },
        [articleId, rateArticleMutation, userData?.id],
    )

    const onAccept = useCallback(
        (starCount: number, feedback?: string) => {
            handleRateArticle(starCount, feedback)
        },
        [handleRateArticle],
    )

    const onCancel = useCallback(
        (starCount: number) => {
            handleRateArticle(starCount)
        },
        [handleRateArticle],
    )

    if (isLoading) {
        return <Skeleton width={"100%"} height={120} />
    }

    const rating = data?.[0]

    return (
        <RatingCard
            onAccept={onAccept}
            onCancel={onCancel}
            rate={rating?.rate}
            className={className}
            title={t("Оцените статью")}
            feedbackTitle={t(
                "Оставьте свой отзыв о статье, это поможет улучшить качество",
            )}
            hasFeedback
        />
    )
})

export default ArticleRating