import {FC} from "react";
import {AdvertisementForm} from "../../../widgets/AdvertisementCreateForm";
import {NS, useCreateAdvertisementMutation} from 'entities/Advertisement'
import {useAppDispatch, useAppNavigate, useAppSelector} from "../../../app/services";
import {selectors as userSelectors} from "../../../entities/User";
import {MotivationBlock} from "../../../shared/ui/MotivationBlock/MotivationBlock";
import {useTranslation} from "react-i18next";
import {openModal} from "../../../app/services/withPopupProvider";
import {getTranslationIndexCreator, useNavigationPermission, useTabTile} from "../../../shared";
import {useAuthorize} from "../../../entities/User/lib/hooks";

export const CreateAdvertisement: FC = () => {
    const [create, { isLoading: isCreateLoading }] = useCreateAdvertisementMutation()
    const n = useAppNavigate()
    useNavigationPermission(['authorized'])
    const { authStatus, authorize: login } = useAuthorize()
    const {t} = useTranslation()
    const motivateIndex = getTranslationIndexCreator('motivate.create_advertisement')
    useTabTile(t("pages.create_ad"))
    if (!authStatus) {
        return <MotivationBlock handleAction={login}
                                buttonLabel={t(motivateIndex('auth.button')) as string}
                                message={t(motivateIndex('auth.message')) as string}
        />
    }
    const createAdvertisement = async (data: FormData) => [
        await create(data).unwrap().then(id => n(p => p.advertisement._key_(id)))
    ]
    return <>
        <AdvertisementForm onSubmit={createAdvertisement}
                           loading={isCreateLoading}
                           mode={'create'}
        />
    </>

}