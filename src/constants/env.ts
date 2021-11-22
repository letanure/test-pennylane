const envReactPrefix = 'REACT_APP_'
const evnVariables: string[] = ['API_TOKEN', 'API_URL']

type Env = {
  API_TOKEN: string
  API_URL: string
}

const env = evnVariables.reduce((acc, curr) => {
  const key = envReactPrefix + curr
  if (!process.env[key]) {
    throw new Error(`Environment variable ${key} is not set`)
  }
  return {
    ...acc,
    [curr]: process.env[key],
  }
}, {} as Env)

export default env
