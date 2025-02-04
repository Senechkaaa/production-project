import { SVGProps, VFC } from "react"
import { RoutesPath } from "shared/config/routeConfig/routeConfig"
import MainIcon from 'shared/assets/icons/main-20-20.svg'
import AboutIcon from 'shared/assets/icons/about-20-20.svg'
import ProfileIcon from "shared/assets/icons/profile-20-20.svg"

export interface SidebarItemType {
    path: string
    text: string
    Icon: VFC<SVGProps<SVGSVGElement>>
}

export const SidebarItemsList: SidebarItemType[] = [
    {
        path: RoutesPath.main,
        Icon: MainIcon,
        text: "Главная",
    },
    {
        path: RoutesPath.about,
        Icon: AboutIcon,
        text: "О сайте",
    },
    {
        path: RoutesPath.profile,
        Icon: ProfileIcon,
        text: "Профиль",
    },
]