import {FC} from 'react'

import {IOption, Label, Switcher, Selector} from "shared";
import {setTheme, useAppDispatch, selectCurrentTheme, useAppSelector, selectLanguage, setLanguage} from 'app/services'

import s from './UISettings.module.scss'
import {CSSTransition} from "react-transition-group";

interface IProps {
    isOpen?: boolean
}



export const UISettings: FC<IProps> = ({
    isOpen = true
                                       }) => {
    const d = useAppDispatch()
    const themesOptions: IOption[] = [
        { value: 'light', label: 'светлая' },
        { value: 'dark', label: 'темная' },
        { value: 'auto', label: 'системная' }
    ]

    const languageOptions: IOption[] = [
        { value: 'ru', label: 'русский' },
        { value: 'eng', label: 'английский' },
        { value: 'auto', label: 'системный' }
    ]

    const currentTheme = useAppSelector(selectCurrentTheme)
    const currentLanguage = useAppSelector(selectLanguage)
    const onLanguageChange = (lang: any) => d(setLanguage(lang))
    const onThemeChange = (theme: any) => d(setTheme(theme))

    return <CSSTransition in={isOpen}
                          timeout={300}
                          unmountOnExit
                          classNames={{
                              enter: s.enter,
                              enterActive: s.enter_active,
                              enterDone: s.enter_active,
                              exit: s.enter_active,
                              exitActive: s.exit_active,
                              exitDone: s.exit_active
                          }}
    >
        <div className={s.ui_settings}>
          <div className={s.setting_content}>
              <div className={s.setting_option}>
                  <Label label={'Тема'} />
                  <Switcher options={themesOptions}
                            onChange={onThemeChange}
                            activeOptions={currentTheme}
                  />
              </div>
              <div className={s.setting_option}>
                  <Label label={'Язык'} />
                  <Selector options={languageOptions}
                            current={currentLanguage}
                            onChange={onLanguageChange}
                            countOfVisibleOptions={3}
                  />
              </div>
          </div>
        </div>
    </CSSTransition>
}
