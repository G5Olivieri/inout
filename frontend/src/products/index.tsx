import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { SearchableList } from '../components/searchable-list'
import { useDebounce } from '../hooks/use-debounce'
import { Product, useSearchProducts } from '../services/products'
import ProductListItem from './components/product-list-item'
import style from './style.module.scss'

export default function Products() {
  const router = useHistory()
  const [search, setSearch] = useState('')

  const {
    products,
    isLastPage,
    isLoadingMore,
    error,
    page,
    setPage
  } = useSearchProducts(useDebounce(search, 500))

  if (error) {
    console.error(error)
    return <div>failed to load</div>
  }

  const onClickProduct = (product: Product) => {
    router.push(`/products/edit/${product.id}`)
  }

  const onSearchChange = (value: string) => {
    setSearch(value)
  }

  return (
    <div className={style.container}>
      <SearchableList
        items={products}
        onSearchChange={onSearchChange}
        listItemComponent={(p) => <ProductListItem key={p.id} onClick={onClickProduct} product={p} />}
      />
      {isLoadingMore && <div>loading...</div>}
      {!isLastPage
        && <button className={style.loadMoreButton} onClick={() => setPage(page + 1)} disabled={isLoadingMore}>Carregar mais</button>}
    </div>
  )
}
