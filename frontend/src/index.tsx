import React from 'react';
import ReactDOM from 'react-dom';
import ptBR from 'date-fns/locale/pt-BR';
import { registerLocale, setDefaultLocale } from 'react-datepicker'
import App from './App';

import "./global.scss"

registerLocale('pt-BR', ptBR)
setDefaultLocale('pt-BR')

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
