import { useCallback } from 'react'
import { AsyncPaginate } from 'react-select-async-paginate'
import { useTranslation } from 'react-i18next'

import { Product } from 'types'
import { useApi } from 'api'
import { SingleValue, ActionMeta } from 'react-select'

interface Props {
  value?: Product
  onChange: (product: Product) => void
}

const defaultAdditional = { page: 1 }

const ProductAutocomplete = ({ value, onChange }: Props) => {
  const { t } = useTranslation()
  const api = useApi()

  const loadOptions = useCallback(
    async (search, loadedOptions, { page }) => {
      const { data } = await api.getSearchProducts({
        query: search,
        per_page: 10,
        page,
      })

      return {
        options: data.products,
        hasMore: data.pagination.page < data.pagination.total_pages,
        additional: {
          page: page + 1,
        },
      }
    },
    [api]
  )

  const handleChange = (
    product: SingleValue<Product>,
    actionMeta: ActionMeta<Product>
  ) => {
    onChange(product as Product)
  }

  return (
    <AsyncPaginate
      placeholder={t('product.autocomplete.placeholder')}
      additional={defaultAdditional}
      value={value}
      onChange={handleChange}
      loadOptions={loadOptions}
      isClearable={true}
    />
  )
}

export default ProductAutocomplete
