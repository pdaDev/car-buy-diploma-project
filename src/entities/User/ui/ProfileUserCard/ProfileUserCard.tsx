import {FC, ReactNode} from "react";
import {
    Box,
    Container,
    formatPhoneNumber,
    getTranslationIndexCreator,
    Label,
    Stack,
    Symbol,
    UserNickname
} from "../../../../shared";
import {ProfileAvatar} from "../ProfileAvatar/ProfileAvatar";
import * as NS from '../../namespace'
import {useTranslation} from "react-i18next";
import {TextWithLabel} from "./TextWithLabel";
import {PhoneNumberBlock} from "../../../../features/OperateWithAdvertisement/ui/ContactsWithOwner/PhoneNumberBlock";
import {SelectGeoLocationModal} from "../../../../features/SelectGeoLocation/ui/SelectGeoLocationModal";
import {SelectPersonalGeoLocation} from "../../../../features/SelectGeoLocation/ui/SelectProfileLocation";

type Props = {
    type: "owner" | 'another'
    editButton?: ReactNode
    children?: ReactNode
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
                                               children,
                                           }) => {

    const regDate = registerDate ? new Date(registerDate).toLocaleDateString() : null
    const isMyCard = type === 'owner'
    return <Box background={'secondary'} shadow={2} brd={2}>
        <Container p={4}>
            <Stack direction={'row'} size={'width'} spacing={4}>
              <Container max_w={'250px'}>
                  <ProfileAvatar avatar={avatar}/>
              </Container>
                <Stack vAlign={'start'} size={'width'} spacing={4}>
                    <Label label={`${secondName} ${firstName}`}
                           level={2} weight={'medium'}
                           size={5}/>
                    <TextWithLabel value={email}
                                   translationIndex={'email'}
                    />
                    <TextWithLabel value={regDate}
                                   translationIndex={"register_date"}/>
                    {isMyCard ? <TextWithLabel value={phoneNumber ? formatPhoneNumber(phoneNumber) : null}
                                               translationIndex={'phone_number'}
                    /> : <PhoneNumberBlock phoneNumber={phoneNumber}/>}
                    {isMyCard && <SelectPersonalGeoLocation/>}
                    { children }
                </Stack>
            </Stack>
            {editButton && <Container size={'content'} p={3} position={"top-right"}>
                {editButton}
            </Container>}
        </Container>
    </Box>
}