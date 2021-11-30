import FormRender, { FormConfig } from 'components/ui/FormRender'
import { Invoice, InvoiceCreatePayload } from 'types'
import { useTranslation } from 'react-i18next'
import InvoiceLineForm from 'components/Invoice/InvoiceLineForm'

export type InvoiceFormProps = {
  values: Invoice | null
  onSubmit: (data: InvoiceCreatePayload) => void
  title: string
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({
  values,
  onSubmit,
  title,
}: InvoiceFormProps) => {
  const { t } = useTranslation()
  const formConfig: FormConfig = [
    {
      name: 'customer_id',
      label: t('invoice.propLabel.customer'),
      type: 'CustomerAutocomplete',
      placeholder: '',
      required: true,
      value: '',
      valueType: 'number',
    },
    {
      name: 'finalized',
      label: t('invoice.propLabel.finalized'),
      type: 'select',
      placeholder: '',
      required: true,
      value: false,
      options: [
        { label: t('general.yes'), value: true },
        { label: t('general.no'), value: false },
      ],
      valueType: 'boolean',
    },
    {
      name: 'paid',
      label: t('invoice.propLabel.paid'),
      type: 'select',
      placeholder: '',
      required: true,
      value: false,
      options: [
        { label: t('general.yes'), value: true },
        { label: t('general.no'), value: false },
      ],
      valueType: 'boolean',
    },
    {
      name: 'date',
      label: t('invoice.propLabel.date'),
      type: 'Datepicker',
      placeholder: '',
      required: true,
      value: '',
    },
    {
      name: 'deadline',
      label: t('invoice.propLabel.deadline'),
      type: 'Datepicker',
      placeholder: '',
      required: true,
      value: '',
    },
    {
      name: 'invoice_lines',
      label: t('invoice.propLabel.invoice_lines_attributes'),
      type: 'array',
      placeholder: '',
      required: false,
      value: [],
      SubForm: InvoiceLineForm as React.ElementType,
    },
  ]
  const handleSubmit = (data: any) => {
    onSubmit(data)
  }
  return (
    <FormRender
      config={formConfig}
      values={values}
      onSubmit={handleSubmit}
      title={title}
    />
  )
}

export default InvoiceForm
