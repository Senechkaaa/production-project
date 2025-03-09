import { classNames } from "shared/lib/classNames/classnames"
import cls from "./ArticleSortSelector.module.scss"
import { useTranslation } from "react-i18next"
import { memo, useMemo } from "react"
import { Select, SelectOption } from "shared/ui/Select/Select"
import { SortOrder } from "shared/types"
import { ArticleSortField } from "entities/Article/model/consts/articleConsts"

interface ArticleSortSelectorProps {
    className?: string
    sort: ArticleSortField
    order: SortOrder
    onChangeOrder: (newOrder: SortOrder) => void
    onChangeSort: (newSort: ArticleSortField) => void
}

// лучше сделать фичой

export const ArticleSortSelector = memo((props: ArticleSortSelectorProps) => {
    const { t } = useTranslation()
    const { className, onChangeOrder, onChangeSort, order, sort } = props

    const orderOptions = useMemo<SelectOption<SortOrder>[]>(
        () => [
            {
                content: t("возрастанию"),
                value: "asc",
            },
            {
                content: t("убыванию"),
                value: "desc",
            },
        ],
        [t],
    )

    const sortFieldOptions = useMemo<SelectOption<ArticleSortField>[]>(
        () => [
            {
                content: t("По созданию"),
                value: ArticleSortField.CREATED,
            },
            {
                content: t("По названию"),
                value: ArticleSortField.TITLE,
            },
            {
                content: t("По просмотрам"),
                value: ArticleSortField.VIEWS,
            },
        ],
        [t],
    )

    return (
        <div className={classNames(cls.ArticleSortSelector, {}, [className])}>
            <Select<ArticleSortField>
                label={t("Сортировать по")}
                options={sortFieldOptions}
                value={sort}
                onChange={onChangeSort}
            />
            <Select
                className={cls.order}
                value={order}
                onChange={onChangeOrder}
                options={orderOptions}
                label={t("По")}
            />
        </div>
    )
})
