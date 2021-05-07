import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import CreateProduct from './create';

const Products: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/products'> <ul><li><Link to='/products/create'>Criar</Link></li></ul></Route>
        <Route exact path='/products/create'><CreateProduct /></Route>
      </Switch>
    </Router>
  );
};
export default Products;
