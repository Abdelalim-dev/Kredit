export const operators = ['MTN', '9mobile', 'Airtel', 'Glo']

export const balanceUSSD = {
    "MTN": "*556#",
    "9mobile": "*232#",
    "Airtel": "*123#",
    "Glo": "*124#",
}

export const AIRTIME_USSDS = {
    "MTN": "555",
    "9mobile": "222",
    "Airtel": "126",
    "Glo": "123",
}

export const BANK_USSDS = {
    "TEST": "111",
}

export const purchaseFormula =(ussd, voucherCode)=>{
    return `*${ussd}*${voucherCode}#`
}

export const ROUTES = {
    PURCHASE: "Purchase",
    SCAN: "Scan",
}