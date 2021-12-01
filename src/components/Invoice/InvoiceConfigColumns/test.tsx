import React from 'react'
import {
  act,
  getByRole,
  render,
  RenderResult,
  screen,
} from '@testing-library/react'
import user from '@testing-library/user-event'
import InvoiceConfigColumns, {
  ColumnConfig,
  InvoiceConfigColumnsProps,
} from './index'

const columnConfig: ColumnConfig[] = [
  {
    nameKey: 'AA',
    visible: true,
    alwaysVisible: true,
  },
  {
    nameKey: 'BB',
    visible: true,
  },
  {
    nameKey: 'CC',
    visible: true,
  },
]

const props: InvoiceConfigColumnsProps = {
  columns: columnConfig,
  onChange: jest.fn(),
}

let container: HTMLDivElement
beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  document.body.removeChild(container)
})

const buttonOpen = (elem: RenderResult) =>
  elem.getByRole('button', {
    name: /table\.visiblecolumns/i,
  })

describe('<InvoiceConfigColumns />', () => {
  it('should render the collapsed dropdor', () => {
    const elem = render(<InvoiceConfigColumns {...props} />)
    const button = buttonOpen(elem)
    expect(button).toHaveAttribute('aria-expanded', 'false')
  })

  it('should not show alwaysVisible items as options', async () => {
    const promise = Promise.resolve()
    const elem = render(<InvoiceConfigColumns {...props} />)
    const button = buttonOpen(elem)
    act(() => {
      user.click(button)
    })

    expect(elem.queryByText('invoice.propLabel.AA')).toBeNull()
    await act(() => promise)
  })

  it('should show a option for each visible item', async () => {
    const promise = Promise.resolve()
    const elem = render(<InvoiceConfigColumns {...props} />)
    const button = buttonOpen(elem)

    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('aria-expanded', 'false')

    act(() => {
      user.click(button)
    })

    expect(
      screen.getByRole('button', { name: /invoice\.proplabel\.bb/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /invoice\.proplabel\.cc/i })
    ).toBeInTheDocument()

    await act(() => promise)
  })
})
