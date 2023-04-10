const EMPTY_COMPONENT_DATA = `import { FC } from 'react'

import s from './[name -F].module.scss'

interface IProps {

}
export const [name -F]: FC<IProps> = ({
}) => {
    return <></>
}
`

const EMPTY_STORY_DATA = `
import {ComponentMeta, ComponentStory} from "@storybook/react";
import { [name -F] } from "./[name -F]";

export default {
    name: '[name -F]',
    component: [name -F] as ComponentMeta<typeof [name -F]>
}

export const Base: ComponentStory<typeof [name -F]> = (args) => <[name -F] {...args} />

Base.args = {
   
}
`

const EMPTY_SLICE_DATA = `import * as NS from '../namespace'
import {createSlice} from "@reduxjs/toolkit";

const initialState = {

} as NS.IReduxState;

const [name -f]Slice = createSlice({
    name: '[name -f]',
    initialState,
    reducers: {

    }
})
export const [name -f]Reducer = [name -f]Slice.reducer`
const EMPTY_SELECTORS_DATA = `import {StateType} from "app/services";

const getData = (state: StateType) => state.[name -f];`
const EMPTY_MODEL_INDEX_DATA = `export * as selectors from './selectors';
export { [name -f]Reducer } from './slice';`
const EMPTY_NAMESPACE_DATA = `export interface IReduxState {

}
`
const EMPTY_SLICE_INDEX_DATA = `export { [name -F] } from './ui/[name -F]/[name -F]'`

const EMPTY_SCSS_MODULE_DATA = `@import 'src/app/index';`

module.exports = {
    EMPTY_COMPONENT_DATA, EMPTY_STORY_DATA, EMPTY_SELECTORS_DATA, EMPTY_SLICE_INDEX_DATA,
    EMPTY_MODEL_INDEX_DATA, EMPTY_NAMESPACE_DATA, EMPTY_SLICE_DATA, EMPTY_SCSS_MODULE_DATA
}