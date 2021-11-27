import { useApi } from 'api'
import { Invoice } from 'types'
import { useEffect, useCallback, useState, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquare, faCheckSquare } from '@fortawesome/free-solid-svg-icons'
import { Button, Dropdown } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import { getRoutePath } from 'routes'
import { Pagination } from 'react-bootstrap'

type ColumnConfig = {
  nameKey: string
  visible: boolean
  value: (invoice: Invoice) => string | number | null | ReactNode
  alwaysVisible?: boolean
}
type ColumnsConfig = ColumnConfig[]

const InvoicesList = (): React.ReactElement => {
  const { t } = useTranslation()
  const columns: ColumnsConfig = [
    {
      nameKey: 'id',
      visible: true,
      value: (invoice: Invoice) => invoice.id,
    },
    {
      nameKey: 'customer',
      visible: true,
      value: (invoice: Invoice) =>
        `${invoice.customer?.first_name} ${invoice.customer?.last_name}`,
    },
    {
      nameKey: 'address',
      visible: false,
      value: (invoice: Invoice) =>
        `${invoice.customer?.address}, ${invoice.customer?.zip_code}, ${invoice.customer?.city}`,
    },
    {
      nameKey: 'total',
      visible: true,
      value: (invoice: Invoice) =>
        t('format.intlNumber', { val: invoice.total }),
    },
    {
      nameKey: 'tax',
      visible: true,
      value: (invoice: Invoice) => t('format.intlNumber', { val: invoice.tax }),
    },
    {
      nameKey: 'finalized',
      visible: true,
      value: (invoice: Invoice) =>
        invoice.finalized ? t('general.yes') : t('general.no'),
    },
    {
      nameKey: 'paid',
      visible: true,
      value: (invoice: Invoice) =>
        invoice.paid ? t('general.yes') : t('general.no'),
    },
    {
      nameKey: 'date',
      visible: true,
      value: (invoice: Invoice) => invoice.date,
    },
    {
      nameKey: 'deadline',
      visible: true,
      value: (invoice: Invoice) => invoice.deadline,
    },
    {
      nameKey: 'actions',
      visible: true,
      alwaysVisible: true,
      value: (invoice: Invoice) => (
        <>
          <Link to={getRoutePath('InvoiceUpdate', { id: invoice.id })}>
            <Button variant="outline-primary" size="sm">
              {t('general.edit')}
            </Button>
          </Link>
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => handleDeleteClick(invoice.id)}
          >
            {t('general.delete')}
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
    columns.filter((column) => column.visible).map((column) => column.nameKey)
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

  const handleColumnVisibilityChange = (nameKey: string) => {
    const columnIsVisible = visibleColumns.includes(nameKey)
    columnIsVisible
      ? setVisibleColumns(visibleColumns.filter((column) => column !== nameKey))
      : setVisibleColumns([...visibleColumns, nameKey])
  }

  return (
    <>
      <Dropdown autoClose="outside">
        <Dropdown.Toggle variant="secondary">
          {t('table.visibleColumns')}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {columns
            .filter((column) => !column.alwaysVisible)
            .map((column) => (
              <Dropdown.Item
                key={column.nameKey}
                onClick={() => {
                  handleColumnVisibilityChange(column.nameKey)
                }}
              >
                <FontAwesomeIcon
                  icon={
                    visibleColumns.includes(column.nameKey)
                      ? faCheckSquare
                      : faSquare
                  }
                />{' '}
                {t(`invoice.propLabel.${column.nameKey}`)}
              </Dropdown.Item>
            ))}
        </Dropdown.Menu>
      </Dropdown>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            {columns
              .filter((column) => visibleColumns.includes(column.nameKey))
              .map((column) => (
                <th key={column.nameKey}>
                  {t(`invoice.propLabel.${column.nameKey}`)}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {invoicesList.map((invoice) => (
            <tr key={invoice.id}>
              {columns
                .filter((column) => visibleColumns.includes(column.nameKey))
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
        <Button>{t('invoice.create')}</Button>
      </Link>
    </>
  )
}

export default InvoicesList
