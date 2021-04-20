import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
const AddProduct = lazy(() => import('@app/products/add-product'))
const ListProducts = lazy(() => import('@app/products/list-products'))

export const App: React.FC = (): JSX.Element => (
  <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/">
          <ListProducts />
        </Route>
        <Route exact path="/add-product">
          <AddProduct />
        </Route>
        <Route path="*">
          <h1>Pagina nao encontrada!</h1>
        </Route>
      </Switch>
    </Suspense>
  </BrowserRouter>
)
