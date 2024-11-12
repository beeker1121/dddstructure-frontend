// getParamError handles getting a specific parameter error by name from an
// error array.
export const getParamError = (errors: any, param: string) => {
    return errors.find((e: any) => e.param === param)
}

// getSingleError handles getting a single, non-parameter error from an error
// array.
export const getSingleError = (errors: any) => {
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