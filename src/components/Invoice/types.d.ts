export interface Invoice {
  customer_id: number
  customer: Customer
  date: string
  deadline: string
  finalized: boolean
  id: number
  invoice_lines?: InvoiceItem[] | null
  paid: boolean
  tax: string
  total: string
}
export interface Customer {
  address: string
  city: string
  country_code: string
  country: string
  first_name: string
  id: number
  last_name: string
  zip_code: string
}
export interface InvoiceItem {
  id: number
  invoice_id: number
  label: string
  price: string
  product_id: number
  product: Product
  quantity: number
  tax: string
  unit: string
  vat_rate: string
}
export interface Product {
  id: number
  label: string
  unit_price_without_tax: string
  unit_price: string
  unit_tax: string
  unit: string
  vat_rate: string
}
