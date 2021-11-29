import FormRender, { FormConfig, ReturnValues } from 'components/ui/FormRender'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'

export type Filter = {
  field: string
  operator: 'eq' | 'gt' | 'lt'
  value: string | number | boolean | null
}

export type Filters = Filter[]

export type InvoicesListFiltersProps = {
  data: Filters
  onSubmit: (data: any) => void
}

type InvoiceFiltersOptions = {
  customer_id?: string
  paid?: string
  finalized?: string
}

const InvoicesListFilters = ({
  data,
  onSubmit,
}: InvoicesListFiltersProps): React.ReactElement => {
  const { t } = useTranslation()
  let [searchParams, setSearchParams] = useSearchParams()

  const formData: InvoiceFiltersOptions = {
    customer_id: searchParams.get('customer_id') || '',
    paid: searchParams.get('paid') || 'all',
    finalized: searchParams.get('finalized') || 'all',
  }

  const formConfig: FormConfig = [
    {
      name: 'customer_id',
      label: t('invoice.propLabel.customer'),
      type: 'CustomerAutocomplete',
      placeholder: '',
      required: false,
      value: '',
    },
    {
      name: 'paid',
      label: t('invoice.propLabel.paid'),
      type: 'select',
      placeholder: '',
      required: true,
      value: '',
      options: [
        { label: t('general.all'), value: 'all' },
        { label: t('general.yes'), value: 'yes' },
        { label: t('general.no'), value: 'no' },
      ],
    },
    {
      name: 'finalized',
      label: t('invoice.propLabel.finalized'),
      type: 'select',
      placeholder: '',
      required: true,
      value: '',
      options: [
        { label: t('general.all'), value: 'all' },
        { label: t('general.yes'), value: 'yes' },
        { label: t('general.no'), value: 'no' },
      ],
    },
  ]

  const updateSearchParams = (data: ReturnValues) => {
    const resultQuery = Object.keys(data).reduce((acc, key) => {
      if (!['all', '', null].includes(data[key])) {
        acc[key] = data[key]
      }
      return acc
    }, {} as ReturnValues)
    if (resultQuery.customer_id) {
      resultQuery.customer_id = resultQuery.customer_id.id
    }
    setSearchParams(resultQuery)
  }

  const handleSubmit = (data: ReturnValues) => {
    updateSearchParams(data)

    const result: Filters = []
    if (data?.finalized && data?.finalized !== 'all') {
      result.push({
        field: 'finalized',
        operator: 'eq',
        value: data.finalized === 'yes',
      })
    }
    if (data?.paid && data?.paid !== 'all') {
      result.push({
        field: 'paid',
        operator: 'eq',
        value: data.paid === 'yes',
      })
    }
    if (data.customer_id) {
      result.push({
        field: 'customer_id',
        operator: 'eq',
        value: data.customer_id.id,
      })
    }
    console.log(result)
    onSubmit(result)
  }
  return (
    <>
      <FormRender<InvoiceFiltersOptions>
        layout="horizontal"
        config={formConfig}
        values={formData}
        onSubmit={handleSubmit}
      />
    </>
  )
}

export default InvoicesListFilters
