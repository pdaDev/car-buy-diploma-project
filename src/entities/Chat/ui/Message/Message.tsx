import {FC} from 'react'
import s from './Message.module.scss'
import {addPrefix, cn, Text} from "../../../../shared";


interface IProps {
    image: string | null
    message: string
    date: string
    type: 'me' | 'opponent'
}

export const Message: FC<IProps> = ({
                                        image,
                                        date,
                                        type = 'me',
                                        message
                                    }) => {
    return <div className={cn(s.message, addPrefix('type', type, s))}>
        <img/>
        <Text content={message}/>
        {date}
        <div className={s.check_marks_wrapper}>
            <div className={s.check_mark}>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                     width="20" height="20"
                     className={s.active_check_mark}
                     viewBox="0 0 48 48">
                    <path d="M 42.439453 9.4394531 L 16.5 35.378906 L 5.5605469 24.439453 A 1.50015 ">
                    </path>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                     width="20" height="20"
                     className={s.background_check_mark}
                     viewBox="0 0 48 48">
                    <path d="M 42.439453 9.4394531 L 16.5 35.378906 L 5.5605469 24.439453 A 1.50015 ">
                    </path>
                </svg>
            </div>
            <div className={cn(s.check_mark, s.second_mark)}>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                     width="20" height="20"
                     className={s.active_check_mark}
                     viewBox="0 0 48 48">
                    <path d="M 42.439453 9.4394531 L 16.5 35.378906 L 11.1210938 30">
                    </path>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                     width="20" height="20"
                     className={s.background_check_mark}
                     viewBox="0 0 48 48">
                    <path d="M 42.439453 9.4394531 L 16.5 35.378906 L 11.1210938 30">
                    </path>
                </svg>
            </div>
        </div>
    </div>


}
