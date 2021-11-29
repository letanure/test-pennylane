import FormRender, { FormConfig } from 'components/ui/FormRender'
import { Invoice, InvoiceCreatePayload } from 'types'
import { useTranslation } from 'react-i18next'

const formConfig: FormConfig = [
  {
    name: 'customer_id',
    label: 'Customer',
    type: 'CustomerAutocomplete',
    placeholder: '',
    required: true,
    value: '',
    valueType: 'number',
  },
  {
    name: 'finalized',
    label: 'Finalized?',
    type: 'select',
    placeholder: '',
    required: true,
    value: false,
    options: [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
    ],
    valueType: 'boolean',
  },
  {
    name: 'paid',
    label: 'Paid?',
    type: 'select',
    placeholder: '',
    required: true,
    value: false,
    options: [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
    ],
    valueType: 'boolean',
  },
  {
    name: 'date',
    label: 'Date',
    type: 'Datepicker',
    placeholder: '',
    required: true,
    value: '',
  },
  {
    name: 'deadline',
    label: 'Deadline',
    type: 'Datepicker',
    placeholder: '',
    required: true,
    value: '',
  },
  {
    name: 'invoice_lines_attributes',
    label: 'Products',
    type: 'number',
    placeholder: '',
    required: false,
    value: [],
  },
]

export type InvoiceFormProps = {
  values: Invoice | null
  onSubmit: (data: InvoiceCreatePayload) => void
}

const InvoiceForm = ({ values, onSubmit }: InvoiceFormProps) => {
  const { t } = useTranslation()
  const handleSubmit = (data: any) => {
    onSubmit(data)
  }
  return (
    <FormRender
      config={formConfig}
      values={values}
      onSubmit={handleSubmit}
      title={t('invoice.form.create.title')}
    />
  )
}

export default InvoiceForm
