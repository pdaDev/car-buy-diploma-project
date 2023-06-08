import React, {FC, ReactNode} from "react";

import s from './Label.module.scss'
import {addLoadingEffectToStyleComponent, addPrefix, cn, getPercents} from "../../lib";
import {Color, FontWeight, SpaceLevel} from "../../types";
import styled, {css} from "styled-components";

interface IProps {
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    loading?: boolean;
    label: string | number | null | undefined;
    maxlength?: number;
    width?: '100%' | 'auto'
    align?: 'start' | 'end' | 'center'
    type?: 'primary' | 'secondary';
    size?: SpaceLevel | string
    color?: Color,
    weight?: FontWeight
    loadingWidth?: number | `${number}px`
}

const getFontColorByType = (type: IProps['type']) => {
    switch (type) {
        case 'primary':
            return 'fnt-primary'
        case 'secondary':
            return 'grey-1'
    }
}

const LabelWrapper = styled.span<Omit<IProps, 'label' | 'type' | 'color'> & { t: IProps['type'], clr: IProps['color'] }>`
  border-radius: var(--brd-radius-1);
  display: inline-flex;
  align-items: center;
  height: auto;
  vertical-align: center;
  width: ${props => props.width};
  flex-grow: 0;

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    padding: 0;
    color: ${props => `var(--clr-${getFontColorByType(props.t)})`};
    ${({size}) => size && typeof size === 'string' ? size : css`font-size: var(--fnt-size-${size})`};
    ${({weight}) => weight && css`font-weight: var(--fnt-weight-${weight})`};
    display: inline-block;
    width: ${props => props.width};
    height: auto;
    text-align: ${props => props.align};
  }

  ${props => addLoadingEffectToStyleComponent(props.loading)};

  h1 {
    font-size: var(--fnt-size-6);
  }

  h2 {
    font-size: var(--fnt-size-5);
  }

  h3 {
    font-size: var(--fnt-size-4);
  }

  h4 {
    font-size: var(--fnt-size-3);
  }

  h5 {
    font-size: var(--fnt-size-2);
  }

  ${({size}) => size && css`
    h1, h2, h3, h4, h5, h6 {
      font-size: ${typeof size === 'string' ? size : `var(--fnt-size-${size})`};
    }
  `}

  ${props => props.loading && css`
    h1 {
      width: 90%;
      min-width: 100px;
      height: var(--fnt-size-6);
    }

    h2 {
      width: 60%;
      min-width: 60px;
      height: var(--fnt-size-5);
    }

    h3 {
      width: 40%;
      min-width: 50px;
      height: var(--fnt-size-4);
    }

    h4 {
      width: 30%;
      min-width: 45px;
      height: var(--fnt-size-3);
    }

    h5 {
      width: 25%;
      min-width: 40px;
      height: var(--fnt-size-2);
    }

    h6 {
      width: 15%;
      min-width: 30px;
      height: var(--fnt-size-1);
    }

    h1, h2, h3, h4, h5, h6 {
      ${props.color && css`
        color: var(--clr-${props.color});
      `}
      ${props.loadingWidth && css`
        min-width: ${props.loadingWidth}px;
      `}
    }
  `}
}
`

export const Label: FC<IProps> = ({
                                      level = 3,
                                      loading: loadingStatus = false,
                                      label,
                                      type = 'primary',
                                      color = 'primary',
                                      loadingWidth,
                                      size,
                                      weight = 'regular',
                                      ...props
                                  }) => {
    const loading = loadingStatus ?? !label
    let LabelEl: keyof JSX.IntrinsicElements = `h${level}`
    return  <div className={s.loading} data-loading={loading}>
        <LabelWrapper loading={loading}
                      t={type}
                      clr={color}
                      level={level}
                      loadingWidth={loadingWidth}
                      size={size}
                      weight={weight}
                      {...props}
        >
            <LabelEl>
                {!loading && label}
            </LabelEl>
        </LabelWrapper>
    </div>
}