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
import { AppRoutes, RoutesPath } from "@/shared/const/router"
import { AppRoutesProps } from "@/shared/types/router"

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
        path: `${RoutesPath.profile}:id`,
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

    [AppRoutes.ARTICLE_CREATE]: {
        path: `${RoutesPath.article_create}`,
        element: <ArticleEditPage />,
        authOnly: true,
    },

    [AppRoutes.ARTICLE_EDIT]: {
        path: `${RoutesPath.article_edit}`,
        element: <ArticleEditPage />,
        authOnly: true,
    },
    [AppRoutes.ADMIN_PANEL]: {
        path: `${RoutesPath.admin_panel}`,
        element: <AdminPanelPage />,
        authOnly: true,
        roles: [UserRole.MANAGER, UserRole.ADMIN],
    },
    [AppRoutes.FORBIDDEN]: {
        path: `${RoutesPath.forbidden}`,
        element: <ForbiddenPage />,
    },
    // last
    [AppRoutes.NOT_FOUND]: {
        path: RoutesPath.not_found,
        element: <NotFoundPage />,
    },
}
