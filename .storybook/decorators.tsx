// @ts-nocheck
export const withThemeProvider = (Story, context) => {
    let backgroundColor
    switch (context.globals.theme) {
        case 'light':
            backgroundColor = '#F3F3F3'
            break
        case 'dark':
            backgroundColor = '#0A192B'
            break
    }

    document.documentElement.style.background = backgroundColor;
    document.body.style.background = backgroundColor;
    return (
        <body data-theme={context.globals.theme} style={{width: "100%", minHeight: '100%'}}>
        <Story {...context} />
        </body>
    )
}

export const themeDecorator = [Story => <body data-theme={'dark'}><Story/></body>]