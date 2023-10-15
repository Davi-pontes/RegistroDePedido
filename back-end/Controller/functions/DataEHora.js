exports.getDateCurrent = () => {
    let date = new Date()
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()

    let strDay = new String(day)
    let strMonth = new String(month)

    strDay.length == 1 ? day = '0' + day : day = day
    strMonth.length == 1 ? month = '0' + month : month = month

    let dateCurrent = day + '/' + month + '/' + year

    return dateCurrent
}
exports.getHoursCurrent = () => {
    const brazilTimeZone = 'America/Sao_Paulo'

    const options = {
        timeZone: brazilTimeZone,
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
    }

    const hoursCurrent = new Date().toLocaleTimeString('pt-BR', options)

    return hoursCurrent
}
exports.getDayCurrent = () => {
    const brazilTimeZone = 'America/Sao_Paulo'

    const currentDate = new Date().toLocaleString('en-US', { timeZone: brazilTimeZone })

    const dateInBrazil = new Date(currentDate)

    const dayOfWeekInBrazil = dateInBrazil.getDay()

    return dayOfWeekInBrazil
}