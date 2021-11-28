import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

import { routes, getRoutePath } from 'routes'

import LanguageSwitcher from 'components/ui/LanguageSwitcher'
import { ReactElement } from 'react'

function App() {
  return (
    <div className="px-5">
      <LanguageSwitcher />
      <Router>
        <Routes>
          {routes.map(({ path, component: Component, redirect }) => (
            <Route
              key={path}
              path={path}
              element={
                !!redirect ? (
                  <Navigate to={getRoutePath(redirect)} />
                ) : (
                  ((!!Component && <Component />) as ReactElement)
                )
              }
            ></Route>
          ))}
        </Routes>
      </Router>
    </div>
  )
}

export default App
