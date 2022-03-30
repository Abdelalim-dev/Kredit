export const airtime = (value) => {
    let result = ""
    for (let i = 0; i < value.length; i++)
        result += (i + 1) % 4 == 0 ? value[i] + ' ' : value[i]
    return result
}