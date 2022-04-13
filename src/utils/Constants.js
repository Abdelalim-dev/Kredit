export const OPERATORS = ['MTN', '9mobile', 'Airtel', 'Glo']

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

// *USSD* amount # 
export const BANK_USSDS = {
    "Access": "901",
    "Ecobank": "326",
    "FCMB": "329",
    "Fidelity": "770",
    "First": "894",
    "Guarantee Trust (GTB)": "737",
    "Keystone": "7111",
    "Polaris (Skye)": "833",
    "Stanbic IBTC": "909",
    "Union": "826",
    "Zenith": "966",
}

export const BANKS = Object.keys(BANK_USSDS)

export const ROUTES = {
    PURCHASE: "Purchase",
    SCAN: "Scan",
}