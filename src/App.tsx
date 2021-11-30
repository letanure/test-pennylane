import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

import { routes, getRoutePath } from 'routes'

import Header from 'components/ui/Header'
import { ReactElement } from 'react'
import { Col, Container, Row } from 'react-bootstrap'

function App() {
  return (
    <Router>
      <Header />
      <Container>
        <Row>
          <Col>
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
          </Col>
        </Row>
      </Container>
    </Router>
  )
}

export default App
