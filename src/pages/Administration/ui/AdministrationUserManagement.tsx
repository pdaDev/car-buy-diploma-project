import {FC} from "react";
import {UserAdministrationForm} from "features/Administration/ui/UserAdministration/UserAdministrationForm";
import {Container, Stack, useTabTile} from "shared";
import {BackButton} from "./BackButton";
import {useTranslation} from "react-i18next";

export const AdministrationUserManagement: FC = () => {
    // useNavigationPermission(['admin'])
    const { t } = useTranslation()
    useTabTile(t("pages.user_management"))
    return (
        <Container max_w={'1000px'}>
            <Stack size={'container'} spacing={3}>
                <BackButton/>
                <UserAdministrationForm/>
            </Stack>
        </Container>
    )
}