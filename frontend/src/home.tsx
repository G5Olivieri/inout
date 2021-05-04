import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <ul>
      <li><Link to="/products">Produto</Link></li>
      <li><Link to="/sales">Venda</Link></li>
      <li><Link to="/purchases">Compra</Link></li>
    </ul>
  );
};

export default Home;
