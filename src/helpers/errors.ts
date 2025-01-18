export interface APIError {
    status: number
    param: string
    detail: string
}

// getParamError handles getting a specific parameter error by name from an
// error array.
export const getParamError = (errors: APIError[], param: string): APIError => {
    const ret = errors.find((e: any) => e.param === param)
    if (ret) {
        return ret
    }

    return {} as APIError
}

// getSingleError handles getting a single, non-parameter error from an error
// array.
export const getSingleError = (errors: APIError[]): APIError | null => {
    if (!errors.length) {
        return null
    }

    if (errors.length === 1) {
        if (errors[0].param) {
            return null
        }

        return errors[0]
    }

    return null
}