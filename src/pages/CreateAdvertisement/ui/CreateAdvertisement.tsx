import {FC} from "react";
import {AdvertisementForm} from "widgets/AdvertisementCreateForm";
import {useCreateAdvertisementMutation} from 'entities/Advertisement'
import {useAppNavigate} from "app/services";
import {useTranslation} from "react-i18next";
import {getTranslationIndexCreator, useNavigationPermission, useTabTile, MotivationBlock} from "shared";
import {useAuthorize} from "entities/User/lib/hooks";

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