import {FC} from "react";
import {Button, Card, Container, Label, Stack, Symbol, useOpenStatus, UserNickname} from "shared";
import * as NS from '../../namespace'
import s from './UserAdministration.module.scss'
import {useTranslation} from "react-i18next";
import {ProfileUserCard} from "entities/User/ui/ProfileUserCard/ProfileUserCard";
import {AdvertisementCount} from "./AdvertisementCount";
import {useAppNavigate} from "app/services";
import {useStartChat} from "entities/Chat";

interface IProps {
    data: null | NS.IAdminServerUser
    loading: boolean
    onUserPatch: Function
}

export const UserCard: FC<IProps> = ({ data, loading, onUserPatch }) => {
    const [open, ,toggleOpen] = useOpenStatus()
    const { t } = useTranslation()
    const isBanned = data?.is_banned === 1
    const switchBanStatus = () => {
        if (data) {
            onUserPatch(isBanned ? 0 : 1, data.id)
        }
    }
    const n = useAppNavigate()
    const goToUserPage = () => n(p => p.user._key_(data?.id))
    const startChat = useStartChat('admin', data || { id: -1, avatar: null, first_name: 'null', last_name: 'null' } )

    return <Stack size={'width'} spacing={4}>
        <Card width={'100%'} height={'auto'}
              paddings={[3, 4]}
              onClick={toggleOpen}>
            <Stack vAlign={'center'} size={'width'} spacing={4} direction={'row'}>
                <Container mt={2} mb={2} contentAlign={'middle-left'}>
                    <UserNickname first_name={data?.first_name}
                                  last_name={data?.last_name}
                                  type={'full'}
                                  loading={loading} />
                </Container>
                <Stack direction={'row'} vAlign={'center'} hAlign={'end'} spacing={3} size={'width'}>
                    <Symbol size={3} content={t('admin.user_management.total_ads')} />
                    <Symbol  size={3} content={data?.total_ads || 0} color={'primary'}/>
                </Stack>
                { data?.is_banned === 1 && <div className={s.banned}>
                    <Label label={t('user.banned')}  level={4}/>
                </div> }
            </Stack>
        </Card>
        { open && data && <Stack spacing={4} size={'width'}>

            <ProfileUserCard type={'another'}
                             firstName={data?.first_name}
                             secondName={data?.last_name}
                             email={data?.email}
                             avatar={data?.avatar}
                             registerDate={data?.date_joined}
                             phoneNumber={data?.phone_number}
            >
               <Stack direction={'row'} spacing={4} hAlign={'start'} size={'width'}>
                   <Button type={isBanned ? 'secondary' : 'delete'}
                           width={'full'}
                           label={isBanned ? 'разбанить' : 'забанить'}
                           onClick={switchBanStatus} />
                   <Button type={'primary'}
                           width={'full'}
                           label={t('admin.user_management.write_message') as string}
                           onClick={startChat.navigate}
                   />
               </Stack>
                <Button type={'underline'}
                        label={t('admin.user_management.go_to_user_page') as string}
                        onClick={goToUserPage}
                />
            </ProfileUserCard>
            <AdvertisementCount total={data.total_ads}
                                opened={data.opened_ads}
                                booked={data.booked_ads}
                                closed={data.closed_ads}
                                />

        </Stack> }
    </Stack>
}