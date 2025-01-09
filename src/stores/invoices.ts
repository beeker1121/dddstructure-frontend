import { defineStore } from 'pinia'

import { Invoice } from '../proto/invoice'
import apiUser from '../api-user'

export interface getParamsCreatedAt {
    start_date: Date | null
    end_date: Date | null
}

export interface getParams {
    created_at: getParamsCreatedAt | null
    offset: number
    limit: number
}

interface State {
    invoices: Invoice[]
    totalCount: number
}

export const useInvoicesStore = defineStore('invoices', {
    state: (): State => {
        return {
            invoices: [],
            totalCount: 0
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

                if (query === '') {
                    query += '?'
                } else {
                    query += '&'
                }
    
                query += 'offset=' + params.offset.toString()
                query += '&limit=' + params.limit.toString()
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
                this.totalCount = res.meta.total
            }).catch((err) => {
                console.log('error: ' + err)
            })
        }
    }
})