import { UserRole } from "@/entities/User"
import { AboutPageAsync as AboutPage } from "@/pages/AboutPage/ui/AboutPage.async"
import { AdminPanelPageAsync as AdminPanelPage } from "@/pages/AdminPanelPage/ui/AdminPanelPage.async"
import { ArticleDetailsPageAsync as ArticleDetailsPage } from "@/pages/ArticleDetailsPage/ui/ArticleDetailsPage/ArticleDetailsPage.async"
import { ArticleEditPageAsync as ArticleEditPage } from "@/pages/ArticleEditPage/ui/ArticleEditPage.async"
import { ArticlePageAsync as ArticlePage } from "@/pages/ArticlePage/ui/ArticlePage/ArticlePage.async"
import { ForbiddenPage } from "@/pages/ForbiddenPage"
import { MainPageAsync as MainPage } from "@/pages/MainPage/ui/MainPage.async"
import { NotFoundPage } from "@/pages/NotFoundPage"
import { ProfilePageAsync as ProfilePage } from "@/pages/ProfilePage/ui/ProfilePage.async"
import {
    AppRoutes,
    getRouteAbout,
    getRouteForbidden,
    getRouteAdminPanel,
    getRouteArticleCreate,
    getRouteArticleDetails,
    getRouteArticleEdit,
    getRouteArticles,
    getRouteMain,
    getRouteProfile,
} from "@/shared/const/router"
import { AppRoutesProps } from "@/shared/types/router"

// Можно сделать массив - даже лучше

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: getRouteMain(),
        element: <MainPage />,
    },
    [AppRoutes.ABOUT]: {
        path: getRouteAbout(),
        element: <AboutPage />,
    },
    [AppRoutes.PROFILE]: {
        path: getRouteProfile(":id"),
        element: <ProfilePage />,
        authOnly: true,
    },

    [AppRoutes.ARTICLES]: {
        path: getRouteArticles(),
        element: <ArticlePage />,
        authOnly: true,
    },

    [AppRoutes.ARTICLE_DETAILS]: {
        path: getRouteArticleDetails(":id"),
        element: <ArticleDetailsPage />,
        authOnly: true,
    },

    [AppRoutes.ARTICLE_CREATE]: {
        path: getRouteArticleCreate(),
        element: <ArticleEditPage />,
        authOnly: true,
    },

    [AppRoutes.ARTICLE_EDIT]: {
        path: getRouteArticleEdit(":id"),
        element: <ArticleEditPage />,
        authOnly: true,
    },
    [AppRoutes.ADMIN_PANEL]: {
        path: getRouteAdminPanel(),
        element: <AdminPanelPage />,
        authOnly: true,
        roles: [UserRole.MANAGER, UserRole.ADMIN],
    },
    [AppRoutes.FORBIDDEN]: {
        path: getRouteForbidden(),
        element: <ForbiddenPage />,
    },
    // last
    [AppRoutes.NOT_FOUND]: {
        path: "*",
        element: <NotFoundPage />,
    },
}
