import { classNames } from "shared/lib/classNames/classnames"
import cls from "./Input.module.scss"
import { InputHTMLAttributes, memo, useEffect, useRef, useState } from "react"

type HtmlInputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange"
>

interface InputProps extends HtmlInputProps {
    className?: string
    value?: string
    onChange?: (value: string) => void,
    autofocus?: boolean,
}

export const Input = memo((props: InputProps) => {
    const {
        className,
        value,
        onChange,
        type = "text",
        placeholder,
        autofocus,
        ...otherProps
    } = props

    const [isFocused, setIsFocused] = useState(false)
    const [caretPosition, setCaretPosition] = useState(0)
    const ref = useRef<HTMLInputElement>(null)
    
    useEffect(() => {
        if (autofocus) {
            setIsFocused(true)
            ref.current.focus();
        }
    }, [autofocus])

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value)
        setCaretPosition(e.target.value.length)
    }

    const onBlur = () => {
        setIsFocused(false)
    }

    const onFocus = () => {
        setIsFocused(true)
    }

    const onSelect = (e: any) => {
        setCaretPosition(e?.target?.selectionStart || 0)
        // узнать где находится курсор каретки
    }

    return (
        <div className={classNames(cls.InputWrapper, {}, [className])}>
            {placeholder && (
                <div className={cls.placeholder}>{`${placeholder}>`}</div>
            )}
            <div className={cls.caretWrapper}>
                <input
                    ref={ref}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    value={value}
                    onChange={onChangeHandler}
                    type={type}
                    className={cls.input}
                    onSelect={onSelect}
                    {...otherProps}
                />
                {isFocused && (
                    <span
                        style={{ left: `${caretPosition * 9}px` }}
                        className={cls.caret}
                    ></span>
                )}
            </div>
        </div>
    )
})
