import { Menu } from "@headlessui/react"
import cls from "./DropDow.module.scss"
import { classNames } from "shared/lib/classNames/classnames"
import { Fragment, ReactNode } from "react"
import { DropDownDirection } from "shared/types/ui"
import { AppLink } from "../AppLink/AppLink"

interface DropDownProps {
    className?: string
    items: DropDownItem[]
    trigger: ReactNode
    direction?: DropDownDirection
}

interface DropDownItem {
    disabled?: boolean
    content?: ReactNode
    onClick?: () => void
    href?: string
}

const mapDirectionClass: Record<DropDownDirection, string> = {
    "bottom left": cls.optionBottomLeft,
    "bottom right": cls.optionBottomRight,
    "top left": cls.optionTopLeft,
    "top right": cls.optionTopRight,
}

export const DropDown = (props: DropDownProps) => {
    const { className, items, trigger, direction = "bottom right" } = props

    const menuClasses = mapDirectionClass[direction]
    return (
        <Menu as="div" className={classNames(cls.Dropdown, {}, [className])}>
            <Menu.Button className={cls.btn}>{trigger}</Menu.Button>
            <Menu.Items className={classNames(cls.menu, {}, [menuClasses])}>
                {items.map((item) => {
                    const content = ({ active }: { active: boolean }) => (
                        <button
                            className={classNames(
                                cls.item,
                                { [cls.active]: active },
                                [],
                            )}
                            type="button"
                            onClick={item.onClick}
                            disabled={item.disabled}
                        >
                            {item.content}
                        </button>
                    )

                    if(item.href) {
                        return (
                            <Menu.Item
                                key={item.href}
                                as={AppLink}
                                to={item.href}
                                disabled={item.disabled}
                            >
                                {content}
                            </Menu.Item>
                        )
                    }

                    return (
                        <Menu.Item
                            key={item.href}
                            as={Fragment}
                            disabled={item.disabled}
                        >
                            {content}
                        </Menu.Item>
                    )
                })}
            </Menu.Items>
        </Menu>
    )
}
