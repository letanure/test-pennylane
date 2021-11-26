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

  return (
    <>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Id</th>
            <th>Customer</th>
            <th>Address</th>
            <th>Total</th>
            <th>Tax</th>
            <th>Finalized</th>
            <th>Paid</th>
            <th>Date</th>
            <th>Deadline</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {invoicesList.map((invoice) => (
            <tr key={invoice.id}>
              <td>{invoice.id}</td>
              <td>
                {invoice.customer?.first_name} {invoice.customer?.last_name}
              </td>
              <td>
                {invoice.customer?.address}, {invoice.customer?.zip_code}{' '}
                {invoice.customer?.city}
              </td>
              <td>{invoice.total}</td>
              <td>{invoice.tax}</td>
              <td>{invoice.finalized ? 'Yes' : 'No'}</td>
              <td>{invoice.paid ? 'Yes' : 'No'}</td>
              <td>{invoice.date}</td>
              <td>{invoice.deadline}</td>
              <td>
                <Link to={getRoutePath('InvoiceUpdate', { id: invoice.id })}>
                  Edit
                </Link>
              </td>
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
