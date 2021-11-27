import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'

import { ApiProvider } from './api'
import env from './constants/env'
import 'i18n'

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback="Loading">
      <ApiProvider url={env.API_URL} token={env.API_TOKEN}>
        <App />
      </ApiProvider>
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
)
