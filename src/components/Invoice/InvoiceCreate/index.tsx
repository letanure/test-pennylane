export type InvoiceCreateProps = {
  title?: string
}

const InvoiceCreate = ({ title = 'TITLE' }: InvoiceCreateProps) => {
  return <h1>InvoiceCreate {title}</h1>
}

export default InvoiceCreate
