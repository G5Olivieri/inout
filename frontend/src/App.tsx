import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { NavigationBar } from './components/navigation-bar'
import { NavigationBarPages } from './components/navigation-bar/navigation-pages'
import Home from './home'
import Products from './products'
import EditProduct from './products/edit'
import NewProduct from './products/new'
import Sales from './sales'
import NewSale from './sales/new'


// TODO: change when there is a problem
const UpdatePage: React.FC<{ updatePage: () => void }> = ({ updatePage, children }) => {
  useEffect(() => updatePage(), [updatePage])
  return (
    <>
      {children}
    </>
  )
}

export default function App() {
  const [page, setPage] = useState(NavigationBarPages.none)

  return (
    <Router>
      <NavigationBar page={page} />
      <main>
        <Switch>
          <Route exact path="/">
            <UpdatePage updatePage={() => setPage(NavigationBarPages.home)}>
              <Home />
            </UpdatePage>
          </Route>
          <Route exact path="/products">
            <UpdatePage updatePage={() => setPage(NavigationBarPages.products)}>
              <Products />
            </UpdatePage>
          </Route>
          <Route exact path="/products/new">
            <UpdatePage updatePage={() => setPage(NavigationBarPages.products)}>
              <NewProduct />
            </UpdatePage>
          </Route>
          <Route exact path="/products/edit/:id">
            <UpdatePage updatePage={() => setPage(NavigationBarPages.products)}>
              <EditProduct />
            </UpdatePage>
          </Route>
          <Route exact path="/sales">
            <UpdatePage updatePage={() => setPage(NavigationBarPages.sales)}>
              <Sales />
            </UpdatePage>
          </Route>
          <Route path="/sales/new">
            <UpdatePage updatePage={() => setPage(NavigationBarPages.sales)}>
              <NewSale />
            </UpdatePage>
          </Route>
          <Route path="*">
            <div>404 Not Found</div>
          </Route>
        </Switch>
      </main>
      <footer>
        <div style={{height: "80px"}}>
          {/* GAMBS PARA TER O TAMANHO DA NAVEGAÇÃO */}
        </div>
      </footer>
    </Router>
  )
}
