export const operators = ['MTN', '9mobile', 'Airtel', 'Glo']

export const balanceUSSD = {
    "MTN": "*556#",
    "9mobile": "*232#",
    "Airtel": "*123#",
    "Glo": "#124*1#",
}

export const purchaseUSSD = {
    "MTN": "555",
    "9mobile": "222",
    "Airtel": "126",
    "Glo": "123",
}

export const purchaseFormula =(ussd, voucherCode)=>{
    return `*${ussd}*${voucherCode}#`
}

export const ROUTES = {
    PURCHASE: "Purchase",
    SCAN: "Scan",
}