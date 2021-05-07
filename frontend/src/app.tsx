import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Home from './home';
import Products from './products';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/products'>
          <Products />
        </Route>
        <Route exact path='/sales'>
          <div>
            <h1>Vendas</h1>
          </div>
        </Route>
        <Route exact path='/purchases'>
          <div>
            <h1>Compras</h1>
          </div>
        </Route>

      </Switch>

    </Router>
  );
}

export default App;
