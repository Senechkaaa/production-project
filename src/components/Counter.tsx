import React, { useState } from 'react'
import cl from './Counter.module.scss'

export const Counter = () => {

    const [counter, setCounter] = useState<number>(0)

  return (
    <>
        <div>{counter}</div>
        <button className={cl.btn} onClick={() => setCounter(counter + 1)}>Increment</button>
    </>
  )
}
