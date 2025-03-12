import { classNames } from "@/shared/lib/classNames/classnames"
import cls from "./AddCommentForm.module.scss"
import { useTranslation } from "react-i18next"
import { memo, useCallback } from "react"
import { Input } from "@/shared/ui/Input/Input"
import { Button, ButtonTheme } from "@/shared/ui/Button/Button"
import {
    DynamicModuleLoader,
    ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader"
import { useSelector } from "react-redux"
import {
    // getAddCommentFormError,
    getAddCommentFormText,
} from "../../model/selectors/addCommentFormSelectors"
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch"
import {
    addCommentFormActions,
    addCommentFormReducer,
} from "../../model/slices/addCommentFormSlice"
import { HStack } from "@/shared/ui/Stack/Flex"

export interface AddCommentFormProps {
    className?: string
    onSendComment: (text: string) => void
}

const reducers: ReducersList = {
    addCommentForm: addCommentFormReducer,
}

const AddCommentForm = memo(
    ({ className, onSendComment }: AddCommentFormProps) => {
        const { t } = useTranslation("article-details")
        const text = useSelector(getAddCommentFormText)
        // const error = useSelector(getAddCommentFormError)
        const dispatch = useAppDispatch()

        const onCommentTextChange = useCallback(
            (value: string) => {
                dispatch(addCommentFormActions.setText(value))
            },
            [dispatch],
        )

        const onSendHandler = useCallback(() => {
            onSendComment(text || "")
            onCommentTextChange("")
        }, [onSendComment, text, onCommentTextChange])

        return (
            <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
                <HStack
                    justify="between"
                    max
                    className={classNames(cls.AddCommentForm, {}, [className])}
                >
                    <Input
                        className={cls.input}
                        value={text}
                        onChange={onCommentTextChange}
                        placeholder={t("Введите текст комментария")}
                    />
                    <Button onClick={onSendHandler} theme={ButtonTheme.OUTLINE}>
                        {t("Отправить")}
                    </Button>
                </HStack>
            </DynamicModuleLoader>
        )
    },
)

export default AddCommentForm
