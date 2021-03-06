import React from 'react'
import InvoicesList from 'components/Invoice/InvoicesList'
import InvoiceUpdate from 'components/Invoice/InvoiceUpdate'
import InvoiceCreate from 'components/Invoice/InvoiceCreate'
import Page404 from 'pages/404'

type Route = {
  name: string
  path: string
  component?: React.ComponentType<any>
  redirect?: string
}

type Routes = Route[]

const routes: Routes = [
  {
    name: 'InvoiceUpdate',
    path: '/invoice/update/:id',
    component: InvoiceUpdate,
  },
  {
    name: 'InvoiceCreate',
    path: '/invoice/create',
    component: InvoiceCreate,
  },
  {
    name: 'InvoiceList',
    path: '/invoice/list',
    component: InvoicesList,
  },
  {
    name: 'home',
    path: '/',
    redirect: 'InvoiceList',
  },
  {
    name: '404',
    path: '*',
    component: Page404,
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
