import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
const AddProduct = lazy(() => import('@app/products/add-products'))

export const App: React.FC = (): JSX.Element => (
  <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/">
          <AddProduct />
        </Route>
        <Route path="*">
          <h1>Pagina nao encontrada!</h1>
        </Route>
      </Switch>
    </Suspense>
  </BrowserRouter>
)
