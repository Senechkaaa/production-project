import { classNames } from "shared/lib/classNames/classnames"
import { useTranslation } from "react-i18next"
import { Select } from "shared/ui/Select/Select"
import { memo, useCallback } from "react"
import { Country } from "entities/Country/model/types/country"

interface CountrySelectProps {
    className?: string
    value?: Country
    onChange?: (country: Country) => void
    readonly?: boolean
}

const options = [
    { value: Country.Belarus, content: Country.Belarus },
    { value: Country.Canada, content: Country.Canada },
    { value: Country.France, content: Country.France },
    { value: Country.Germany, content: Country.Germany },
    { value: Country.USA, content: Country.USA },
]

export const CountrySelect = memo(
    ({ className, onChange, value, readonly }: CountrySelectProps) => {
        const { t } = useTranslation()

        const onChangeHandler = useCallback(
            (value: string) => {
                onChange?.(value as Country)
            },
            [onChange],
        )

        return (
            <Select
                readonly={readonly}
                onChange={onChangeHandler}
                value={value}
                label={t("Укажите страну")}
                className={classNames("", {}, [className])}
                options={options}
            />
        )
    },
)
