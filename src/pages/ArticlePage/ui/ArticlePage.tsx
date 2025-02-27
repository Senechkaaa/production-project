import { classNames } from "shared/lib/classNames/classnames"
import cls from "./ArticlePage.module.scss"
import { memo, useCallback } from "react"
import { ArticleList} from "entities/Article"
import {
    DynamicModuleLoader,
    ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader"
import {
    articlesPageReducer,
    getArticles,
} from "../model/slices/articlePageSlice"
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect"
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch"
import { useSelector } from "react-redux"
import {
    getArticlesPageError,
    getArticlesPageIsLoading,
    getArticlesPageView,
} from "../model/selectors/articlesPageSelector"
import { Page } from "widgets/Page/Page"
import { fetchNextArticlePage } from "../model/services/fetchNextArticlesPage/fetchNextArticlesPage"
import { Text } from "shared/ui/Text/Text"
import { initArticlesPage } from "../model/services/initArticlePage/initArticlePage"
import { ArticlesPageFilters } from "./ArticlesPageFilters/ArticlesPageFilters"
import { useSearchParams } from "react-router-dom"

interface ArticlePageProps {
    className?: string
}

const reducers: ReducersList = {
    articlesPage: articlesPageReducer,
}

const ArticlePage = ({ className }: ArticlePageProps) => {
    const dispatch = useAppDispatch()
    const articles = useSelector(getArticles.selectAll)
    const isLoading = useSelector(getArticlesPageIsLoading)
    const view = useSelector(getArticlesPageView)
    const error = useSelector(getArticlesPageError)
    const [searchParams] = useSearchParams()
    

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextArticlePage())
    }, [dispatch])

    useInitialEffect(() => {
        dispatch(initArticlesPage(searchParams))
    })

    if (error) {
        ;<Text title="Error was occured" />
    }

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Page
                onScrollEnd={onLoadNextPart}
                className={classNames(cls.ArticlePage, {}, [className])}
            >
                <ArticlesPageFilters />
                <ArticleList
                    className={cls.list}
                    isLoading={isLoading}
                    view={view}
                    articles={articles}
                />
            </Page>
        </DynamicModuleLoader>
    )
}

export default memo(ArticlePage)
