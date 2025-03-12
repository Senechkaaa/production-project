import { useTranslation } from "react-i18next"
import { memo } from "react"
import { ArticleList } from "@/entities/Article"
import { useSelector } from "react-redux"
import { getArticles } from "@/pages/ArticlePage/model/slices/articlePageSlice"
import {
    getArticlesPageError,
    getArticlesPageIsLoading,
    getArticlesPageView,
} from "@/pages/ArticlePage/model/selectors/articlesPageSelector"
import { Text } from "@/shared/ui/Text/Text"

interface ArticleInfiniteListProps {
    className?: string
}

// лучше этот компонент сделать фичой ArticleInfiniteList
export const ArticleInfiniteList = memo(
    ({ className }: ArticleInfiniteListProps) => {
        const { t } = useTranslation()
        const articles = useSelector(getArticles.selectAll)
        const isLoading = useSelector(getArticlesPageIsLoading)
        const view = useSelector(getArticlesPageView)
        const error = useSelector(getArticlesPageError)

        if (error) {
            <Text title={t('Произошла ошибка')} />
        }

        return (
            <ArticleList
                target="_blank"
                className={className}
                isLoading={isLoading}
                view={view}
                articles={articles}
            />
        )
    },
)
