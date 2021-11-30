import { useState, useEffect } from 'react'
import { useParams } from 'react-router'

import { Invoice } from 'types'
import { useApi } from 'api'
import InvoiceForm from 'components/Invoice/InvoiceForm'

const InvoiceShow = () => {
  const { id } = useParams()
  const api = useApi()
  const [invoice, setInvoice] = useState<Invoice>()

  useEffect(() => {
    api.getInvoice(id).then(({ data }) => {
      setInvoice(data)
    })
  }, [api, id])

  const handleSubmit = (data: any) => {
    const id = data.id as number
    if (!!id) {
      api.putInvoice(id, data).then(({ data }) => {
        setInvoice(data)
      })
    }
  }

  return (
    <>{!!invoice && <InvoiceForm values={invoice} onSubmit={handleSubmit} />}</>
  )
}

export default InvoiceShow
