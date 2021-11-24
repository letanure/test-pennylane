import React from 'react'
import InvoicesList from 'components/Invoice/InvoicesList'
import InvoiceShow from 'components/Invoice/InvoiceShow'

type Route = {
  name: string
  path: string
  component: React.ComponentType<any>
}

type Routes = Route[]

const routes: Routes = [
  {
    name: 'invoiceItem',
    path: '/invoice/:id',
    component: InvoiceShow,
  },
  {
    name: 'invoiceList',
    path: '/',
    component: InvoicesList,
  },
]
type getParams = {
  [index: string]: string | number | boolean
}

function getRoutePath(name: string, params: getParams = {}): string {
  const route = routes.find((route) => route.name === name)
  if (route && params) {
    const routeCopy = { ...route }
    Object.keys(params).forEach((key) => {
      routeCopy.path = route.path.replace(`:${key}`, String(params[key]))
    })
    return routeCopy.path
  }
  return route?.path || ''
}

export { routes, getRoutePath }