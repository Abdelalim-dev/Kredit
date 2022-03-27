const translation = {
    lang: "English",
    phoneHint: "e.g. 08012345678",
    phone1: "Phone 1",
    additionalInfo: "Additional infos",
    sim: "SIM",
    sim1: "Operator (SIM 1)",
    phone2: "Phone 2",
    sim2: "Operator (SIM 2)",
    bank: "Bank name",
    iban: "Bank number (To recharge your credit)",
    required: "required",
    optional: "optional",
    validations: {
        required: "Required field",
        required_if: "Required field with :attribute",
        phone: "Invalid phone number",
        iban: "Invalid bank account number",
        charge_amount: "Pleasse fill in the amount",
        formError: "Some of the fields in the form are invalid, please check the displayed error messages for more details.",
    },
    login: "Login",
    next: "Next",
    done: "Done",
    scan: "Scan",
    purchase: "Top up",
    balance: "Balance",
    more: "More",
    screens:{
        balance: {
            title: "Check your balance",
            noSim: "No SIM",
        },
        purchase: {
            title: "Charge your account",
            amountLabel: "Amount to purchase",
            purchase: "Purchase",
        },
        scan: {
            title: "Place the camera over the voucher",
            cameraPermissionTitle: "Permission to use camera",
            cameraPermission: "We need camera permission to be able to scan the voucher",
            codeDetected: "Voucher code detected!",
            tryAgain: "Try again",
        },
        more: {
            phone: "Main phone number",
            phone2: "Secondary phone number",
            iban: "Bank account number",
        }
    },
    misc: {
        none: 'None',
        ok: 'Ok',
        cancel: 'Cancel',
        confirm: 'Confirm',
    }
};
export default translation;