import { getJWT } from "./helpers/auth"

// apiURL defines the API URL.
const apiURL = 'http://localhost:5173/api/v1'

// api defines the main API calls.
const api = {
    // Invoice
    createInvoice: (payload: object) => {
        return fetch(apiURL + '/invoice', {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getJWT()
            }
        })
    },
    getInvoices: () => {
        return fetch(apiURL + '/invoice', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + getJWT()
            }
        })
    },
    getInvoice: (id: number) => {
        return fetch(apiURL + '/invoice/' + id, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + getJWT()
            }
        })
    },
    updateInvoice: (id: number, payload: object) => {
        return fetch(apiURL + '/invoice/' + id, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getJWT()
            }
        })
    },
    deleteInvoice: (id: number) => {
        return fetch(apiURL + '/invoice/' + id, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + getJWT()
            }
        })
    },

    // User
    getUser: () => {
        return fetch(apiURL + '/user', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + getJWT()
            }
        })
    },
    updateUser: (payload: object) => {
        return fetch(apiURL + '/user', {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getJWT()
            }
        })
    }
}

export default api