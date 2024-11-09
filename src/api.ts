// apiURL defines the API URL.
const apiURL = 'http://localhost:5157/api'

// api defines the main API calls.
const api = {
    login: (payload: object) => {
        return fetch(apiURL + '/login', {
            method: 'POST',
            body: JSON.stringify(payload)
        })
    }
}

export default api