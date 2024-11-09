import { getJWT } from "./helpers/auth"

// apiURL defines the API URL.
const apiURL = 'http://localhost:5157/api'

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
    }
}

export default api