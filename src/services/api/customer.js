import { ROOT_URL } from "."

/**
 * A silent/bg session update
 * @param {*} customer 
 * @returns Promise(updatedCustomer)
 */
export const postCustomer = (customer) => {

    return new Promise((resolve) => {
        fetch(ROOT_URL + '/customer', {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ customer })
        })
            .then(response => { return response.json() })
            .then(({ data }) => { resolve(data.customer) })
            .catch(e => console.log('SESSION.error', e))
    })

}