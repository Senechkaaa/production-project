import { Popover as HPopover } from "@headlessui/react"
import { DropDownDirection } from "../../../../types/ui"
import { ReactNode } from "react"
import { mapDirectionClass } from "../../consts/consts"
import cls from "./Popover.module.scss"
import popupCls from "../../styles/popup.module.scss"
import { classNames } from "shared/lib/classNames/classnames"

interface PopoverProps {
    className?: string
    trigger: ReactNode
    direction?: DropDownDirection
    children: ReactNode
}

export const Popover = (props: PopoverProps) => {
    const { className, direction = "bottom right", trigger, children } = props
    const menuClasses = mapDirectionClass[direction]

    return (
        <HPopover
            className={classNames(cls.Popover, {}, [className, popupCls.popup])}
        >
            <HPopover.Button className={popupCls.trigger}>
                {trigger}
            </HPopover.Button>
            <HPopover.Panel className={classNames(cls.panel, {}, [menuClasses])}>
                {children}
            </HPopover.Panel>
        </HPopover>
    )
}
