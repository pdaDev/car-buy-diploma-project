
export type SideMenuContentType = 'chat' | 'notifications' | null
export interface IReduxState {
    showHeaderStatus: boolean;
    showFooterStatus: boolean;
    transparentHeader: boolean
    transparentFooter: boolean
    sideMenuContentType: SideMenuContentType
}


