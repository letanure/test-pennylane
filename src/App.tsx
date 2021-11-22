import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { routes } from './routes'

function App() {
  return (
    <div className="px-5">
      <Router>
        <Switch>
          {routes.map(({ path, component: Component }) => (
            <Route key={path} path={path}>
              <Component />
            </Route>
          ))}
        </Switch>
      </Router>
    </div>
  )
}

export default App
