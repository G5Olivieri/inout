import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { NavigationMenu } from '@app/components/navigation-menu';
import { Home } from '@app/pages/home';
import { Expenses } from '@app/pages/expenses';
import { Revenues } from '@app/pages/revenues';
import {
  InternacionalizationProvider
} from '@app/internacionalizations/internacionalization-provider';

export const App: React.FC = (): JSX.Element => (
  <BrowserRouter>
    <InternacionalizationProvider>
      <NavigationMenu />
      <main>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/expenses">
            <Expenses />
          </Route>
          <Route exact path="/revenues">
            <Revenues />
          </Route>
          <Route path="*">
            <h1>Oxe!</h1>
          </Route>
        </Switch>
      </main>
    </InternacionalizationProvider>
  </BrowserRouter>
)
