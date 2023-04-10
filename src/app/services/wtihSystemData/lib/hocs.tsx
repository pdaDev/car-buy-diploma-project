import React, {Component, ComponentType, FC, useEffect} from "react";
import {useTranslation} from "react-i18next";
import * as NS from '../namespace'
import {getCurrentTheme, getLanguage, setTheme, setAutoLanguage, removeAutoLanguage} from "../api";
import {StateType, useAppDispatch, useAppSelector} from "../../withStore";
import {selectCurrentTheme, setLanguage, setTheme as setReduxTheme} from "../model";
import {connect} from "react-redux";
import * as s from '../model/selectors'

interface IProps {
    theme: NS.Theme;
    setReduxTheme: Function
}

export const withThemeProvider = (Component: ComponentType) => {
    class Container extends React.Component<IProps> {
        componentDidMount() {
            const currentTheme = getCurrentTheme()
            document.body.setAttribute('data-theme', currentTheme)
            this.props.setReduxTheme(currentTheme)

        }

        componentDidUpdate(prevProps: IProps) {
            const {theme} = this.props

            if (prevProps.theme !== theme) {
                setTheme(theme)
                document.body.setAttribute('data-theme', theme)
            }
        }

        render() {
            const {theme, setReduxTheme, ...props} = this.props
            return <Component {...props} />;
        }
    }

    const mapState = (state: StateType) => ({
        theme: selectCurrentTheme(state)
    })

    const mapDispatch = {
        setReduxTheme
    }

    return connect(mapState, mapDispatch)(Container)
}

export const withErrorDispatcher = (Component: ComponentType) => {
    const Container: FC = (props) => {
        const fatalError = useAppSelector(s.selectFatalError)
        useEffect(() => {
            if (fatalError) {
                throw new Error(fatalError as any)
            }
        }, [fatalError])
        return <Component {...props} />
    }
    return Container
}

export const withLanguageProvider = (Component: ComponentType) => {
    const Container: FC = (props) => {
        const { i18n } = useTranslation()
        const lang = getLanguage()
        const stateLanguage = useAppSelector(s.selectLanguage)
        const d = useAppDispatch()
        useEffect(() => {
            d(setLanguage(lang || (i18n.language as NS.Language)))
        },[])

        useEffect(() => {
            if (stateLanguage) {

                const browserLang = navigator.language.split('-')[0]
                if (stateLanguage !== i18n.language) {
                  if (stateLanguage === 'auto') {
                      if (i18n.language !== browserLang) {
                          i18n.changeLanguage(browserLang)
                      }
                      if (!lang) {
                          setAutoLanguage()
                      }
                  } else {
                      i18n.changeLanguage(stateLanguage)
                      if (lang) {
                          removeAutoLanguage()
                      }
                  }
                }
            }
        }, [stateLanguage, i18n, lang])
        return <Component {...props} />
    }
    return Container
}