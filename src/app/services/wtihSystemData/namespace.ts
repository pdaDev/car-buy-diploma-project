export type Theme = 'light' | 'dark' | 'auto';

export type Language = 'ru' | 'eng' | 'auto'
export interface IReduxState {
    theme: {
        current: Theme
        themes: Theme[];
    }
    language: Language | null
    fatalError: any
    errors: any[]
}