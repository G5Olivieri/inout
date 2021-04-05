import React from 'react'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Navigation: React.FC = (): JSX.Element => (
  <Nav>
    <Nav.Item>
      <Nav.Link to="/" as={Link}>
        Home
      </Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link to="/estoque" as={Link}>
        Estoque
      </Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link to="/products" as={Link}>
        Produtos
      </Nav.Link>
    </Nav.Item>
  </Nav>
)

export const Header: React.FC = (): JSX.Element => (
  <header>
    <Navigation />
  </header>
)
