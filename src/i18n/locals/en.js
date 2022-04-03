const translation = {
    lang: "English",
    phoneHint: "e.g. 08012345678",
    phone1: "Phone 1",
    additionalInfo: "Additional infos",
    sim: "SIM",
    sim1: "Operator (SIM 1)",
    phone2: "Phone 2",
    sim2: "Operator (SIM 2)",
    operator2: "Operator (SIM 2)",
    bank: "Bank name",
    bank2: "Bank (2)",
    required: "required",
    optional: "optional",
    validations: {
        required: "Required field",
        required_if: "Required when ':attribute' is provided",
        phone: "Invalid phone number",
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
    screens: {
        balance: {
            title: "Check your balance",
            noSim: "No SIM",
        },
        purchase: {
            title: "Charge your account",
            amountLabel: "Amount to purchase",
            purchase: "Purchase",
            noBank: "No bank",
            addBank: "Add bank",
            noPhone: "No second phone",
        },
        scan: {
            title: "Place the camera over the voucher",
            cameraPermissionTitle: "Permission to use camera",
            cameraPermission: "We need camera permission to be able to scan the voucher",
            codeDetected: "Voucher code detected!",
            tryAgain: "Try again",
            suggestionsTitle: "Suggestions",
            description: "If you don't see your code please consider removing some suggestions. Others will showup",
            noSuggestions: "If this is taking long, please reset the scan",
            reset: "Reset",
            cameraNotAuthorizedTitle: "Camera not authorized",
            cameraNotAuthorized: "To be able to scan airtime tickets you have to grant camera permission from the settings screen",
            openPermissions: "Open settings",
            digits: "digits",
        },
        more: {
            phone: "Main phone number",
            phone2: "Secondary phone number",
        }
    },
    misc: {
        none: 'None',
        ok: 'Ok',
        cancel: 'Cancel',
        confirm: 'Confirm',
        noSim: "No SIM",
    }
};
export default translation;