import { Listbox as HListBox } from "@headlessui/react"
import { Fragment, ReactNode } from "react"
import cls from "./ListBox.module.scss"
import { classNames } from "shared/lib/classNames/classnames"
import { Button } from "../Button/Button"
import { HStack } from "../Stack/Flex"

export interface ListBoxItem {
    value: string
    content: ReactNode
    disabled?: boolean
}

type DropDownDirection = "top" | "bottom"

interface ListBoxProps {
    items?: ListBoxItem[]
    className?: string
    value?: string
    defaultValue?: string
    onChange: (value: string) => void
    readonly?: boolean
    direction?: DropDownDirection,
    label?: string
}

const mapDirectionClass: Record<DropDownDirection, string> = {
    bottom: cls.optionBottom,
    top: cls.optionTop,
}


export const ListBox = (props: ListBoxProps) => {
    const { className, items, defaultValue, onChange, value, readonly, direction = "bottom", label } = props

    const optionsClasses = mapDirectionClass[direction]
    return (
        <HStack gap="4">
            {label && <span >{label + ">"}</span>}
            <HListBox
                disabled={readonly}
                as={"div"}
                className={classNames(cls.ListBox, {}, [className])}
                value={value}
                onChange={onChange}
            >
                <HListBox.Button disabled={readonly} className={cls.trigger}>
                    <Button disabled={readonly}>{value ?? defaultValue}</Button>
                </HListBox.Button>
                <HListBox.Options
                    className={classNames(cls.options, {}, [optionsClasses])}
                >
                    {items?.map((item) => (
                        <HListBox.Option
                            disabled={item.disabled}
                            key={item.value}
                            value={item.value}
                            as={Fragment}
                        >
                            {({ active, selected }) => (
                                <li
                                    className={classNames(
                                        cls.item,
                                        {
                                            [cls.active]: active,
                                            [cls.disabled]: item.disabled,
                                        },
                                        [],
                                    )}
                                >
                                    {selected && "!!!"}
                                    {item.content}
                                </li>
                            )}
                        </HListBox.Option>
                    ))}
                </HListBox.Options>
            </HListBox>
        </HStack>
    )
}
