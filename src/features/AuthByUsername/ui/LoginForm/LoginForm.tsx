import { classNames } from "shared/lib/classNames/classnames"
import cls from "./LoginForm.module.scss"
import { useTranslation } from "react-i18next"
import { Button, ButtonTheme } from "shared/ui/Button/Button"
import { Input } from "shared/ui/Input/Input"
import { useSelector } from "react-redux"
import { memo, useCallback } from "react"
import { loginActions, loginReducer } from "../../model/slice/loginSlice"
import { loginByUsername } from "../../model/service/loginByUsername/loginByUsername"
import { Text, TextTheme } from "shared/ui/Text/Text"
import { getLoginUsername } from "../../model/selectors/getLoginUsername/getLoginUsername"
import { getLoginPassword } from "../../model/selectors/getLoginPassword/getLoginPassword"
import { getLoginLoading } from "../../model/selectors/getLoginLoading/getLoginLoading"
import { getLoginError } from "../../model/selectors/getLoginError/getLoginError"
import {
    DynamicModuleLoader,
    ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader"
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch"

export interface LoginFormProps {
    className?: string
    onSuccess: () => void
}

// ВЫНОСИМ КОНСТАНТУ, ЧТОБЫ НА КАЖДОМ РЕНДЕРЕ КОМПОНЕНТА НЕ СОЗДАВАЛСЯ НОВЫЙ ОБЬЕКТ И НОВАЯ ССЫЛКА
const initialReducers: ReducersList = {
    loginForm: loginReducer,
}

const LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const username = useSelector(getLoginUsername)
    const password = useSelector(getLoginPassword)
    const isLoading = useSelector(getLoginLoading)
    const error = useSelector(getLoginError)

    const onChangeUsername = useCallback(
        (value: string) => {
            dispatch(loginActions.setUsername(value))
        },
        [dispatch],
    )

    const onChangePassword = useCallback(
        (value: string) => {
            dispatch(loginActions.setPassword(value))
        },
        [dispatch],
    )

    const onLoginClick = useCallback(async () => {
        const result = await dispatch(loginByUsername({ username, password }))
        if (result.meta.requestStatus === "fulfilled") {
            onSuccess()
            // если вход удался, то нужно закрыть модалку
        }
    }, [dispatch, password, username, onSuccess])

    return (
        <DynamicModuleLoader reducers={initialReducers}>
            <div className={classNames(cls.LoginForm, {}, [className])}>
                <Text title={t("Форма авторизации")} />
                {error && (
                    <Text
                        theme={TextTheme.ERROR}
                        text={t(
                            "Вы ввели неверный пароль или имя пользователя",
                        )}
                    />
                )}
                <Input
                    autofocus
                    placeholder={t("Введите имя пользователя")}
                    className={cls.input}
                    type="text"
                    onChange={onChangeUsername}
                    value={username}
                />
                <Input
                    placeholder={t("Введите пароль")}
                    className={cls.input}
                    type="text"
                    onChange={onChangePassword}
                    value={password}
                />
                <Button
                    disabled={isLoading}
                    onClick={onLoginClick}
                    theme={ButtonTheme.OUTLINE}
                    className={cls.loginBtn}
                >
                    {t("Войти")}
                </Button>
            </div>
        </DynamicModuleLoader>
    )
})
export default LoginForm
