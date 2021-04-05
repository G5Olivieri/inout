import React from 'react'
import { Container } from 'react-bootstrap'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Home } from '@app/home'
import { Header } from '@app/header'
import { Footer } from '@app/footer'
import { Products } from '@app/products'
import { Estoque } from '@app/estoque'

export const App: React.FC = (): JSX.Element => (
  <BrowserRouter>
    <Header />
    <Container>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/products">
          <Products />
        </Route>
        <Route path="/estoque">
          <Estoque />
        </Route>
        <Route path="*">
          <h1>Pagina nao encontrada!</h1>
        </Route>
      </Switch>
    </Container>
    <Footer />
  </BrowserRouter>
)
