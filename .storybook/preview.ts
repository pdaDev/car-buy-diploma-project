import '../src/app/index.scss'

import {INITIAL_VIEWPORTS} from '@storybook/addon-viewport';
import {themeDecorator, withThemeProvider} from './decorators'

export const globalTypes = {
    theme: {
        name: 'Theme',
        description: 'Global theme for components',
        defaultValue: 'light',
        toolbar: {
            icon: 'globe',
            items: ['light', 'dark'],
        },
    },
};

export const parameters = {
    actions: {argTypesRegex: "^on[A-Z].*"},
    viewport: {
        viewports: INITIAL_VIEWPORTS,
    }
    ,
    backgrounds: {
        defaultValue: globalTypes.theme,
        values: [
            {name: 'light', value: '#F3F3F3'},
            {name: 'dark', value: '#0A192B'}
        ]
    }
    ,
    decorators: themeDecorator,
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
}


export const decorators = [withThemeProvider];