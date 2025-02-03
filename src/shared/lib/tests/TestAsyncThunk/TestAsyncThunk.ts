import { AsyncThunkAction } from "@reduxjs/toolkit"
import { StateSchema } from "app/providers/StoreProvider"

type ActionCreatorType<Return, Arg, RejectedValue> = (arg: Arg) => AsyncThunkAction<
    Return,
    Arg,
    { rejectValue: RejectedValue }
>

export class TestAsyncThunk<Return, Arg, RejectedValue> {
    // Return - то что возвращает AsyncAction
    // Arg - аргументы его - пропсы
    // RejectedValue - ошибка
    dispatch: jest.MockedFn<any>
    getState: () => StateSchema
    // мокаем функции
    actionCreator: ActionCreatorType<Return, Arg, RejectedValue>

    constructor(actionCreator: ActionCreatorType<Return, Arg, RejectedValue>) {
        this.actionCreator = actionCreator
        this.dispatch = jest.fn()
        this.getState = jest.fn()
    }

    async callThunk(arg: Arg) {
        const action = this.actionCreator(arg) // устанавливает значение, которое вернет сервер
        // loginByUsername - создает асинхроный createAsyncThunk - action

        const result = await action(this.dispatch, this.getState, undefined)
        // const action: (dispatch: ThunkDispatch<unknown, unknown, AnyAction>, getState: () => unknown, extra: unknown) - вот что принимает в качестве аргументов action

        return result

        // result ниже
    }
}

// {
//   type: 'users/loginByUsername/fulfilled',
//   payload: { username: 'user1', id: '1' },
//   meta: {
//     arg: { username: '123', password: '123' },
//     requestId: 'Fy0gDA1goNVc-3pQvHQnU',
//     requestStatus: 'fulfilled'
//   }
// }
