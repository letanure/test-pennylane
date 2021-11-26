import { useApi } from 'api'
import { Invoice } from 'types'
import { useEffect, useCallback, useState, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquare, faCheckSquare } from '@fortawesome/free-solid-svg-icons'
import { Button, Dropdown } from 'react-bootstrap'

import { getRoutePath } from 'routes'
import { Pagination } from 'react-bootstrap'

type ColumnConfig = {
  header: string
  visible: boolean
  value: (invoice: Invoice) => string | number | null | ReactNode
  alwaysVisible?: boolean
}
type ColumnsConfig = ColumnConfig[]

const InvoicesList = (): React.ReactElement => {
  const columns: ColumnsConfig = [
    {
      header: 'Id',
      visible: true,
      value: (invoice: Invoice) => invoice.id,
    },
    {
      header: 'Customer',
      visible: true,
      value: (invoice: Invoice) =>
        `${invoice.customer?.first_name} ${invoice.customer?.last_name}`,
    },
    {
      header: 'Address',
      visible: false,
      value: (invoice: Invoice) =>
        `${invoice.customer?.address}, ${invoice.customer?.zip_code}, ${invoice.customer?.city}`,
    },
    {
      header: 'Total',
      visible: true,
      value: (invoice: Invoice) => invoice.total,
    },
    {
      header: 'Tax',
      visible: true,
      value: (invoice: Invoice) => invoice.tax,
    },
    {
      header: 'Finalized',
      visible: true,
      value: (invoice: Invoice) => (invoice.finalized ? 'Yes' : 'No'),
    },
    {
      header: 'Paid',
      visible: true,
      value: (invoice: Invoice) => (invoice.paid ? 'Yes' : 'No'),
    },
    {
      header: 'Date',
      visible: true,
      value: (invoice: Invoice) => invoice.date,
    },
    {
      header: 'Deadline',
      visible: true,
      value: (invoice: Invoice) => invoice.deadline,
    },
    {
      header: 'Actions',
      visible: true,
      alwaysVisible: true,
      value: (invoice: Invoice) => (
        <>
          <Link to={getRoutePath('InvoiceUpdate', { id: invoice.id })}>
            <Button variant="outline-primary" size="sm">
              Edit
            </Button>
          </Link>
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => handleDeleteClick(invoice.id)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ]

  const api = useApi()

  const [invoicesList, setInvoicesList] = useState<Invoice[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pagination, setPagination] = useState<any>()
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    columns.filter((column) => column.visible).map((column) => column.header)
  )

  const fetchInvoices = useCallback(async () => {
    const { data } = await api.getInvoices({
      page: currentPage,
    })
    setPagination(data.pagination)
    setInvoicesList(data.invoices)
  }, [api, currentPage])

  useEffect(() => {
    fetchInvoices()
  }, [fetchInvoices])

  const handleDeleteClick = async (id: number) => {
    await api.deleteInvoice(id)
    fetchInvoices()
  }

  const handleColumnVisibilityChange = (header: string) => {
    const columnIsVisible = visibleColumns.includes(header)
    columnIsVisible
      ? setVisibleColumns(visibleColumns.filter((column) => column !== header))
      : setVisibleColumns([...visibleColumns, header])
  }

  return (
    <>
      <Dropdown autoClose="outside">
        <Dropdown.Toggle variant="secondary">Visible columns</Dropdown.Toggle>
        <Dropdown.Menu>
          {columns
            .filter((column) => !column.alwaysVisible)
            .map((column) => (
              <Dropdown.Item
                key={column.header}
                onClick={() => {
                  handleColumnVisibilityChange(column.header)
                }}
              >
                <FontAwesomeIcon
                  icon={
                    visibleColumns.includes(column.header)
                      ? faCheckSquare
                      : faSquare
                  }
                />{' '}
                {column.header}
              </Dropdown.Item>
            ))}
        </Dropdown.Menu>
      </Dropdown>

      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            {columns
              .filter((column) => visibleColumns.includes(column.header))
              .map((column) => (
                <th key={column.header}>{column.header}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {invoicesList.map((invoice) => (
            <tr key={invoice.id}>
              {columns
                .filter((column) => visibleColumns.includes(column.header))
                .map((column, index) => (
                  <td key={invoice.id + index}>{column.value(invoice)}</td>
                ))}
            </tr>
          ))}
        </tbody>
      </table>

      {pagination && (
        <Pagination>
          {[...Array(pagination.total_pages)].map((el, ind) => (
            <Pagination.Item
              key={ind}
              active={pagination.page === ind + 1}
              onClick={() => setCurrentPage(ind + 1)}
            >
              {ind + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      )}

      <Link to={getRoutePath('InvoiceCreate')}>
        <Button>Create new invoice</Button>
      </Link>
    </>
  )
}

export default InvoicesList
