import {FC, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../app/services";
import { getAnotherUserProfileData, selectors } from 'entities/User'
import {useParams} from "react-router-dom";
import {ProfileUserCard} from "../../../entities/User/ui/ProfileUserCard/ProfileUserCard";
export const UserProfile: FC = () => {
    const d = useAppDispatch()
    const { id } = useParams()
    const data = useAppSelector(selectors.selectAnotherUserData)
    console.log( data)
    useEffect(() => {
        if (id) {
            // @ts-ignore
            d(getAnotherUserProfileData(id as any))
        }
    },[id])
    // @ts-ignore
    return <ProfileUserCard  type={'another'} {...data}/>
}
