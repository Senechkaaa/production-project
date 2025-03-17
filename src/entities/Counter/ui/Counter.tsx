import { Button, ButtonSize, ButtonTheme } from "@/shared/ui/Button"
import { useCounterActions } from "../model/slice/counterSlice"
import {
    useCounterValue,
} from "../model/selectors/getCounterValue/getCounterValue"

export const Counter = () => {
    const counterValue = useCounterValue()
    const { add, decrement, increment } = useCounterActions()
    const handleInc = () => {
        increment()
    }
    const handleDec = () => {
        decrement()
    }

    const handleAddFive = () => {
        add(5)
    }

    return (
        <div data-testid="sidebar">
            <h1 data-testid="value-title">value = {counterValue}</h1>
            <Button
                data-testid="increment-btn"
                theme={ButtonTheme.OUTLINE}
                size={ButtonSize.M}
                onClick={handleInc}
            >
                increment
            </Button>
            <Button
                data-testid="decrement-btn"
                theme={ButtonTheme.OUTLINE}
                size={ButtonSize.M}
                onClick={handleDec}
            >
                decrement
            </Button>
            <Button
                theme={ButtonTheme.OUTLINE}
                size={ButtonSize.M}
                onClick={handleAddFive}
            >
                Add Five
            </Button>
        </div>
    )
}
