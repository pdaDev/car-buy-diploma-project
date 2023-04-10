import { FC } from 'react'
import s from './ErrorBoundary.module.scss';

interface IProps {
    code: string | number
    message: string
}

export const ErrorBoundary: FC<IProps> = ({
    code,
    message
}) => {
    return <div className={s.error_boundary}>
        <div className={s.code_wrapper}>
            { code }
        </div>
        <div className={s.message_wrapper}>
            { message }
        </div>
    </div>
}
