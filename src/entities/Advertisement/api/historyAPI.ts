const historyKey = 'history'
export const getHistory = () => {
    const history = localStorage.getItem(historyKey)
    return  history ? JSON.parse(history) : []
}
export const saveAdvertisementToHistory = (id: number) => {
    const historyItem = { id, date: new Date() }
    const newHistory = JSON.stringify([...getHistory(), historyItem])
    localStorage.setItem(historyKey, newHistory)
}

export const clearHistory = () => {
    localStorage.removeItem('history')
}

export const getRecentAds = (count: number = 10): { id: number, date: string }[] => {
    return getHistory().filter((_: any, i: number) => i < count)
}
