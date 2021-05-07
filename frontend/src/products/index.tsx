import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import CreateProduct from './create';

const Products: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/products'>Listar</Route>
        <Route exact path='/products/create'><CreateProduct /></Route>
      </Switch>
    </Router>
  );
};
export default Products;
