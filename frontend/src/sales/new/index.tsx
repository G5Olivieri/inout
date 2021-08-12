import { Product, useAllProducts } from '../../services/products'
import style from './style.module.scss'
import { NewSaleForm } from './components/new-sale-form'
import { createSale, CreateSale } from '../../services/sales'
import { Switch, Route, useHistory, useRouteMatch } from 'react-router-dom'
import { SelectProducts } from './components/new-sale-form/select-product'
import { useState } from 'react'
import { useEffect } from 'react'

export default function NewSale() {
  const router = useHistory()
  const { path, url } = useRouteMatch()

  const [availableProducts, setAvailableProducts] = useState<Array<Product>>([])
  const [selectedProducts, setSelectedProducts] = useState<Array<Product>>([])

  const { products, isLoading, error } = useAllProducts()

  useEffect(() => {
    if(products.length > 0) {
      setAvailableProducts(products.filter(p => p.quantity > 0))
    }
  }, [products])

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  const onSubmit = (sale: CreateSale) => {
    createSale(sale).then(() => router.push('/sales'))
  }

  const onAddProducts = () => {
    router.push(`${url}/choose-products`)
  }

  const onSelect = (products: Array<Product>) => {
    setSelectedProducts([...selectedProducts, ...products.map(product => ({ ...product, quantity: 1 }))])
    setAvailableProducts(availableProducts.filter((p) => products.findIndex(product => product.id === p.id) < 0))
    router.push(url)
  }

  const unselect = (product: Product) => {
    const availableProduct = getOriginalProduct(product)
    setSelectedProducts(selectedProducts.filter(p => product.id !== p.id))
    setAvailableProducts([...availableProducts, availableProduct].sort((a, b) => a.id - b.id))
  }

  const onQuantityChange = (value: number, product: Product) => {
    const index = selectedProducts.findIndex((p) => p.id === product.id)
    if (index < 0) {
      return
    }
    selectedProducts[index].quantity = value
    setSelectedProducts(selectedProducts)
  }

  const getOriginalProduct = (product: Product) => {
    const originalProduct = products.find((p) => product.id === p.id)
    if (!originalProduct) {
      throw new Error("Product nonexistent in products")
    }
    return originalProduct
  }

  return (
    <div className={style.container}>
        <Switch>
          <Route exact path={path}>
            <NewSaleForm
              hasAvailableProducts={availableProducts.length > 0}
              selectedProducts={selectedProducts}
              getOriginalProduct={getOriginalProduct}
              onQuantityChange={onQuantityChange}
              unselect={unselect}
              onSubmit={onSubmit}
              onAddProducts={onAddProducts}
              />
          </Route>
          <Route exact path={`${path}/choose-products`}>
            <SelectProducts
              products={availableProducts}
              onSelect={onSelect}
            />
          </Route>
        </Switch>
    </div>
  )
}
