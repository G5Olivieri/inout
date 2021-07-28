import { useEffect, useRef } from "react"

type PriceInputProps = {
  onChange: (price: string) => void
  value: string
  required: boolean
  valid: string
}

const isNumber =  /^[\d.,]+$/

// TODO: change to const and remove default
export default function PriceInput({ onChange, value, required, valid }: PriceInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if(inputRef.current) {
      inputRef.current.setCustomValidity(valid)
    }
  }, [valid])

  // TODO: change to const
  function onChangeWrapper(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value.replaceAll('.','').replaceAll(',','').replaceAll(/^0+/g, '')

    if (!(isNumber.test(value) || value === '')) {
      return
    }

    // TODO: move this to service
    let amount = ''
    if (value.length <= 2) {
      amount = `0,${value.padStart(2, '0')}`
    }
    else {
      amount = `${value.slice(0, value.length - 2)},${value.slice(value.length-2, value.length)}`
    }
    amount = amount.replace(".", ",").split("").reverse().map((v, i) => i > 5 && (i + 6) % 3 === 0 ? `${v}.` : v).reverse().join("")

    onChange(amount)
  }

  return <input
          type="text"
          name="price"
          id="price"
          placeholder="Preço"
          onChange={onChangeWrapper}
          value={value}
          required={required}
          ref={inputRef}
  />
}
