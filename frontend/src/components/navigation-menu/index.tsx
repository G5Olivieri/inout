import React from "react"
import { Link } from "react-router-dom"

export const NavigationMenu: React.FC = (): JSX.Element => (
  <nav>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/expenses">Despesas</Link></li>
      <li><Link to="/revenues">Receitas</Link></li>
    </ul>
  </nav>
)
