import {FC, ReactNode} from "react";
import {
    ICarNameWithId,
    IUserCommonData, Label,
    Stack,
    UserAvatar,
    UserNickname
} from "shared";
import s from './ChatCard.module.scss'
import Icon from "@mdi/react";
import {mdiFaceAgent} from "@mdi/js/commonjs/mdi";
import {useTranslation} from "react-i18next";
import {Timestamp} from "firebase/firestore";


interface IProps {
    user: IUserCommonData | undefined
    car: ICarNameWithId | undefined
    date?: string
    children?: ReactNode
    message?: {
        date: Timestamp
        text: string
        senderId: number
    }
    withSupport: boolean

}

export const ChatLabel: FC<IProps> = ({user, car, message, withSupport, children}) => {

    const carLabel = car ?  `${car.brend.name} ${car.model.name}` : null
    const { t } = useTranslation()
    return (
        <Stack direction={'row'} spacing={3} vAlign={'center'} hAlign={'start'} size={'width'}>
          <div className={s.user_wrapper}>
              {!withSupport ? user && <UserAvatar avatar={user.avatar}/> : <Icon path={mdiFaceAgent} size={1}/>}
          </div>
            <Stack spacing={2} size={'width'}>
                <Stack direction={'row'} spacing={3} vAlign={'center'} size={'container'}>
                    <Stack direction={'row'} spacing={3} hAlign={'start'} vAlign={'center'}>
                        {!withSupport ? user && <UserNickname first_name={user.first_name}
                                               last_name={user.last_name}
                                               type={'with-short-last-name'}
                        /> : <Label label={t("chat.support_agent")}
                                    level={3}
                                    weight={'medium'}
                        />}
                        { car && !withSupport && <div className={s.car_wrapper}>
                            { carLabel }
                        </div> }
                    </Stack>
                    { children }
                </Stack>
                { message && <Stack direction={'row'} spacing={3} size={'content'} hAlign={'start'} vAlign={'center'}>
                    { message.senderId === user?.id &&  <Label label={`${user?.first_name}:`} level={4} type={'secondary'}/> }
                    <p className={s.text}>
                        { message.text }
                    </p>
                </Stack> }

            </Stack>
        </Stack>
)
}