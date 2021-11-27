import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { routes, getRoutePath } from 'routes'

import LanguageSwitcher from 'components/ui/LanguageSwitcher'

function App() {
  return (
    <div className="px-5">
      <LanguageSwitcher />
      <Router>
        <Switch>
          {routes.map(({ path, component: Component, redirect }) => (
            <Route key={path} path={path}>
              {!!redirect ? (
                <Redirect to={getRoutePath(redirect)} />
              ) : (
                !!Component && <Component />
              )}
            </Route>
          ))}
        </Switch>
      </Router>
    </div>
  )
}

export default App
