import {FC, ReactNode, useState} from 'react'
import s from './SideNavigationMenu.module.scss'
import {Container, Stack} from "../Layout";
import styled from "styled-components";
import {cn} from "../../lib";
import {IOption} from "../../types";
import {Label} from "../Label/Label";


const OptionsWrapper = styled.div<{ p: number }>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding-left: ${props => props.p}px;
`

type Option = {
    value: string
    label: string
    nested?: Option[]
}

interface IProps {
    options: Option[]
    current: Option['value']
    onChange: (v: Option['value'] | null) => void
}

export const SideNavigationMenu: FC<IProps> = ({
                                                   options,
                                                   current
                                                   , onChange,
                                               }) => {

    const renderOptions = (options: Option[], offset = 0, root = '') => {
        return <OptionsWrapper p={16 * offset}>
            {
                options.map((option, index) => {

                    const currentCodes = current.split('/')
                    const isActive = currentCodes.includes(option.value)
                    const isPrevious = currentCodes.includes(options[index + 1]?.value)
                    const hasNested = isActive && option.nested
                    const isNested = offset > 0
                    const code = root ? root + '/' + option.value : option.value
                    return <>
                        <div className={cn(
                            s.option,
                            isActive && s.active,
                            isPrevious && s.previous,
                            isNested && s.nested
                        )}
                             onClick={() => onChange(current === code ? root : code)}>
                            <Label label={option.label}
                                   level={4}
                                   />
                        </div>
                        {hasNested && renderOptions(option.nested!, offset + 1, code )}

                    </>
                })
            }
        </OptionsWrapper>
    }

    return <div className={s.wrapper}>
        {renderOptions(options)}
    </div>
}
