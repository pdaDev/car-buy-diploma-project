import {FC, MouseEventHandler, ReactNode} from "react";
import {Box, Container, Stack} from "../Layout";
import {Button} from "../Buttons";
import {Text} from "../Text/Text";
import {Label} from "../Label/Label";

interface IProps {
    handleAction?: Function
    message?: string
    children?: ReactNode
    buttonLabel?: string
    fullWidth?: boolean
    title?: string
    fullHeight?: boolean
    withTopMargin?: boolean
    withoutShadow?: boolean
}

export const MotivationBlock: FC<IProps> = ({
                                                handleAction,
                                                children,
                                                message,
                                                buttonLabel,
                                                withTopMargin = true,
                                                title,
                                                fullWidth,
                                                fullHeight,
                                                withoutShadow,
                                            }) => {
    return <Container size={fullHeight ? 'container' : 'width'} mt={withTopMargin ? 6 : undefined}
                      max_w={fullWidth ? undefined : "480px"}>
        <Box background={'secondary'} brd={2} shadow={withoutShadow ? undefined : 2}>
            <Container p={4}>
                <Stack spacing={4} size={'container'}>
                    <Stack spacing={4} size={'width'}>
                        {title && <Label label={title} level={2} weight={'medium'}/>}
                        {children || <Text content={message}
                                           align={'center'}
                                           size={3}
                                           weight={'regular'}/>}
                    </Stack>
                    {handleAction && <Button type={'primary'}
                                             size={'medium'}
                                             label={buttonLabel}
                                             onClick={handleAction as MouseEventHandler}/>}
                </Stack>
            </Container>
        </Box>
    </Container>
}