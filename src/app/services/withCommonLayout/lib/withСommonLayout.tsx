import {ComponentType, FC} from "react";
import {selectors} from '../model'
import {selectInitializedStatus, useAppSelector} from "../../index";
import {Header} from "../../../../widgets/Header";
import {Footer} from "../../../../widgets/Footer";
import {Stack, Container as UIContainer, Loader, Card} from "../../../../shared";
import {NotificationModule} from "../../../../widgets/Notification/ui/NotificationModule";
import {SideMenu} from "../../../../widgets/SideMenu";

export const withCommonLayout = (Component: ComponentType) => {
    const Container: FC = () => {
        const { showHeaderStatus, showFooterStatus, transparentHeader } = useAppSelector(selectors.selectData)
        const isInit = useAppSelector(selectInitializedStatus)
        if (!isInit) {
            return  <UIContainer contentAlign={'center'}>
                <Loader type={'circle'} size={'medium'}/>
            </UIContainer>
        }
        return <>
            <Stack direction={'column'} vAlign={'start'} size={'container'}>
                <NotificationModule position={'leftBottom'}/>
                <SideMenu/>
                { showHeaderStatus && <Header transparent={transparentHeader} /> }
                <UIContainer mt={transparentHeader ? '0' : 5} size={'content'} min-h={'100%'} h={'auto'} pb={5} contentAlign={"top-middle"}>
                    <Stack vAlign={'start'}
                           hAlign={'center'}
                           size={'container'}>
                        <Component />

                    </Stack>
                </UIContainer>
                { showFooterStatus && <Footer /> }
            </Stack>
        </>
    }
    return Container
}