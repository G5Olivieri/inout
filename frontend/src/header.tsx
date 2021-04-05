import React from 'react'
import { Link } from 'react-router-dom'

const Navigation: React.FC = (): JSX.Element => (
  <nav>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/estoque">Estoque</Link>
      </li>
      <li>
        <Link to="/products">Produtos</Link>
      </li>
    </ul>
  </nav>
)

export const Header: React.FC = (): JSX.Element => (
  <header>
    <Navigation />
  </header>
)
