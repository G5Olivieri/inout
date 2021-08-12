import style from './style.module.scss'
import { ChangeEvent, PropsWithChildren, useState } from 'react'

type ProductListProps<T> = {
  items: Array<T>
  onSearchChange: (search: string) => void
  listItemComponent: (item: T, index: number) => JSX.Element
}

export const SearchableList = <T,>(
  {onSearchChange, items, listItemComponent}: PropsWithChildren<ProductListProps<T>>) => {
  const [search, setSearch] = useState('')

  const onSearchChangeWrapper = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setSearch(value)
    onSearchChange(value)
  }

  return (
    <div className={style.container}>
      <div className={style.searchInput}>
        <input type="text" onChange={onSearchChangeWrapper} value={search} placeholder="Buscar..." />
      </div>
      <ul>
        {items.map((v, i) => listItemComponent(v, i))}
      </ul>
    </div>
  )
}
