import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import InvoicesList from './components/Invoice/InvoicesList'
import InvoiceShow from './components/Invoice/InvoiceShow'

function App() {
  return (
    <div className="px-5">
      <Router>
        <Switch>
          <Route path="/invoice/:id" component={InvoiceShow} />
          <Route path="/" component={InvoicesList} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
