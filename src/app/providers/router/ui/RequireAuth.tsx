import { getUserAuthData, getUserRoles, UserRole } from "@/entities/User"
import { RoutesPath } from "@/shared/const/router"
import { useMemo } from "react"
import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"

interface RequireAuthProps {
    children: JSX.Element
    roles?: UserRole[]
}

export function RequireAuth({ children, roles }: RequireAuthProps) {
    const auth = useSelector(getUserAuthData)
    const location = useLocation()
    const userRoles = useSelector(getUserRoles)

    const hasRequiredRoles = useMemo(() => {
        if (!roles) {
            return true
        }

        return roles.some(requiredRole => {
            const hasRole = userRoles?.includes(requiredRole);
            return hasRole
        })
    }, [roles, userRoles])

    if (!hasRequiredRoles) {
        return (
            <Navigate to={RoutesPath.forbidden} state={{ from: location }} replace />
        )
    }

    if (!auth || !hasRequiredRoles) {
        return (
            <Navigate to={RoutesPath.main} state={{ from: location }} replace />
        )
        // replace - чтобы нельзя было вернуться на предыдущую страницу
    }

    return children
}
