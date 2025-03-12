import { AsyncThunkAction } from "@reduxjs/toolkit"
import { StateSchema } from "@/app/providers/StoreProvider"
import axios, { AxiosStatic } from "axios"

type ActionCreatorType<Return, Arg, RejectedValue> = (arg: Arg) => AsyncThunkAction<
    Return,
    Arg,
    { rejectValue: RejectedValue }
>

jest.mock('axios')

const mokedAxios = jest.mocked(axios, true)
// флаг true укаывает что мы мокаем внутренние поля, например post

export class TestAsyncThunk<Return, Arg, RejectedValue> {
    // Return - то что возвращает AsyncAction
    // Arg - аргументы его - пропсы
    // RejectedValue - ошибка


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dispatch: jest.MockedFn<any>
    getState: () => StateSchema
    // мокаем функции

    actionCreator: ActionCreatorType<Return, Arg, RejectedValue>

    api: jest.MockedFunctionDeep<AxiosStatic>
    // jest.MockedFunctionDeep<AxiosStatic> тип, который возвращает mokedAxios

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    navigate: jest.MockedFn<any>

    constructor(actionCreator: ActionCreatorType<Return, Arg, RejectedValue>, state?: DeepPartial<StateSchema>) {
        this.actionCreator = actionCreator
        this.dispatch = jest.fn()
        this.getState = jest.fn(() => state as StateSchema)

        this.api = mokedAxios
        this.navigate = jest.fn()
    }

    async callThunk(arg: Arg) {
        const action = this.actionCreator(arg) // устанавливает значение, которое вернет сервер
        // loginByUsername - создает асинхроный createAsyncThunk - action

        const result = await action(
            this.dispatch, // сам dispatch
            this.getState, // getState
            {api: this.api, navigate: this.navigate} // extra args
        )
        // action принимает три аргумента 

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
