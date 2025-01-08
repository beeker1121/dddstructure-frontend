// currencies stores a list of currencies and their given Intl.NumberFormat.
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

// displayMoneyFormat takes the given integer amount and currency and returns a
// string in the given currency format.
export const displayMoneyFormat = (amount: number, currency: any): string => {
    // Handle currency.
    if (!currency) {
        return ''
    }

    // Get currency format.
    const f = (currencies as any)[currency]
    let ret = f.format.format(intToFloat(amount, f.precision))

    // Remove any alphanumeric country designations
    // from the beginning (ie the 'CA' in 'CA$1.23').
    ret = ret.replace(/[A-Z]{2,3}/g, '')

    return ret
}

// intoToFloat take the given integer and precision and returns a float.
export const intToFloat = (i: number, precision: number): number => {
    // Convert amount from integer to float.
    let s = i.toString()

    // Pad start with 0's if needed.
    s = s.padStart(precision, '0')

    // Add decimal point.
    s = s.slice(0, -precision) + '.' + s.slice(-precision)

    return parseFloat(s)
}

// RoundingType defines a rounding algorithm.
export enum RoundingType {
    Round = 'round',
    Floor = 'floor',
    Ceil = 'ceil',
    Bankers = 'bankers'
}

// percentageFromInt takes the given amount and percentage and calculates the
// result to the given fraction. The round parameter determines which type of
// rounding algorithm to use for the final number.
export const percentageFromInt = (amount: number, percentage: number, fraction: number, round: RoundingType) => {
    // Calculate percentage.
    let val = amount * percentage
    val = val / 100
  
    // Remove potential rounding errors by moving decimal
    // two places past desired fraction and truncating.
    val = Math.trunc(val*Math.pow(10, fraction+2)) / Math.pow(10, fraction+2)
  
    // Handle rounding.
    switch (round) {
        case RoundingType.Round:
            val = Math.round(val*Math.pow(10, fraction)) / Math.pow(10, fraction)
            break
        case RoundingType.Floor:
            val = Math.floor(val*Math.pow(10, fraction)) / Math.pow(10, fraction)
            break
        case RoundingType.Ceil:
            val = Math.ceil(val*Math.pow(10, fraction)) / Math.pow(10, fraction)
            break
        case RoundingType.Bankers:
            val = roundToEven(val*Math.pow(10, fraction)) / Math.pow(10, fraction)
            break
        default:
            val = Math.round(val*Math.pow(10, fraction)) / Math.pow(10, fraction)
    }

    return val
}

// roundToEven rounds the given number using banker's rounding.
const roundToEven = (num: number) => {
    const decimalPart = num % 1;
    const integerPart = Math.floor(num);

    if (decimalPart < 0.5) {
        return Math.floor(num);
    } else if (decimalPart > 0.5) {
        return Math.ceil(num);
    } else {
        // If exactly 0.5, round to the nearest even integer.
        return integerPart % 2 === 0 ? integerPart : integerPart + 1;
    }
}