import { useApi } from 'api'
import { Invoice } from 'types'
import { useEffect, useCallback, useState, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquare, faCheckSquare } from '@fortawesome/free-solid-svg-icons'
import {
  Button,
  Col,
  Dropdown,
  OverlayTrigger,
  Row,
  Tooltip,
} from 'react-bootstrap'

import { useTranslation } from 'react-i18next'

import { getRoutePath } from 'routes'
import InvoiceListFilters, {
  Filters,
} from 'components/Invoice/InvoiceListFilters'
import Confirm from 'components/ui/Confirm'
import Pagination from 'components/ui/Pagination'
import styles from './style.module.css'

type ColumnConfig = {
  nameKey: string
  visible: boolean
  value: (invoice: Invoice) => string | number | null | ReactNode
  alwaysVisible?: boolean
}
type ColumnsConfig = ColumnConfig[]

const InvoicesList = (): React.ReactElement => {
  const { t } = useTranslation()
  const api = useApi()
  const [invoicesListFilters, setInvoicesListFilters] = useState<Filters>([])
  const [invoicesList, setInvoicesList] = useState<Invoice[]>([])
  const [currentPage, setCurrentPage] = useState(1)
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
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    columns.filter((column) => column.visible).map((column) => column.nameKey)
  )

  const fetchInvoices = useCallback(async () => {
    const { data } = await api.getInvoices({
      page: currentPage,
      filter: JSON.stringify(invoicesListFilters),
    })
    setPagination(data.pagination)
    setInvoicesList(data.invoices)
  }, [api, currentPage, invoicesListFilters])

  useEffect(() => {
    fetchInvoices()
  }, [fetchInvoices])

  const handleColumnVisibilityChange = (nameKey: string) => {
    const columnIsVisible = visibleColumns.includes(nameKey)
    columnIsVisible
      ? setVisibleColumns(visibleColumns.filter((column) => column !== nameKey))
      : setVisibleColumns([...visibleColumns, nameKey])
  }

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
        <Col xs={2}>
          <Dropdown autoClose="outside" className={styles.dropdownColumns}>
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
