import { MutableRefObject, useEffect, useRef } from "react"

export interface UseInifiteScrolloptions {
    callback?: () => void
    triggerRef: MutableRefObject<HTMLElement>
    wrapperRef: MutableRefObject<HTMLElement>
}
export function useInifiteScroll({
    callback,
    triggerRef,
    wrapperRef,
}: UseInifiteScrolloptions) {
    const observer = useRef<IntersectionObserver | null>(null)
    useEffect(() => {
        const wrapperElement = wrapperRef.current
        const triggerElement = triggerRef.current
        // выносим, чтобы после очищения эффекта не было null в triggerRef и не возникло ошибки на 38 строке

        if (callback) {
            const options = {
                root: wrapperElement,
                // указываем в каком месте следим за обьектом
                rootMargin: "0px",
                threshold: 1.0,
            }

            observer.current = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) {
                    callback()
                }
            }, options)

            observer.current.observe(triggerElement)
            // указываем, за каким элементом следим

            return () => {
                if (observer.current && triggerElement) {
                    observer.current.unobserve(triggerElement)
                }
            }
        }
    }, [callback, triggerRef, wrapperRef])
}
