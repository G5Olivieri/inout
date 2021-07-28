import React, { useEffect, useState } from "react"
import style from './style.module.scss'

type CounterProps = {
  onChange?: (value: number) => Promise<void> | void
  defaultValue?: number,
  min?: number,
  max?: number,
  className?: string,
}

export const Counter: React.FC<CounterProps> = ({ defaultValue, min = 0, max = Number.MAX_SAFE_INTEGER, onChange = () => { }, className}) => {
  const [value, setValue] = useState(defaultValue ?? min)
  const [inputValue, setInputValue] = useState(value.toString())
  const [maxLimitReached, setMaxLimitReached] = useState(false)
  const [minLimitReachead, setMinLimitReached] = useState(false)

  const newValue = (value: number) => {
    setInputValue(value.toString())
    setValue(value)
    onChange(value)
  }

  useEffect(() => {
    if (value >= max) {
      setMaxLimitReached(true)
    } else {
      setMaxLimitReached(false)
    }
    if (value <= min) {
      setMinLimitReached(true)
    } else {
      setMinLimitReached(false)
    }
  }, [value, max, min])

  const onDecrement = () => {
    if (value <= min) {
      return
    }
    newValue(value - 1)
  }

  const onIncrement = () => {
    if (value >= max) {
      return
    }
    newValue(value + 1)
  }

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isNumberReg = /\d+/g
    const targetValue = event.target.value
    if (targetValue === '') {
      // TODO: I still don't know what I'm going to do here
      setInputValue('')
    } else if (isNumberReg.test(targetValue)) {
      newValue(parseInt(targetValue))
    }
  }

  const onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    // TODO: remove else if
    if (inputValue === '') {
      event.target.setCustomValidity('Input must be not empty')
    } else if (value < min) {
      event.target.setCustomValidity(`Input must be greater than ${min}`)
    } else if (value > max) {
      event.target.setCustomValidity(`Input must be less than ${max}`)
    } else {
      event.target.setCustomValidity('')
    }
  }

  return (
    <span className={`${style.container} ${className}`} >
      <button type="button" onClick={onIncrement} className={style.increment} disabled={maxLimitReached}>+</button>
      <input type="text" value={inputValue} onChange={onChangeInput} onBlur={onBlur} />
      <button type="button" onClick={onDecrement} className={style.decrement} disabled={minLimitReachead}>-</button>
    </span>
  )
}
