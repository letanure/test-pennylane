import { useApi } from 'api'
import { Invoice } from 'types'
import { useEffect, useCallback, useState, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'
import { Button, Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'

import { useTranslation } from 'react-i18next'

import { getRoutePath } from 'routes'
import InvoiceListFilters, {
  Filters,
} from 'components/Invoice/InvoiceListFilters'
import Confirm from 'components/ui/Confirm'
import Pagination from 'components/ui/Pagination'
import styles from './style.module.css'
import InvoiceConfigColumns from 'components/Invoice/InvoiceConfigColumns'

type ColumnConfig = {
  nameKey: string
  visible: boolean
  labelSuffix?: string
  value: (invoice: Invoice) => string | number | null | ReactNode
  alwaysVisible?: boolean
}
type ColumnsConfig = ColumnConfig[]

const InvoicesList = (): React.ReactElement => {
  let [searchParams, setSearchParams] = useSearchParams()

  const urlParams = [...searchParams]
    .map((item) => ({
      field: item[0],
      operator: 'eq',
      value: item[1],
    }))
    .filter((item) => item.value !== '') as Filters

  const { t } = useTranslation()
  const api = useApi()
  const [invoicesListFilters, setInvoicesListFilters] =
    useState<Filters>(urlParams)
  const [invoicesList, setInvoicesList] = useState<Invoice[]>([])
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get('page') || 1)
  )
  const [pagination, setPagination] = useState<any>()

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
      labelSuffix: '€',
      visible: true,
      value: (invoice: Invoice) =>
        t('format.intlNumber', { val: invoice.total }),
    },
    {
      nameKey: 'tax',
      labelSuffix: '€',
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
      value: (invoice: Invoice) =>
        t('format.intlDateTime', {
          val: new Date(invoice.date as string),
        }),
    },
    {
      nameKey: 'deadline',
      visible: true,
      value: (invoice: Invoice) =>
        t('format.intlDateTime', {
          val: new Date(invoice.deadline as string),
        }),
    },
    {
      nameKey: 'actions',
      visible: true,
      alwaysVisible: true,
      value: (invoice: Invoice) => (
        <>
          {invoice.finalized && (
            <>
              <OverlayTrigger
                overlay={
                  <Tooltip>{t('msg.invoice.finalizedNotEdited')}</Tooltip>
                }
              >
                <span>
                  <Button variant="outline-primary" size="sm" disabled={true}>
                    {t('general.edit')}
                  </Button>
                </span>
              </OverlayTrigger>
              <OverlayTrigger
                overlay={
                  <Tooltip>{t('msg.invoice.finalizedNotDeletable')}</Tooltip>
                }
              >
                <span>
                  <Button variant="outline-danger" size="sm" disabled={true}>
                    {t('general.delete')}
                  </Button>
                </span>
              </OverlayTrigger>
            </>
          )}

          {!invoice.finalized && (
            <>
              <Link to={getRoutePath('InvoiceUpdate', { id: invoice.id })}>
                <Button variant="outline-primary" size="sm">
                  {t('general.edit')}
                </Button>
              </Link>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => handleDeleteClick(invoice)}
              >
                {t('general.delete')}
              </Button>
            </>
          )}
        </>
      ),
    },
  ]
  const [visibleColumns, setVisibleColumns] = useState<string[]>([])

  const fetchInvoices = useCallback(async () => {
    const { data } = await api.getInvoices({
      page: currentPage,
      filter: JSON.stringify(invoicesListFilters),
    })
    await setPagination(data.pagination)
    await setInvoicesList(data.invoices)
    if (data.pagination.page > data.pagination.total_pages) {
      setCurrentPage(data.pagination.total_pages)
    }
    const updateSearchParams = () => {
      const queryValues = invoicesListFilters.reduce(
        (sum, item) => ({ ...sum, [item.field]: item.value }),
        {}
      )
      setSearchParams({ ...queryValues, page: currentPage } as any)
    }
    updateSearchParams()
  }, [api, currentPage, invoicesListFilters, setSearchParams])

  useEffect(() => {
    fetchInvoices()
  }, [fetchInvoices])

  const handleFilterChange = (data: Filters) => {
    setInvoicesListFilters(data)
  }

  const dialogEmpty = {
    show: false,
    message: '',
    title: '',
    textConfirm: t('invoice.deleteConfirm.confirm'),
    textCancel: t('invoice.deleteConfirm.cancel'),
    onConfirm: () => {},
  }
  const [configDeleteModal, setConfigDeleteModal] = useState(dialogEmpty)

  const confirmDialogClose = () => {
    setConfigDeleteModal(dialogEmpty)
  }

  const handleDeleteClick = async (invoice: Invoice) => {
    setConfigDeleteModal({
      ...configDeleteModal,
      show: true,
      title: t('invoice.deleteConfirm.title'),
      message: t('invoice.deleteConfirm.message', {
        id: invoice.id,
        customer: `${invoice.customer?.first_name} ${invoice.customer?.last_name}`,
      }),
      onConfirm: () => deleteInvoice(invoice.id),
    })
  }

  const deleteInvoice = async (id: number) => {
    await api.deleteInvoice(id)
    confirmDialogClose()
    fetchInvoices()
  }

  const handleColumnVisibilityChange = (visibleColumns: string[]) => {
    setVisibleColumns(visibleColumns)
  }

  return (
    <>
      <Confirm
        show={configDeleteModal.show}
        message={configDeleteModal.message}
        onHide={() => confirmDialogClose()}
        onConfirm={configDeleteModal.onConfirm}
        title={configDeleteModal.title}
        textConfirm={configDeleteModal.textConfirm}
        textCancel={configDeleteModal.textCancel}
      />
      <Row className={styles.rowFilters}>
        <Col xs={10}>
          <InvoiceListFilters
            data={invoicesListFilters}
            onSubmit={handleFilterChange}
          />
        </Col>
        <Col xs={2} className={styles.configColumns}>
          <InvoiceConfigColumns
            columns={columns}
            onChange={handleColumnVisibilityChange}
          />
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                {columns
                  .filter((column) => visibleColumns.includes(column.nameKey))
                  .map((column) => (
                    <th key={column.nameKey}>
                      {t(`invoice.propLabel.${column.nameKey}`)}
                      {column?.labelSuffix && (
                        <span className={styles.headSuffix}>
                          {' '}
                          ({column.labelSuffix})
                        </span>
                      )}
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
        </Col>
      </Row>

      <Row>
        <Col xs={6}>
          {pagination && pagination.total_pages > 1 && (
            <Pagination
              page={currentPage}
              total={pagination.total_pages as number}
              onPageChange={setCurrentPage}
            />
          )}
        </Col>
        <Col xs={6}>
          <Link
            to={getRoutePath('InvoiceCreate')}
            className={styles.btnAddInvoice}
          >
            <Button>{t('invoice.create')}</Button>
          </Link>
        </Col>
      </Row>
    </>
  )
}

export default InvoicesList
