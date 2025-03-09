import { useTranslation } from "react-i18next"
import { memo, useCallback } from "react"
import { Country } from "entities/Country/model/types/country"
import { ListBox } from "shared/ui/Popups/ui/ListBox/ListBox"

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

        // return (
        //     <Select
        //         readonly={readonly}
        //         onChange={onChangeHandler}
        //         value={value}
        //         label={t("Укажите страну")}
        //         className={classNames("", {}, [className])}
        //         options={options}
        //     />
        // )

        return (
            <ListBox
                onChange={onChangeHandler}
                value={value}
                items={options}
                defaultValue={t("Укажите страну")}
                label={t("Укажите валюту")}
                className={className}
                readonly={readonly}
                direction={"top right"}
            />
        )
    },
)
