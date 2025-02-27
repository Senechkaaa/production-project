import { useCallback, useRef } from "react"

// тротлинг позволяет оптимизировать события, которые вызываются часто

export function useThrottle(callback: (...args: any[]) => void, delay: number) {
    const throttleRef = useRef(false)
    // UseRef используем потому, что они позволяют сохранять значение между рендерами компонента.
    // let throttleRef = false - нельзя, так после перерендера значение сбросится
    return useCallback(
        (...args: any[]) => {
            if (!throttleRef.current) {
                callback(...args)
                throttleRef.current = true

                setTimeout(() => {
                    throttleRef.current = false
                }, delay)
            }
        },
        [callback, delay],
    )
}
