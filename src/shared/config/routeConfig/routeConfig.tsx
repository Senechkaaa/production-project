import { AboutPage } from "pages/AboutPage"
import { ArticleDetailsPage } from "pages/ArticleDetailsPage"
import { ArticlePage } from "pages/ArticlePage"
import { MainPage } from "pages/MainPage"
import { NotFoundPage } from "pages/NotFoundPage"
import { ProfilePage } from "pages/ProfilePage"
import { RouteProps } from "react-router-dom"

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean
}

export enum AppRoutes {
    MAIN = "main",
    ABOUT = "about",
    PROFILE = "profile",
    ARTICLES = "articles",
    ARTICLE_DETAILS = "article_details",
    // last
    NOT_FOUND = "not_found",
}

export const RoutesPath: Record<AppRoutes, string> = {
    [AppRoutes.ABOUT]: "/about",
    [AppRoutes.MAIN]: "/",
    [AppRoutes.PROFILE]: "/profile",
    [AppRoutes.ARTICLES]: "/articles",
    [AppRoutes.ARTICLE_DETAILS]: "/articles/", // + .id,
    // last
    [AppRoutes.NOT_FOUND]: "*",
}

// Можно сделать массив - даже лучше
export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: RoutesPath.main,
        element: <MainPage />,
    },
    [AppRoutes.ABOUT]: {
        path: RoutesPath.about,
        element: <AboutPage />,
    },
    [AppRoutes.PROFILE]: {
        path: RoutesPath.profile,
        element: <ProfilePage />,
        authOnly: true,
    },

    [AppRoutes.ARTICLES]: {
        path: RoutesPath.articles,
        element: <ArticlePage />,
        authOnly: true,
    },

    [AppRoutes.ARTICLE_DETAILS]: {
        path: `${RoutesPath.article_details}:id`,
        element: <ArticleDetailsPage />,
        authOnly: true,
    },

    // last
    [AppRoutes.NOT_FOUND]: {
        path: RoutesPath.not_found,
        element: <NotFoundPage />,
    },
}
// RouteProps хранит в себе
//     caseSensitive?: boolean;
//     children?: React.ReactNode;
//     element?: React.ReactNode | null;
//     index?: boolean;
//     path?: string;
