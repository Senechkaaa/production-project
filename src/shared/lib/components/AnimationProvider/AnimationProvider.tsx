import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react"

type SpringType = typeof import("@react-spring/web")
type GestureType = typeof import("@use-gesture/react")

// AnimationProvider асинхронно подгружает 2 библоитеки и не идут в основной бандл
interface AnimationContextPayload {
    Gesture?: GestureType
    Spring?: SpringType
    isLoaded?: boolean
}

const AnimationContext = createContext<AnimationContextPayload>({})

// Обе бибилиотеки зависят друг от друга
const getAsyncAnimationModules = () => {
    // Promise.all делает запросы параллельно, а не последовательно
    return Promise.all([
        import("@react-spring/web"),
        import("@use-gesture/react"),
    ])
}

export const useAnimationLibs = () => {
    return useContext(AnimationContext) as Required<AnimationContextPayload>
    // as Required<AnimationContextPayload> вернет все поля в обязательном порядке, они никогда не будут undefined
}

export const AnimationProvider = ({ children }: { children: ReactNode }) => {
    const SpringRef = useRef<SpringType>()
    const GestureRef = useRef<GestureType>()
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        getAsyncAnimationModules().then(([Spring, Gesture]) => {
            SpringRef.current = Spring
            GestureRef.current = Gesture
            setIsLoaded(true)
        })
    }, [])

    const value = useMemo(() => {
        return {
            Gesture: GestureRef.current,
            Spring: SpringRef.current,
            isLoaded,
        }
    }, [isLoaded])

    return (
        <AnimationContext.Provider
            value={value}
        >
            {children}
        </AnimationContext.Provider>
    )
}
