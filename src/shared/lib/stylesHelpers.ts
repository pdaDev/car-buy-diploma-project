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

&::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: translateX(-100%);
    background: linear-gradient(
        90deg,
        rgba(#fff, 0) 0,
        rgba(#fff, 0.2) 20%,
        rgba(#fff, 0.5) 60%,
        rgba(#fff, 0)
);
    animation: shimmer 2s infinite;
    content: '';
}

@keyframes shimmer {
    100% {
        transform: translateX(100%);
    }
}
` : null
}