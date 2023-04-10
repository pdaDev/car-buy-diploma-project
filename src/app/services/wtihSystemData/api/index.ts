import * as NS from '../namespace'
export const getCurrentTheme = () => localStorage.getItem('theme') || 'auto'


export const setTheme = (theme: NS.Theme) => {
    localStorage.setItem('theme', theme)
}

export const getLanguage = () => localStorage.getItem('language') as NS.Language | undefined
export const setAutoLanguage = () => localStorage.setItem('language', 'auto')
export const removeAutoLanguage = () => localStorage.removeItem('language')