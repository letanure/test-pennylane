import { useApi } from 'api'
import InvoiceForm from 'components/Invoice/InvoiceForm'
import { InvoiceCreatePayload } from 'types'
import { useTranslation } from 'react-i18next'

const InvoiceCreate = () => {
  const { t } = useTranslation()
  const api = useApi()

  const handleSubmit = (data: InvoiceCreatePayload) => {
    api.postInvoices(null, data).then(({ data }) => {
      console.log(data)
    })
  }

  return (
    <InvoiceForm
      values={null}
      onSubmit={handleSubmit}
      title={t('invoice.form.create.title')}
    />
  )
}

export default InvoiceCreate
