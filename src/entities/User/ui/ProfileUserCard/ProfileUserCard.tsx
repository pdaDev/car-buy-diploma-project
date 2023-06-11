import {FC, ReactNode} from "react";
import {
    Box,
    Container,
    formatPhoneNumber,
    Label,
    Stack,
} from "shared";
import {ProfileAvatar} from "../ProfileAvatar/ProfileAvatar";
import * as NS from '../../namespace'
import {TextWithLabel} from "./TextWithLabel";
import {PhoneNumberBlock} from "features/OperateWithAdvertisement/ui/ContactsWithOwner/PhoneNumberBlock";
import {SelectPersonalGeoLocation} from "features/SelectGeoLocation/ui/SelectProfileLocation";

type Props = {
    type: "owner" | 'another'
    editButton?: ReactNode
    children?: ReactNode
    loading?: boolean
} & NS.IUserData

export const ProfileUserCard: FC<Props> = ({
                                               type,
                                               phoneNumber,
                                               avatar,
                                               firstName,
                                               secondName,
                                               email,
                                               registerDate,
                                               editButton,
                                               loading,
                                               children,
                                           }) => {

    const regDate = registerDate ? new Date(registerDate).toLocaleDateString() : null
    const isMyCard = type === 'owner'
    return <Box background={'secondary'} shadow={2} brd={2}>
        <Container p={4}>
            <Stack direction={'row'} size={'width'} spacing={4}>
                <Container max_w={'250px'}>
                    <ProfileAvatar avatar={avatar}
                                   loading={loading}/>
                </Container>
                <Stack vAlign={'start'} size={'width'} spacing={4}>
                    <Label label={`${secondName} ${firstName}`}
                           level={2} weight={'medium'}
                           loading={loading}
                           loadingWidth={280}
                           size={5}/>
                    <TextWithLabel value={email}
                                   loading={loading}
                                   translationIndex={'email'}
                    />
                    <TextWithLabel value={regDate}
                                   loading={loading}
                                   translationIndex={"register_date"}/>
                    {isMyCard ? <TextWithLabel value={phoneNumber ? formatPhoneNumber(phoneNumber) : null}
                                               loading={loading}
                                               translationIndex={'phone_number'}
                    /> : <PhoneNumberBlock phoneNumber={phoneNumber}/>}
                    {isMyCard && <SelectPersonalGeoLocation/>}
                    {children}
                </Stack>
            </Stack>
            {editButton && <Container size={'content'} p={3} position={"top-right"}>
                {editButton}
            </Container>}
        </Container>
    </Box>
}