import FormRender, { FormConfig, ReturnValues } from 'components/ui/FormRender'
import { useTranslation } from 'react-i18next'

export type Filter = {
  field: string
  operator: 'eq' | 'gt' | 'lt'
  value: string | number | boolean | null
}

export type Filters = Filter[]

export type InvoicesListFiltersProps = {
  data: Filters
  onSubmit: (data: Filters) => void
}

const InvoicesListFilters = ({
  data,
  onSubmit,
}: InvoicesListFiltersProps): React.ReactElement => {
  const { t } = useTranslation()
  const formData = {
    customer: '',
    paid: 'all',
    finalized: 'all',
  }

  const formConfig: FormConfig = [
    {
      name: 'customer',
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

  const handleSubmit = (data: ReturnValues) => {
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
    if (data.customer) {
      result.push({
        field: 'customer_id',
        operator: 'eq',
        value: data.customer,
      })
    }
    onSubmit(result)
  }
  return (
    <>
      <FormRender
        layout="horizontal"
        config={formConfig}
        values={formData}
        onSubmit={handleSubmit}
      />
    </>
  )
}

export default InvoicesListFilters
