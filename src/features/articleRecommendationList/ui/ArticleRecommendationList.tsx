import { classNames } from "shared/lib/classNames/classnames"
import { useTranslation } from "react-i18next"
import { memo } from "react"
import { ArticleList, ArticleView } from "entities/Article"
import { Text, TextSize } from "shared/ui/Text/Text"
import { VStack } from "shared/ui/Stack/Flex"
import { useArticleRecommendationsList } from "../api/articleRecommendationsApi"

interface ArticleRecommendationListProps {
    className?: string
}

export const ArticleRecommendationList = memo(
    ({ className }: ArticleRecommendationListProps) => {
        const { t } = useTranslation()
        const {
            isLoading,
            data: articles,
            error,
        } = useArticleRecommendationsList(3)

        if (isLoading || error || !articles) {
            return null
        }

        return (
            <VStack gap="8" className={classNames("", {}, [className])}>
                <Text size={TextSize.L} title={t("Рекомендуем")} />
                <ArticleList
                    virtualized={false}
                    view={ArticleView.SMALL}
                    articles={articles}
                />
            </VStack>
        )
    },
)
