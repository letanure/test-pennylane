import {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios'; 

declare namespace Definitions {
  export interface Customer {
    /**
     * example:
     * 6772
     */
    id?: number; // int64
    /**
     * example:
     * Jean
     */
    first_name?: string;
    /**
     * example:
     * Dupont
     */
    last_name?: string;
    /**
     * example:
     * 1478 Jessica Valleys
     */
    address?: string;
    /**
     * example:
     * 19884-5031
     */
    zip_code?: string;
    /**
     * example:
     * Scottychester
     */
    city?: string;
    /**
     * example:
     * Palestine, State of
     */
    country?: string;
    /**
     * example:
     * PS
     */
    country_code?: string;
  }
  export interface Invoice {
    /**
     * example:
     * 5747
     */
    id?: number; // int64
    /**
     * example:
     * 6921
     */
    customer_id?: number;
    finalized?: boolean;
    paid?: boolean;
    /**
     * example:
     * 2021-03-23
     */
    date?: string; // date
    deadline?: string; // date
    /**
     * example:
     * 35355.0
     */
    total?: string;
    /**
     * example:
     * 5102.73
     */
    tax?: string;
    customer?: Customer;
    invoice_lines?: InvoiceLine[];
  }
  export interface InvoiceLine {
    /**
     * example:
     * 9122
     */
    id?: number; // int64
    /**
     * example:
     * 5752
     */
    invoice_id?: number; // int64
    /**
     * example:
     * 19268
     */
    product_id?: number; // int64
    /**
     * example:
     * 1
     */
    quantity?: number;
    unit?: "piece" | "hour" | "day";
    /**
     * example:
     * 13
     */
    label?: string;
    vat_rate?: "20" | "10" | "5.5" | "01";
    /**
     * example:
     * 19245.0
     */
    price?: string;
    /**
     * example:
     * 3207.5
     */
    tax?: string;
    product?: Product;
  }
  export interface Pagination {
    /**
     * example:
     * 1
     */
    page?: number;
    /**
     * example:
     * 25
     */
    page_size?: number;
    /**
     * example:
     * 1
     */
    total_pages?: number;
    /**
     * example:
     * 3
     */
    total_entries?: number;
  }
  export interface Product {
    /**
     * example:
     * 19327
     */
    id?: number; // int64
    /**
     * example:
     * Renault Clio
     */
    label?: string;
    /**
     * example:
     * 12255.0
     */
    unit_price?: string;
    /**
     * example:
     * 11140.91
     */
    unit_price_without_tax?: string;
    /**
     * example:
     * 1114.09
     */
    unit_tax?: string;
  }
}
declare namespace Paths {
  namespace CreateInvoice {
    export interface BodyParameters {
      body?: Parameters.Body;
    }
    namespace Parameters {
      export interface Body {
        /**
         * example:
         * 5747
         */
        customer_id: number;
        finalized?: boolean;
        paid?: boolean;
        /**
         * example:
         * 2021-03-23
         */
        date?: string; // date
        deadline?: string; // date
        invoice_lines_attributes?: {
          /**
           * example:
           * 19268
           */
          product_id?: number; // int64
          /**
           * example:
           * 1
           */
          quantity?: number;
          unit?: "piece" | "hour" | "day";
          /**
           * example:
           * 13
           */
          label?: string;
          vat_rate?: "20" | "10" | "5.5" | "2.1";
          /**
           * example:
           * 120
           */
          price?: number;
          /**
           * example:
           * 20
           */
          tax?: number;
        }[];
      }
    }
    namespace Responses {
      export interface $200 {
        invoices?: Definitions.Invoice[];
      }
    }
  }
  namespace FindInvoice {
    namespace Responses {
      export type $200 = Definitions.Invoice;
    }
  }
  namespace GetInvoices {
    namespace Responses {
      export interface $200 {
        invoices?: Definitions.Invoice[];
        pagination?: Definitions.Pagination;
      }
    }
  }
  namespace PatchInvoice {
    export interface BodyParameters {
      body?: Parameters.Body;
    }
    namespace Parameters {
      export interface Body {
        /**
         * example:
         * 5747
         */
        customer_id: number;
        finalized?: boolean;
        paid?: boolean;
        /**
         * example:
         * 2021-03-23
         */
        date?: string; // date
        deadline?: string; // date
        invoice_lines_attributes?: {
          _destroy?: boolean;
          /**
           * example:
           * 19268
           */
          product_id?: number; // int64
          /**
           * example:
           * 1
           */
          quantity?: number;
          unit?: "piece" | "hour" | "day";
          /**
           * example:
           * 13
           */
          label?: string;
          vat_rate?: "20" | "10" | "5.5" | "2.1";
          /**
           * example:
           * 120
           */
          price?: number;
          /**
           * example:
           * 20
           */
          tax?: number;
        }[];
      }
    }
    namespace Responses {
      export interface $200 {
        invoices?: Definitions.Invoice[];
      }
    }
  }
  namespace SearchCustomers {
    namespace Responses {
      export interface $200 {
        customers?: Definitions.Customer[];
        pagination?: Definitions.Pagination;
      }
    }
  }
  namespace SearchProducts {
    namespace Responses {
      export interface $200 {
        customers?: Definitions.Product[];
        pagination?: Definitions.Pagination;
      }
    }
  }
  namespace UpdateInvoice {
    export interface BodyParameters {
      body?: Parameters.Body;
    }
    namespace Parameters {
      export interface Body {
        /**
         * example:
         * 5747
         */
        customer_id: number;
        finalized?: boolean;
        paid?: boolean;
        /**
         * example:
         * 2021-03-23
         */
        date?: string; // date
        deadline?: string; // date
        invoice_lines_attributes?: {
          _destroy?: boolean;
          /**
           * example:
           * 19268
           */
          product_id?: number; // int64
          /**
           * example:
           * 1
           */
          quantity?: number;
          unit?: "piece" | "hour" | "day";
          /**
           * example:
           * 13
           */
          label?: string;
          vat_rate?: "20" | "10" | "5.5" | "2.1";
          /**
           * example:
           * 120
           */
          price?: number;
          /**
           * example:
           * 20
           */
          tax?: number;
        }[];
      }
    }
    namespace Responses {
      export interface $200 {
        invoices?: Definitions.Invoice[];
      }
    }
  }
}

export interface OperationMethods {
  /**
   * GetInvoices - Retrieve a list of invoices
   */
  'GetInvoices'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetInvoices.Responses.$200>
  /**
   * CreateInvoice - Create an invoice
   */
  'CreateInvoice'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateInvoice.Responses.$200>
  /**
   * FindInvoice - Find an invoice by ID
   */
  'FindInvoice'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.FindInvoice.Responses.$200>
  /**
   * UpdateInvoice - Update an invoice
   */
  'UpdateInvoice'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateInvoice.Responses.$200>
  /**
   * PatchInvoice - Update an invoice
   */
  'PatchInvoice'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PatchInvoice.Responses.$200>
  /**
   * DeleteInvoice - Delete an invoice
   */
  'DeleteInvoice'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<any>
  /**
   * SearchCustomers - Search for a customer in all the fields
   */
  'SearchCustomers'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SearchCustomers.Responses.$200>
  /**
   * SearchProducts - Search for a product in all the fields
   */
  'SearchProducts'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SearchProducts.Responses.$200>
}

export interface PathsDictionary {
  ['/invoices']: {
    /**
     * GetInvoices - Retrieve a list of invoices
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetInvoices.Responses.$200>
    /**
     * CreateInvoice - Create an invoice
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateInvoice.Responses.$200>
  }
  ['/invoices/{id}']: {
    /**
     * FindInvoice - Find an invoice by ID
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.FindInvoice.Responses.$200>
    /**
     * PatchInvoice - Update an invoice
     */
    'patch'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PatchInvoice.Responses.$200>
    /**
     * UpdateInvoice - Update an invoice
     */
    'put'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateInvoice.Responses.$200>
    /**
     * DeleteInvoice - Delete an invoice
     */
    'delete'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<any>
  }
  ['/customers/search']: {
    /**
     * SearchCustomers - Search for a customer in all the fields
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SearchCustomers.Responses.$200>
  }
  ['/products/search']: {
    /**
     * SearchProducts - Search for a product in all the fields
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SearchProducts.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>
