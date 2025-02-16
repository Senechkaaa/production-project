import { getUserAuthData } from "entities/User";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RoutesPath } from "shared/config/routeConfig/routeConfig";

export function RequireAuth({children}: {children: JSX.Element}) {
    const auth = useSelector(getUserAuthData)
    const location = useLocation()

    if (!auth) {
        return (
            <Navigate to={RoutesPath.main} state={{ from: location }} replace />
        )
        // replace - чтобы нельзя было вернуться на предыдущую страницу
    }

    return children
}