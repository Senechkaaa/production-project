import { classNames } from "shared/lib/classNames/classnames"
import {
    DynamicModuleLoader,
    ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader"
import { fetchProfileData, ProfileCard, profileReducer } from "entities/Profile"
import { useEffect } from "react"
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch"

interface ProfilePageProps {
    className?: string
}

const reducers: ReducersList = {
    profile: profileReducer,
}

const ProfilePage = ({ className }: ProfilePageProps) => {
    // const { t } = useTranslation()
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchProfileData())
    }, [dispatch])

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <div className={classNames("ProfilePage", {}, [className])}>
                <ProfileCard/>
            </div>
        </DynamicModuleLoader>
    )
}

export default ProfilePage
