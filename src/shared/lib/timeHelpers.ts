export const getYear = (date: string) => new Date(date).getFullYear()
export const whenWasDate = (date: string) => {

}

export const getTimeAccordingNow = (date: string, lang: string) => {

    const d = new Date(date)
    const now = new Date().valueOf()
    const isRussian = lang === 'ru'

    const deltaSeconds =(now - d.valueOf()) / 1000
    const deltaMinutes =  Math.floor(deltaSeconds / 60)
    const deltaHours =  Math.floor(deltaMinutes / 60)
    const deltaDays =  Math.floor(deltaHours / 24)
    const deltaWeeks = Math.floor(deltaDays / 7)
    const deltaMonths =  Math.floor(deltaWeeks / 4)
    const deltaYears =  Math.floor(deltaMonths / 12)

    console.log(d.toLocaleDateString(), now, d.valueOf(), deltaSeconds, deltaDays, deltaMonths)

    const ago = isRussian ? 'назад' : 'ago'
    const secs = isRussian ? 'секунд' : 'seconds'
    const mins = isRussian ? 'минут' : 'minutes'
    const hours = isRussian ? 'часов' : 'hours'
    const days = isRussian ? 'дней' : 'days'
    const weeks = isRussian ? 'недели' : 'weeks'
    const months = isRussian ? 'месяца' : 'months'
    const years = isRussian ? 'лет' : 'years'

    if (deltaYears >= 1) {
        return `${deltaYears} ${years} ${ago}`
    }
    if (deltaMonths >= 1) {
        return `${deltaMonths} ${months} ${ago}`
    }
    if (deltaWeeks >= 1) {
        return `${deltaWeeks} ${weeks} ${ago}`
    }
    if (deltaDays >= 1) {
        return `${deltaDays} ${days} ${ago}`
    }
    if (deltaHours >= 1) {
        return `${deltaHours} ${hours} ${ago}`
    }
    if (deltaMinutes >= 1) {
        return `${deltaMinutes} ${mins} ${ago}`
    }
    if (deltaSeconds >= 1) {
        return `${deltaSeconds} ${secs} ${ago}`
    }

    return d.toLocaleDateString()
}
