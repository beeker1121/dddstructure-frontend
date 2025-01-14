export interface InvoiceBillTo {
    first_name: string
    last_name: string
    company: string
    address_line_1: string
    address_line_2: string
    city: string
    state: string
    postal_code: string
    country: string
    email: string
    phone: string
}

export interface InvoicePayTo {
    first_name: string
    last_name: string
    company: string
    address_line_1: string
    address_line_2: string
    city: string
    state: string
    postal_code: string
    country: string
    email: string
    phone: string
}

export interface InvoiceLineItem {
    name: string
    description: string
    quantity: number
    price: number
    subtotal: number
}

export interface Invoice {
    id: number
    public_hash: string
    invoice_number: string
    po_number: string
    currency: string
    due_date: string
    message: string
    bill_to: InvoiceBillTo,
    pay_to: InvoicePayTo,
    line_items: InvoiceLineItem[]
    payment_methods: string[]
    tax_rate: string
    amount_due: number
    amount_paid: number
}