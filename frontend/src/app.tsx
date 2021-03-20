import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { NavigationMenu } from '@app/ui/components/navigation-menu'
import { Home } from '@app/ui/pages/home'
import { Expenses } from '@app/ui/pages/expenses'
import { Revenues } from '@app/ui/pages/revenues'
import { InternacionalizationProvider } from '@app/ui/internacionalizations/internacionalization-provider'
import { DomainEventsProvider } from '@app/ui/events/domain-events-provider'
import { useDomainEvents } from '@app/ui/events/use-domain-events'
import { GetTransactionsSummaryCommand } from '@app/domain/transactions/summary/get-transactions-summary-command'

export const App: React.FC = (): JSX.Element => {
  const domainEvents = useDomainEvents()
  // TODO: remove instantiation from here
  const getTransactionsSummaryCommand = new GetTransactionsSummaryCommand(
    domainEvents
  )

  return (
    <BrowserRouter>
      <InternacionalizationProvider>
        <DomainEventsProvider>
          <NavigationMenu />
          <main>
            <Switch>
              <Route exact path="/">
                <Home command={getTransactionsSummaryCommand} />
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
        </DomainEventsProvider>
      </InternacionalizationProvider>
    </BrowserRouter>
  )
}
