import { classNames } from "shared/lib/classNames/classnames"
import { useTranslation } from "react-i18next"
import { Select } from "shared/ui/Select/Select"
import { Currency } from "../model/types/currency"
import { memo, useCallback } from "react"

interface CurrencySelectProps {
    className?: string
    value?: Currency
    onChange?: (currency: Currency) => void
    readonly?: boolean
}

const options = [
    { value: Currency.RUB, content: Currency.RUB },
    { value: Currency.EUR, content: Currency.EUR },
    { value: Currency.USD, content: Currency.USD },
]

export const CurrencySelect = memo(
    ({ className, onChange, value, readonly }: CurrencySelectProps) => {
        const { t } = useTranslation()

        const onChangeHandler = useCallback(
            (value: string) => {
                onChange?.(value as Currency)
            },
            [onChange],
        )

        return (
            <Select
                readonly={readonly}
                onChange={onChangeHandler}
                value={value}
                label={t("Укажите валюту")}
                className={classNames("", {}, [className])}
                options={options}
            />
        )
    },
)
