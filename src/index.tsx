import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'

import { ApiProvider } from './api'
import env from './constants/env'

ReactDOM.render(
  <React.StrictMode>
    <ApiProvider url={env.API_URL} token={env.API_TOKEN}>
      <App />
    </ApiProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
