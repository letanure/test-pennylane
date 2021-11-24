import FormRender, { FormConfig, ReturnValues } from 'components/ui/FormRender'
import { Invoice } from 'types'

const formConfig: FormConfig = [
  {
    name: 'id',
    label: 'ID',
    type: 'number',
    placeholder: '',
    required: true,
    value: '',
    readOnly: true,
  },
  {
    name: 'customer_id',
    label: 'customer ID',
    type: 'number',
    placeholder: '',
    required: true,
    value: '',
    readOnly: true,
  },
  {
    name: 'finalized',
    label: 'Finalized?',
    type: 'select',
    placeholder: '',
    required: true,
    value: '',
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
    value: '',
    options: [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
    ],
    valueType: 'boolean',
  },
  {
    name: 'date',
    label: 'Date',
    type: 'text',
    placeholder: '',
    required: true,
    value: '',
  },
  {
    name: 'deadline',
    label: 'Deadline',
    type: 'text',
    placeholder: '',
    required: true,
    value: '',
  },
  {
    name: 'total',
    label: 'Total',
    type: 'number',
    placeholder: '',
    required: true,
    value: '',
  },
  {
    name: 'tax',
    label: 'Tax',
    type: 'number',
    placeholder: '',
    required: true,
    value: '',
  },
]

export type InvoiceFormProps = {
  data: Invoice
  onSubmit: (data: ReturnValues) => void
}

const InvoiceForm = ({ data, onSubmit }: InvoiceFormProps) => {
  const handleSubmit = (data: ReturnValues) => {
    onSubmit(data)
  }
  return (
    <FormRender config={formConfig} values={data} onSubmit={handleSubmit} />
  )
}

export default InvoiceForm
