import {FC, MouseEventHandler, ReactNode} from "react";
import {Box, Container, Stack} from "../Layout";
import {Button} from "../Buttons";
import {Text} from "../Text/Text";

interface IProps {
    handleAction: Function
    message?: string
    children?: ReactNode
    buttonLabel: string
}

export const MotivationBlock: FC<IProps> = ({
                                                handleAction,
                                                children,
                                                message,
                                                buttonLabel
                                            }) => {
    return <Container size={'content'} mt={6} max_w={"480px"}>
        <Box background={'secondary'} brd={2} shadow={1}>
            <Container p={4}>
                <Stack spacing={3}>
                    {children || <Text content={message} align={'center'} />}
                    <Button type={'primary'}
                            size={'medium'}
                            label={buttonLabel}
                            onClick={handleAction as MouseEventHandler}/>
                </Stack>
            </Container>
        </Box>
    </Container>
}