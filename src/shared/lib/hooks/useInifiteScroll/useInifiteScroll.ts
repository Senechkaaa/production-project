import { current } from "@reduxjs/toolkit"
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
        if (callback) {
            const options = {
                root: wrapperRef.current,
                // указываем в каком месте следим за обьектом
                rootMargin: "0px",
                threshold: 1.0,
            }

            observer.current = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) {
                    callback()
                }
            }, options)

            observer.current.observe(triggerRef.current)
            // указываем, за каким элементом следим

            return () => {
                if (observer.current) {
                    observer.current.unobserve(triggerRef.current)
                }
            }
        }
    }, [callback, triggerRef, wrapperRef])
}
