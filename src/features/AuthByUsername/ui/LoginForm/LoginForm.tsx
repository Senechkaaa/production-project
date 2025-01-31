import { classNames } from "shared/lib/classNames/classnames"
import cls from "./LoginForm.module.scss"
import { useTranslation } from "react-i18next"
import { Button } from "shared/ui/Button/Button"
import { Input } from "shared/ui/Input/Input"

interface LoginFormProps {
    className?: string
}

export const LoginForm = ({ className }: LoginFormProps) => {
    const { t } = useTranslation()

    return (
        <div className={classNames(cls.LoginForm, {}, [className])}>
            <Input autofocus placeholder={t("Введите имя пользователя")} className={cls.input} type="text" />
            <Input placeholder={t("Введите пароль")} className={cls.input} type="text" />
            <Button className={cls.loginBtn}>{t("Войти")}</Button>
        </div>
    )
}
