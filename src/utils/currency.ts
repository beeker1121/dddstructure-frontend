export const currencies = {
    'USD': {
        format: new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }),
        precision: 2
    },
    'CAD': {
        format: new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'CAD'
        }),
        precision: 2
    },
    'GBP': {
        format: new Intl.NumberFormat('en-GB', {
            style: 'currency',
            currency: 'GBP'
        }),
        precision: 2
    },
    'EUR': {
        format: new Intl.NumberFormat('en-DE', {
            style: 'currency',
            currency: 'EUR'
        }),
        precision: 2
    }
}

export const displayMoneyFormat = (amount: number, currency: any): string => {
    // Handle currency.
    if (!currency) {
        return ''
    }

    // Get currency format.
    const f = (currencies as any)[currency]

    return f.format.format(intToFloat(amount, f.precision))
}

export const intToFloat = (i: number, precision: number): number => {
    // Convert amount from integer to float.
    let s = i.toString()

    // Pad start with 0's if needed.
    s = s.padStart(precision, '0')

    // Add decimal point.
    s = s.slice(0, -precision) + '.' + s.slice(-precision)

    return parseFloat(s)
}