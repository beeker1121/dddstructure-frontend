export interface APIError {
    status: number
    param: string
    detail: string
}

// getParamError handles getting a specific parameter error by name from an
// error array.
export const getParamError = (errors: APIError[], param: string): APIError => {
    return errors.find((e: any) => e.param === param) as APIError
}

// getSingleError handles getting a single, non-parameter error from an error
// array.
export const getSingleError = (errors: APIError[]): APIError => {
    if (!errors.length) {
        return {} as APIError
    }

    if (errors.length === 1) {
        if (errors[0].param) {
            return {} as APIError
        }

        return errors[0]
    }

    return {} as APIError
}