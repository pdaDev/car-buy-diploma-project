
import {ComponentMeta, ComponentStory} from "@storybook/react";
import { ErrorBoundary } from "./ErrorBoundary";

export default {
    name: 'ErrorBoundary',
    component: ErrorBoundary as ComponentMeta<typeof ErrorBoundary>
}

export const Base: ComponentStory<typeof ErrorBoundary> = (args) => <ErrorBoundary {...args} />

Base.args = {
   code: 404,
    message: 'Не найдено'
}
