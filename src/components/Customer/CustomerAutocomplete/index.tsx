import { useCallback } from 'react'
import { AsyncPaginate } from 'react-select-async-paginate'
import { useTranslation } from 'react-i18next'

import { Customer } from 'types'
import { useApi } from 'api'
import { ActionMeta, SingleValue } from 'react-select'

interface Props {
  value?: Customer
  onChange: (Customer: Customer) => void
}

const defaultAdditional = { page: 1 }

const getCustomerLabel = (customer: Customer) => {
  return `${customer.first_name} ${customer.last_name}`
}

const CustomerAutocomplete = ({ value, onChange }: Props) => {
  const { t } = useTranslation()
  const api = useApi()

  const loadOptions = useCallback(
    async (search, loadedOptions, { page }) => {
      const { data } = await api.getSearchCustomers({
        query: search,
        per_page: 10,
        page,
      })

      return {
        options: data.customers,
        hasMore: data.pagination.page < data.pagination.total_pages,
        additional: {
          page: page + 1,
        },
      }
    },
    [api]
  )

  const handleChange = (
    customer: SingleValue<Customer>,
    actionMeta: ActionMeta<Customer>
  ) => {
    onChange(customer as Customer)
  }

  return (
    <AsyncPaginate
      placeholder={t('customer.autocomplete.placeholder')}
      getOptionLabel={getCustomerLabel}
      additional={defaultAdditional}
      value={value}
      onChange={handleChange}
      loadOptions={loadOptions}
      isClearable={true}
    />
  )
}

export default CustomerAutocomplete
