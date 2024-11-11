import { getJWT } from "./helpers/auth"

// apiURL defines the API URL.
const apiURL = 'http://localhost:5173/api/v1'

// api defines the main API calls.
const api = {
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
    }
}

export default api