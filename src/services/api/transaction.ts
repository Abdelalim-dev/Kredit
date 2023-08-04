import { ROOT_URL } from "."

/**
 * A silent/bg sync-up
 * 
 * @param customer 
 * @param transactions 
 * @returns 
 */
export const postTransactions = (transactions: [], customer: unknown) => {

    return new Promise((resolve) => {
        fetch(ROOT_URL + '/transactions', {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ customer, transactions })
        })
            .then(response => {

                if (response.ok == false) throw new Error('RESPONSE.NOK')

                return response.json()
            })
            .then((json) => {

                if (!json.success) {

                    console.error('TRANSACTIONS.error', json?.error)

                    throw new Error('RESPONSE.FAIL')
                }

                resolve(json.data)
            })
            .catch(e => console.error('TRANSACTIONS.CATCH', e))
    })

}