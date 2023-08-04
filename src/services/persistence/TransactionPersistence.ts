import SecurePersistence from './SecurePersistence'

const KEY_TRANSACTIONS = "transactions"


const add = async function (transaction: any) {

    const transactionList = await get()

    await SecurePersistence.storeData(KEY_TRANSACTIONS, JSON.stringify([...transactionList, transaction]));
}

const get = async function () {
    const transactions = await SecurePersistence.retrieveData(KEY_TRANSACTIONS)

    if (transactions == null) return []

    return JSON.parse(transactions)
}

const remove = async function () {
    await SecurePersistence.remove(KEY_TRANSACTIONS);
}



export default { add, get, remove }