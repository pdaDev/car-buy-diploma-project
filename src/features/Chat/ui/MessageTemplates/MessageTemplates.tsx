import {FC} from "react";
import {useTranslation} from "react-i18next";
import s from './MessageTemplates.module.scss'

interface IProps {
    setMessage: (m: string) => void
    templates: string[]
}
export const MessageTemplates: FC<IProps> = ({ setMessage, templates }) => {
    const { t } = useTranslation()
    return <div className={s.message_templates_wrapper}>
        { templates.map(template => {
            const setTemplate = () => setMessage(t(`chat.message_templates.${template}.message`))
            return <div key={template} className={s.template} onClick={setTemplate}>
                { t(`chat.message_templates.${template}.title`) }
            </div>
        }) }
    </div>
}