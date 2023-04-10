

export const modals = ['info', 'auth', 'image'] as const
export type ModalsKeys = typeof modals[number]

export interface IReduxState {
    availableModals: typeof modals
    openModals: ModalsKeys []
}