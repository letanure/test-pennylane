import { useApi } from 'api'
import { Invoice } from 'types'
import { useEffect, useCallback, useState } from 'react'
import { Link } from 'react-router-dom'

import { getRoutePath } from 'routes'
import { Button } from 'react-bootstrap'
import { Pagination } from 'react-bootstrap'

const InvoicesList = (): React.ReactElement => {
  const api = useApi()

  const [invoicesList, setInvoicesList] = useState<Invoice[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pagination, setPagination] = useState<any>()

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

  const columns = [
    {
      header: 'Id',
      value: (invoice: Invoice) => invoice.id,
    },
    {
      header: 'Customer',
      value: (invoice: Invoice) =>
        `${invoice.customer?.first_name} ${invoice.customer?.last_name}`,
    },
    {
      header: 'Address',
      value: (invoice: Invoice) =>
        `${invoice.customer?.address}, ${invoice.customer?.zip_code}, ${invoice.customer?.city}`,
    },
    {
      header: 'Total',
      value: (invoice: Invoice) => invoice.total,
    },
    {
      header: 'Tax',
      value: (invoice: Invoice) => invoice.tax,
    },
    {
      header: 'Finalized',
      value: (invoice: Invoice) => (invoice.finalized ? 'Yes' : 'No'),
    },
    {
      header: 'Paid',
      value: (invoice: Invoice) => (invoice.paid ? 'Yes' : 'No'),
    },
    {
      header: 'Date',
      value: (invoice: Invoice) => invoice.date,
    },
    {
      header: 'Deadline',
      value: (invoice: Invoice) => invoice.deadline,
    },
    {
      header: 'Actions',
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

  return (
    <>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.header}>{column.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {invoicesList.map((invoice) => (
            <tr key={invoice.id}>
              {columns.map((column, index) => (
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
