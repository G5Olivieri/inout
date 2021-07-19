import style from './style.module.scss'
import LoupeIcon from './icons/loupe-icon'
import FilterIcon from './icons/filter-icon'

// TODO: change to const and remove default
export default function Search() {
  return (
    <div className={style.search}>
      <div className={style.input}>
        <LoupeIcon />
        <input type="text" />
      </div>
      <FilterIcon />
    </div>
  )
}
