import FormRender, { FormConfig } from 'components/ui/FormRender'
import { Invoice, InvoiceCreatePayload } from 'types'

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
    type: 'text',
    placeholder: '',
    required: true,
    value: new Date().toLocaleDateString('en-GB').replaceAll('/', '-'),
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
  const handleSubmit = (data: any) => {
    onSubmit(data)
  }
  return (
    <FormRender config={formConfig} values={values} onSubmit={handleSubmit} />
  )
}

export default InvoiceForm
