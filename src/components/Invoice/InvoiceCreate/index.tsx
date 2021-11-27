import { Paths } from 'api/gen/client'
import { useApi } from 'api'
import InvoiceForm from 'components/Invoice/InvoiceForm'

const InvoiceCreate = () => {
  const api = useApi()

  const handleSubmit = ({
    customer_id,
    finalized,
    paid,
    date,
    deadline,
  }: any) => {
    const dataInvoice: Paths.PostInvoices.RequestBody['invoice'] = {
      customer_id,
      finalized,
      paid,
      date,
      deadline,
      invoice_lines_attributes: [],
    }
    api
      .postInvoices(null, {
        invoice: dataInvoice,
      })
      .then(({ data }) => {
        console.log(data)
      })
  }

  const newInvoice = {
    customer_id: null,
    customer: undefined,
    date: null,
    deadline: null,
    finalized: false,
    id: 0,
    invoice_lines: [],
    paid: false,
    tax: null,
    total: null,
  }

  return <InvoiceForm data={newInvoice} onSubmit={handleSubmit} />
}

export default InvoiceCreate
