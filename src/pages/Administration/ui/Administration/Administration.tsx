import {FC} from "react";
import {
    Button,
    Card,
    Container,
    getTranslationIndexCreator,
    Grid,
    Label,
    Stack,
    useNavigationPermission, useTabTile
} from "../../../../shared";
import {useTranslation} from "react-i18next";
import {useAppNavigate} from "../../../../app/services";
import Icon from "@mdi/react";
import {NavigationCard} from "./NavigationCard";
import {mdiAccountMultiple, mdiDatabaseEdit} from "@mdi/js/commonjs/mdi";


export const Administration: FC =  () => {
    const { t } = useTranslation()
    useTabTile(t("pages.administration"))
    const n = useAppNavigate()
    useNavigationPermission(['admin'])
    const goToDataManagement = () => n(p => p.administration.dataOperation)
    const goToUserManagement = () => n(p => p.administration.userManagement)
    const getIndex = getTranslationIndexCreator('admin')
    return <Container max_w={'800px'} min_h={'100%'}>

            <Stack size={'container'} spacing={5} vAlign={'start'}>
                <Label label={t(getIndex('label'))} level={1} weight={'medium'}/>
                <Grid container cols={2} gap={4}>
                    <NavigationCard onClick={goToDataManagement}
                                    label={t(getIndex('data_management.label.data'))}
                                    icon={mdiDatabaseEdit}
                    />
                    <NavigationCard onClick={goToUserManagement}
                                    label={t(getIndex('user_management.label'))}
                                    icon={mdiAccountMultiple}
                    />
                </Grid>
            </Stack>
    </Container>
}