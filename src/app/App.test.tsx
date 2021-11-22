import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('<App />', () => {
  it('dont run without API defined', () => {
    expect(() => render(<App />)).toThrow('A client API must be defined')
  })
})
