import { fireEvent, screen } from "@testing-library/react"
import { componentRender } from "shared/config/storybook/tests/componentRender/componentRender"
import { Counter } from "./Counter"
// npm run unit Sidebar.test.tsx
describe("Counter", () => {
    test("", () => {
        componentRender(<Counter />, {
            initialState: { counter: { value: 10 } },
        })
        expect(screen.getByTestId("value-title")).toHaveTextContent('10')
    })


    test("increment", () => {
        componentRender(<Counter />, {
            initialState: { counter: { value: 10 } },
        })
        fireEvent.click(screen.getByTestId("increment-btn"))
        expect(screen.getByTestId("value-title")).toHaveTextContent("11")
    })

    test("decrement", () => {
        componentRender(<Counter />, {
            initialState: { counter: { value: 10 } },
        })
        fireEvent.click(screen.getByTestId("decrement-btn"))
        expect(screen.getByTestId("value-title")).toHaveTextContent("9")
    })
})
