// initialAuthCheck handles authenticating routes.
export const initialAuthCheck = (to: any, from: any, next: any) => {
    if (!isAuthenticated()) {
        next('/login')
        return
    }

    next()
}

// isAuthenticated checks if the user is authenticated.
const isAuthenticated = (): boolean => {
    // Get JWT.
    const jwt = getJWT()
    if (jwt === null) {
        return false
    }

    return true
}

// getJWT handles getting the JWT from session storage.
export const getJWT = (): string | null => {
    return sessionStorage.getItem('jwt')
}

// setJWT handles setting a JWT to session storage.
export const setJWT = (jwt: string) => {
    sessionStorage.setItem('jwt', jwt)
}

// clearJWT handles clearing the JWT from session storage.
export const clearJWT = () => {
    sessionStorage.removeItem('jwt')
}