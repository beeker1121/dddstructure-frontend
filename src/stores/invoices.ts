import { defineStore } from 'pinia'

export const useInvoicesStore = defineStore('invoices', {
    state: () => {
        return {
            invoices: [] as any
        }
    },
    actions: {
        getInvoices() {
            console.log('calling getInvoices...')

            this.invoices.push({
                id: 1,
                user_id: 1,
                amount_due: 100,
                amount_paid: 0,
                status: 'pending'
            })
        }
    }
})