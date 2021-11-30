import FormRender, { FormConfig, ReturnValues } from 'components/ui/FormRender'
import { Invoice } from 'types'
import { useTranslation } from 'react-i18next'
import './styles.module.css'

export type ProductFormProps = {
  data: Invoice['invoice_lines'][number] | null
  onSubmit: (data: any) => void
}

const InvoiceLineForm = ({ data, onSubmit }: ProductFormProps) => {
  const { t } = useTranslation()
  const formConfig: FormConfig = [
    {
      name: 'product_id',
      label: t('invoice.propLabel.product_id'),
      type: 'ProductAutocomplete',
      placeholder: '',
      required: true,
      value: '',
    },
    {
      name: 'quantity',
      label: t('invoice.propLabel.quantity'),
      type: 'number',
      placeholder: '',
      required: true,
      value: '',
    },
    {
      name: 'label',
      label: t('invoice.propLabel.label'),
      type: 'text',
      placeholder: '',
      required: true,
      value: '',
    },
    {
      name: 'unit',
      label: t('invoice.propLabel.unit'),
      type: 'select',
      placeholder: '',
      required: true,
      value: '',
      options: [
        { label: 'Hour', value: 'hour' },
        { label: 'Day', value: 'day' },
        { label: 'Piece', value: 'piece' },
      ],
    },
    {
      name: 'vat_rate',
      label: t('invoice.propLabel.vat_rate'),
      type: 'select',
      placeholder: '',
      required: true,
      value: '0',
      options: [
        { label: '0', value: '0' },
        { label: '5.5', value: '5.5' },
        { label: '10', value: '10' },
        { label: '20', value: '20' },
      ],
    },
    {
      name: 'price',
      label: t('invoice.propLabel.price'),
      type: 'number',
      placeholder: '',
      required: true,
      value: '',
    },
    {
      name: 'tax',
      label: t('invoice.propLabel.tax'),
      type: 'number',
      placeholder: '',
      required: true,
      value: '',
    },
  ]
  const handleSubmit = (data: ReturnValues) => {
    onSubmit(data)
  }
  return (
    <FormRender
      config={formConfig}
      values={data}
      onSubmit={handleSubmit}
      layout="horizontal"
    />
  )
}

export default InvoiceLineForm
