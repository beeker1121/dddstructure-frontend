// apiURL defines the API URL.
const apiURL = 'http://localhost:5173/api/v1'

// api defines the main API calls.
const api = {
    signup: (payload: object) => {
        return fetch(apiURL + '/signup', {
            method: 'POST',
            body: JSON.stringify(payload)
        })
    },
    login: (payload: object) => {
        return fetch(apiURL + '/login', {
            method: 'POST',
            body: JSON.stringify(payload)
        })
    }
}

export default api