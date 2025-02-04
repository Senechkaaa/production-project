import { classNames } from "shared/lib/classNames/classnames"
import cls from "./ProfilePage.module.scss"
import { useTranslation } from "react-i18next"
import { DynamicModuleLoader, ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader"
import { profileReducer } from "entities/Profile"

interface ProfilePageProps {
    className?: string
}

const reducers: ReducersList = {
    profile: profileReducer
}

const ProfilePage = ({ className }: ProfilePageProps) => {
    const { t } = useTranslation()

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <div className={classNames(cls.ProfilePage, {}, [className])}>
                {t("Profile page")}
            </div>
        </DynamicModuleLoader>
    )
}

export default ProfilePage
