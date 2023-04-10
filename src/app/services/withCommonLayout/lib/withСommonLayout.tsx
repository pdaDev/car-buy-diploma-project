import {ComponentType, FC} from "react";
import {selectors} from '../model'
import {useAppSelector} from "../../index";
import {Header} from "../../../../widgets/Header";
import {Footer} from "../../../../widgets/Footer";
import {Stack, Container as UIContainer} from "../../../../shared";
import {NotificationModule} from "../../../../widgets/Notification/ui/NotificationModule";

export const withCommonLayout = (Component: ComponentType) => {
    const Container: FC = () => {
        const { showHeaderStatus, showFooterStatus, transparentHeader } = useAppSelector(selectors.selectData)
        return <>
            <Stack direction={'column'} size={'container'}>
                <NotificationModule position={'rightBottom'}/>
                { showHeaderStatus && <Header transparent={transparentHeader} /> }
                <UIContainer mt={5} size={'container'} contentAlign={"top-middle"}>
                    <Stack vAlign={'start'} hAlign={'center'} size={'container'}>
                        <Component />
                    </Stack>
                </UIContainer>
                { showFooterStatus && <Footer /> }
            </Stack>
        </>
    }
    return Container
}