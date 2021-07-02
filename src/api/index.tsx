import * as React from 'react'
import OpenAPIClientAxios from 'openapi-client-axios'
import { Client } from './gen/client'
import definition from './gen/schema.json'

interface ApiContextState {
  client: Client | undefined
}

const ApiContext = React.createContext<ApiContextState>({
  client: undefined,
})

const api = new OpenAPIClientAxios({
  /* @ts-ignore */
  definition,
})

export const ApiProvider: React.FC = ({ children }) => {
  const client = api.initSync<Client>()

  return (
    <ApiContext.Provider value={{ client }}>{children}</ApiContext.Provider>
  )
}

export const useApi = () => {
  const { client } = React.useContext(ApiContext)

  if (!client) {
    throw new Error('A client API must be defined')
  }

  return client
}
