import {FC} from "react";
import {Box, Container, Label, Stack, UserNickname} from "../../../../shared";
import {ProfileAvatar} from "../ProfileAvatar/ProfileAvatar";
import * as NS from '../../namespace'

type Props = {
    type: "owner" | 'another'
} & NS.IUserData['data']

export const ProfileUserCard: FC<Props> = ({
                                               type,
                                               phoneNumber,
                                               avatar,
                                               firstName,
                                               secondName,
                                               email
                                           }) => {
    return <Container max_w={"700px"} max_h={"256px"}>
        <Box background={'secondary'} shadow={1} brd={2}>
            <Container p={4}>
                <Stack direction={'row'} spacing={4}>
                    <ProfileAvatar avatar={avatar}/>
                    <Stack vAlign={'start'} spacing={4}>
                        <UserNickname first_name={firstName}
                                      last_name={secondName}
                                      type={'full'}
                        />
                        <Label label={phoneNumber}/>
                        <Label label={email}/>
                    </Stack>
                </Stack>
            </Container>
        </Box>
    </Container>
}