import {css} from "styled-components";

export function cn(...args: any[]) {
    // @ts-ignore
    return [...arguments].filter(arg => arg).reduce<string>((acc, arg) => acc + arg + ' ', '')
}

export function addPrefix(prefix: string, variable: string | number, type: any) {
    return type[`${prefix}_${variable}`]
}

export function activeStyles(status: boolean, s: { active: string, disabled: string }) {
    return status ? s.active : s.disabled
}

export function addLoadingEffectToStyleComponent(loading: boolean | undefined) {
    return loading ? css`
      * {
        opacity: 0;
      }

      box-shadow: none;
      border-color: transparent;
      background-color: #DDDBDD;
      overflow: hidden;
      position: relative;
      
    ` : null
}