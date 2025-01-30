import { useDispatch, useSelector } from "react-redux"
import { Button, ButtonSize, ButtonTheme } from "shared/ui/Button/Button"
import { counterActions } from "../model/slice/counterSlice"
import { getCounterValue } from "../model/selectors/getCounterValue/getCounterValue"

export const Counter = () => {
    const dispatch = useDispatch()
    const counterValue = useSelector(getCounterValue)

    const increment = () => {
        console.log("increment")
        dispatch(counterActions.increment())
    }
    const decrement = () => {
        console.log("decrement")
        dispatch(counterActions.decrement())
    }

    return (
        <div data-testid="sidebar">
            <h1 data-testid="value-title">value = {counterValue}</h1>
            <Button
                data-testid="increment-btn"
                theme={ButtonTheme.OUTLINE}
                size={ButtonSize.M}
                onClick={() => increment()}
            >
                increment
            </Button>
            <Button
                data-testid="decrement-btn"
                theme={ButtonTheme.OUTLINE}
                size={ButtonSize.M}
                onClick={decrement}
            >
                decrement
            </Button>
        </div>
    )
}
