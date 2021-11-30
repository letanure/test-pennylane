import { useApi } from 'api'
import InvoiceForm from 'components/Invoice/InvoiceForm'
import { InvoiceCreatePayload } from 'types'

const InvoiceCreate = () => {
  const api = useApi()

  const handleSubmit = (data: InvoiceCreatePayload) => {
    api.postInvoices(null, data).then(({ data }) => {
      console.log(data)
    })
  }

  return <InvoiceForm values={null} onSubmit={handleSubmit} />
}

export default InvoiceCreate
