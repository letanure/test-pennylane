import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Dropdown } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquare, faCheckSquare } from '@fortawesome/free-solid-svg-icons'

type ColumnConfig = {
  nameKey: string
  visible: boolean
  alwaysVisible?: boolean
}

export type InvoiceConfigColumnsProps = {
  columns: ColumnConfig[]
  onChange: (columns: string[]) => void
}

const InvoiceConfigColumns = ({
  columns,
  onChange,
}: InvoiceConfigColumnsProps) => {
  const { t } = useTranslation()
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    columns.filter((column) => column.visible).map((column) => column.nameKey)
  )

  useEffect(() => {
    onChange(visibleColumns)
  })

  const handleColumnVisibilityChange = (nameKey: string) => {
    const columnIsVisible = visibleColumns.includes(nameKey)
    columnIsVisible
      ? setVisibleColumns(visibleColumns.filter((column) => column !== nameKey))
      : setVisibleColumns([...visibleColumns, nameKey])
    onChange(visibleColumns)
  }

  return (
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
  )
}

export default InvoiceConfigColumns
