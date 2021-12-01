export interface paths {
  '/products/search': {
    get: operations['getSearchProducts']
  }
  '/customers/search': {
    get: operations['getSearchCustomers']
  }
  '/invoices': {
    get: operations['getInvoices']
    post: operations['postInvoices']
  }
  '/invoices/{id}': {
    get: operations['getInvoice']
    put: operations['putInvoice']
    delete: operations['deleteInvoice']
  }
}

export interface components {
  schemas: {
    Error: {
      message: string
    }
    Pagination: {
      page: number
      page_size: number
      total_pages: number
      total_entries: number
    }
    unit: 'hour' | 'day' | 'piece'
    vat_rate: '0' | '5.5' | '10' | '20'
    Product: {
      id: number
      label: string
      vat_rate: components['schemas']['vat_rate']
      unit: components['schemas']['unit']
      unit_price: string
      unit_price_without_tax: string
      unit_tax: string
    }
    Customer: {
      id: number
      first_name: string
      last_name: string
      address: string
      zip_code: string
      city: string
      country: string
      country_code: string
    }
    InvoiceLine: {
      id: number
      invoice_id: number
      product_id: number
      quantity: number
      label: string
      unit: components['schemas']['unit']
      vat_rate: components['schemas']['vat_rate']
      price: string
      tax: string
      product: components['schemas']['Product']
    }
    Invoice: {
      id: number
      customer_id: number | null
      finalized: boolean
      paid: boolean
      date: string | null
      deadline: string | null
      total: string | null
      tax: string | null
      invoice_lines: components['schemas']['InvoiceLine'][]
    }
    InvoiceLineUpdatePayload: {
      /** If this parameter is set, the identified invoice_line will be updated (or deleted if _destroy is set to true) If this parameter is not set, a new invoice_line will be created */
      id?: number
      /** If this parameter is set to true, and if "id" is set, the identified invoice_line will be deleted */
      _destroy?: boolean
      product_id?: number
      quantity?: number
      label?: string
      unit?: components['schemas']['unit']
      vat_rate?: components['schemas']['vat_rate']
      price?: string | number
      tax?: string | number
    }
    InvoiceLineCreatePayload: {
      product_id: number
      quantity?: number
      label?: string
      unit?: components['schemas']['unit']
      vat_rate?: components['schemas']['vat_rate']
      price?: string | number
      tax?: string | number
    }
    InvoiceUpdatePayload: {
      id: number
      customer_id?: number
      finalized?: boolean
      paid?: boolean
      date?: string | null
      deadline?: string | null
      invoice_lines_attributes?: components['schemas']['InvoiceLineUpdatePayload'][]
    }
    InvoiceCreatePayload: {
      customer_id: number
      finalized?: boolean
      paid?: boolean
      date?: string | null
      deadline?: string | null
      invoice_lines_attributes?: components['schemas']['InvoiceLineCreatePayload'][]
    }
  }
}

export interface operations {
  getSearchProducts: {
    parameters: {
      header: {
        'X-SESSION'?: string
      }
      query: {
        query?: string
        page?: number
        per_page?: number
      }
    }
    responses: {
      /** the matching products */
      200: {
        content: {
          'application/json': {
            pagination: components['schemas']['Pagination']
            products: components['schemas']['Product'][]
          }
        }
      }
    }
  }
  getSearchCustomers: {
    parameters: {
      header: {
        'X-SESSION'?: string
      }
      query: {
        query?: string
        page?: number
        per_page?: number
      }
    }
    responses: {
      /** the matching customers */
      200: {
        content: {
          'application/json': {
            pagination: components['schemas']['Pagination']
            customers: components['schemas']['Customer'][]
          }
        }
      }
    }
  }
  getInvoices: {
    parameters: {
      header: {
        'X-SESSION'?: string
      }
      query: {
        page?: number
        per_page?: number
        /** Filter object for tables (click "Try it out" to view an example) */
        filter?: string
      }
    }
    responses: {
      /** the matching invoices */
      200: {
        content: {
          'application/json': {
            pagination: components['schemas']['Pagination']
            invoices: (components['schemas']['Invoice'] & {
              customer?: components['schemas']['Customer']
            })[]
          }
        }
      }
    }
  }
  postInvoices: {
    parameters: {
      header: {
        'X-SESSION'?: string
      }
    }
    responses: {
      /** the created invoice */
      200: {
        content: {
          'application/json': components['schemas']['Invoice']
        }
      }
    }
    requestBody: {
      content: {
        'application/json': {
          invoice?: components['schemas']['InvoiceCreatePayload']
        }
      }
    }
  }
  getInvoice: {
    parameters: {
      header: {
        'X-SESSION'?: string
      }
      path: {
        id: number
      }
    }
    responses: {
      /** returns the matching invoice */
      200: {
        content: {
          'application/json': components['schemas']['Invoice']
        }
      }
    }
  }
  putInvoice: {
    parameters: {
      header: {
        'X-SESSION'?: string
      }
      path: {
        id: number
      }
    }
    responses: {
      /** the modified invoice */
      200: {
        content: {
          'application/json': components['schemas']['Invoice']
        }
      }
    }
    requestBody: {
      content: {
        'application/json': {
          invoice?: components['schemas']['InvoiceUpdatePayload']
        }
      }
    }
  }
  deleteInvoice: {
    parameters: {
      header: {
        'X-SESSION'?: string
      }
      path: {
        id: number
      }
    }
    responses: {
      /** (empty) invoice has been deleted */
      204: never
    }
  }
}

export interface external {}
