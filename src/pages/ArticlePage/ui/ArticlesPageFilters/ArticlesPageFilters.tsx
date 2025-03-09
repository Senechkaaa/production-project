import { classNames } from "shared/lib/classNames/classnames"
import cls from "./ArticlesPageFilters.module.scss"
import { useTranslation } from "react-i18next"
import { memo, useCallback } from "react"
import {
    ArticleSortField,
    ArticleSortSelector,
    ArticleTypeTabs,
    ArticleView,
    ArticleViewSelector,
} from "entities/Article"
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch"
import { useSelector } from "react-redux"
import {
    getArticlesPageOrder,
    getArticlesPageSearch,
    getArticlesPageSort,
    getArticlesPageType,
    getArticlesPageView,
} from "../../model/selectors/articlesPageSelector"
import { articlesPageActions } from "../../model/slices/articlePageSlice"
import { Card } from "shared/ui/Card/Card"
import { Input } from "shared/ui/Input/Input"
import { SortOrder } from "shared/types"
import { fetchArticlesList } from "pages/ArticlePage/model/services/fetchArticleList/fetchArticleList"
import { useDebounce } from "shared/lib/hooks/useDebounce/useDebounce"
import { ArticleType } from "entities/Article"

interface ArticlesPageFiltersProps {
    className?: string
}

export const ArticlesPageFilters = memo(
    ({ className }: ArticlesPageFiltersProps) => {
        const { t } = useTranslation()
        const view = useSelector(getArticlesPageView)
        const dispatch = useAppDispatch()
        const sort = useSelector(getArticlesPageSort)
        const order = useSelector(getArticlesPageOrder)
        const search = useSelector(getArticlesPageSearch)
        const type = useSelector(getArticlesPageType)

        const fetchData = useCallback(() => {
            dispatch(fetchArticlesList({replace: true}))
        }, [dispatch])

        const debouncedFetchData = useDebounce(fetchData, 500)

        const onChangeView = useCallback(
            (view: ArticleView) => {
                dispatch(articlesPageActions.setView(view))
                dispatch(articlesPageActions.setPage(1))
                fetchData()
            },
            [dispatch, fetchData],
        )

        const onChangeSort = useCallback(
            (newSort: ArticleSortField) => {
                dispatch(articlesPageActions.setSort(newSort))
                dispatch(articlesPageActions.setPage(1))
                debouncedFetchData()
            },
            [dispatch, debouncedFetchData],
        )

        const onChangeOrder = useCallback(
            (newOrder: SortOrder) => {
                dispatch(articlesPageActions.setOrder(newOrder))
                dispatch(articlesPageActions.setPage(1))
                debouncedFetchData()
            },
            [dispatch, debouncedFetchData],
        )

        const onChangeSearch = useCallback(
            (search: string) => {
                dispatch(articlesPageActions.setSearch(search))
                dispatch(articlesPageActions.setPage(1))
                debouncedFetchData()
            },
            [dispatch, debouncedFetchData],
        )

        const onChangeType = useCallback(
            (value: ArticleType) => {
                dispatch(articlesPageActions.setType(value))
                dispatch(articlesPageActions.setPage(1))
                fetchData()
            },
            [dispatch, fetchData],
        )

    
        return (
            <div
                className={classNames(cls.ArticlesPageFilters, {}, [className])}
            >
                <div className={cls.sortWrapper}>
                    <ArticleSortSelector
                        order={order}
                        sort={sort}
                        onChangeOrder={onChangeOrder}
                        onChangeSort={onChangeSort}
                    />
                    <ArticleViewSelector
                        view={view}
                        onViewClick={onChangeView}
                    />
                </div>
                <Card className={cls.search}>
                    <Input
                        value={search}
                        onChange={onChangeSearch}
                        placeholder={t("Поиск")}
                    />
                </Card>
                <ArticleTypeTabs value={type} onChangeType={onChangeType} className={cls.tabs}/>
            </div>
        )
    },
)
