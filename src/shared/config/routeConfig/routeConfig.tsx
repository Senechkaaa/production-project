import { AboutPage } from 'pages/AboutPage'
import { MainPage } from 'pages/MainPage'
import { RouteProps } from 'react-router-dom'


export enum AppRoutes {
    MAIN = 'main',
    ABOUT = 'about',
}

export const RoutesPath: Record<AppRoutes, string> = {
    [AppRoutes.ABOUT]: '/about',
    [AppRoutes.MAIN]: '/',
}

// Можно сделать массив - даже лучше
export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.MAIN]: {
        path: RoutesPath.main,
        element: <MainPage />,
    },
    [AppRoutes.ABOUT]: {
        path: RoutesPath.about,
        element: <AboutPage />,
    },
}
// RouteProps хранит в себе
//     caseSensitive?: boolean;
//     children?: React.ReactNode;
//     element?: React.ReactNode | null;
//     index?: boolean;
//     path?: string;
