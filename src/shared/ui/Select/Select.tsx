import { classNames, Mods } from "shared/lib/classNames/classnames"
import cls from "./Select.module.scss"
import { ChangeEvent, memo, useMemo } from "react"

export interface SelectOption {
    value: string
    content: string
}

interface SelectProps {
    className?: string
    label?: string
    options?: SelectOption[]
    value?: string
    onChange?: (value: string) => void
    readonly?: boolean
}

export const Select = memo((props: SelectProps) => {
    const { className, label, options, onChange, value, readonly } = props

    const optionsList = useMemo(() => {
        return options?.map((opt) => (
            <option className={cls.option} key={opt.value} value={opt.value}>
                {opt.content}
            </option>
        ))
    }, [options])

    const mods: Mods = {}

    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange?.(e.target.value)
    }

    return (
        <div className={classNames(cls.Wapper, mods, [className])}>
            {label && <span className={cls.label}>{`${label}>`}</span>}
            <select
                disabled={readonly}
                value={value}
                onChange={onChangeHandler}
                className={cls.select}
            >
                {optionsList}
            </select>
        </div>
    )
})
