import { defineStore } from 'pinia'

import apiUser from '../api-user'

export interface getParamsCreatedAt {
    start_date: Date | null
    end_date: Date | null
}

export interface getParams {
    created_at: getParamsCreatedAt | null
}

export const useInvoicesStore = defineStore('invoices', {
    state: () => {
        return {
            invoices: [] as any
        }
    },
    actions: {
        getInvoices(params: getParams | null) {
            // Build query string.
            let query = ''

            if (params) {
                if (params.created_at) {
                    if (params.created_at.start_date) {
                        if (query === '') {
                            query += '?'
                        } else {
                            query += '&'
                        }

                        query += 'created_at_start=' + params.created_at.start_date.toISOString().slice(0, 19).replace('T', ' ');
                    }
                }

                if (params.created_at) {
                    if (params.created_at.end_date) {
                        if (query === '') {
                            query += '?'
                        } else {
                            query += '&'
                        }

                        query += 'created_at_end=' + params.created_at.end_date.toISOString().slice(0, 19).replace('T', ' ');
                    }
                }
            }

            // Call the API.
            return apiUser.getInvoices(query)
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