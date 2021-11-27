import FormRender, { FormConfig, ReturnValues } from 'components/ui/FormRender'
import { useTranslation } from 'react-i18next'
import { resourceLimits } from 'worker_threads'

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
  ]

  const handleSubmit = (data: ReturnValues) => {
    const result: Filters = []
    if (data.customer) {
      result.push({
        field: 'customer_id',
        operator: 'eq',
        value: data.customer.id,
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
