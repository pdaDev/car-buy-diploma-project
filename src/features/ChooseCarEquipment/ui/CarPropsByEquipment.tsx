import {FC} from "react";
import {Selector} from "../../../shared/ui/Selector/Selector";
import {CarPropBlock, NS} from 'entities/Car'
import {Box, Container, createOptions, Stack} from "../../../shared";

interface IProps {
    carProps: NS.IServerCarProps
    equipments: NS.IServerCarEquipment[]
}

export const CarPropsByEquipment: FC<IProps> = ({
                                                    equipments,
                                                    carProps
                                                }) => {
    const equipmentsOption = createOptions(equipments, 'id', 'name')
    return <Box mw={1}>
        <Container p={3}>
            <Stack direction={'row'} hAlign={'end'}>
                <Selector options={equipmentsOption}
                          current={null}
                          onChange={() => {}}
                />
            </Stack>
            <CarPropBlock {...carProps}/>
        </Container>

    </Box>
}