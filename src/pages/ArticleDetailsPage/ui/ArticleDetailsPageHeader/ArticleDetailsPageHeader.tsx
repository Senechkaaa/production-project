import { classNames } from "@/shared/lib/classNames/classnames"
import { useTranslation } from "react-i18next"
import { memo, useCallback } from "react"
import { RoutesPath } from "@/shared/config/routeConfig/routeConfig"
import { useNavigate } from "react-router-dom"
import { Button } from "@/shared/ui/Button/Button"
import { useSelector } from "react-redux"
// import { getUserAuthData } from "entities/User"
import { getArticleDetailsData } from "@/entities/Article/model/selectors/articleDetails"
import { getCanEditArticle } from "@/pages/ArticleDetailsPage/model/selectors/article"
import { HStack } from "@/shared/ui/Stack/Flex"

interface ArticleDetailsPageHeaderProps {
    className?: string
}

export const ArticleDetailsPageHeader = memo(
    ({ className }: ArticleDetailsPageHeaderProps) => {
        const { t } = useTranslation()
        const navigate = useNavigate()
        // const userData = useSelector(getUserAuthData)
        const article = useSelector(getArticleDetailsData)
        const canEdit = useSelector(getCanEditArticle)

        const onBackToList = useCallback(() => {
            navigate(RoutesPath.articles)
        }, [navigate])

        const onEditArticle = useCallback(() => {
            navigate(`${RoutesPath.article_details}${article?.id}/edit`)
        }, [navigate, article?.id])

        return (
            <HStack max justify="between"
                className={classNames('', {}, [
                    className,
                ])}
            >
                <Button onClick={onBackToList}>{t("Назад к списку")}</Button>
                {canEdit && (
                    <Button onClick={onEditArticle}>
                        {t("Редактировать")}
                    </Button>
                )}
            </HStack>
        )
    },
)
