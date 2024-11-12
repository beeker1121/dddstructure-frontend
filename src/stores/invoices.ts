import { defineStore } from 'pinia'

import apiUser from '../api-user'

export const useInvoicesStore = defineStore('invoices', {
    state: () => {
        return {
            invoices: [] as any
        }
    },
    actions: {
        getInvoices() {
            // Call the API.
            apiUser.getInvoices()
            .then(res => res.json()).then((res) => {
                // Handle errors.
                if (res.errors) {
                    return
                }

                // Set invoices.
                this.invoices = res.data
            }).catch((err) => {
                console.log('error: ' + err)
            })
        }
    }
})