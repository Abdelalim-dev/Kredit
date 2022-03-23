export const OPTIONAL = "optional"
export const REQUIRED = "required"
export const REQUIRED_IF = "required_if"
export const PHONE = "phone"
export const IBAN = "iban"
export const CHARGE_AMOUNT = "charge_amount"


export const requiredValidation = () => ({ required: REQUIRED })

export const requiredIfValidation = (field, value) => ({ required_if: [field, value] })

export const phoneValidation = () => ({ required: REQUIRED, phone: PHONE })

export const optionalPhoneValidation = () => ({ optional: OPTIONAL, phone: PHONE })

export const ibanValidation = () => ({ optional: OPTIONAL, iban: IBAN })

export const chargeAmountValidation = () => ({ required: REQUIRED, charge_amount: CHARGE_AMOUNT })




const empty = (value) => value == null || value == ""

export const required = (value) => {
    return value != null && value != ""
}

export const requiredIf = (value, other) => {
    if (empty(other)) return true
    return !empty(value)
}

export const phone = (value, nullable = false) => {
    if (nullable && empty(value)) return true

    return value.match(/(080|081|070|090)[0-9]{8}/g) != null
}

export const iban = (value, nullable = false) => {
    if (nullable && empty(value)) return true

    return value.match(/\b[A-Z]{2}[0-9]{2}(?:[ ]?[0-9]{4}){4}(?!(?:[ ]?[0-9]){3})(?:[ ]?[0-9]{1,2})?\b/g) != null
}

export const number = (value) => {
    return !!Number(value)
}

export const positive = (value) => {
    return number(value) && value > 0
}