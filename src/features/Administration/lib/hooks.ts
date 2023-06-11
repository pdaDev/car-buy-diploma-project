import {useRef, useState} from "react";
import * as NS from '../namespace'
import {F} from "@storybook/react-webpack5/dist/types-6a41b796";
import {useAppDispatch} from "app/services";
import {openModal} from "app/services/withPopupProvider";
import {useDeleteCarDataMutation} from "../api";
import {object} from "prop-types";

export const useSearchQuery = () => {
    const [query, setQuery] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState<string | null>(null)
    const timer = useRef(-1)
    const resetQuery = () => {
        setSearchQuery(null)
        setQuery(null)
    }

    const changeQuery = (v: string) => {
        setQuery(v)
        clearTimeout(timer.current)
        timer.current = setTimeout(() => setSearchQuery(v) , 250) as any
    }

    return {
        query,
        setQuery: changeQuery,
        searchQuery,
        resetQuery
    }
}

type UseFormOpenStatusOutcome = [status: boolean, type: NS.FormType | null, close: Function, open: (v: NS.FormType) => void]
export const useFormOpenStatus = (): UseFormOpenStatusOutcome => {
    const [formStatus, setFormStatus] = useState<NS.FormType | null>(null)
    const openStatus = !!formStatus

    const close = () => setFormStatus(null)
    return [openStatus, formStatus, close, setFormStatus]

}

export function useDeleteEntity(url: string) {
    const d = useAppDispatch()
    const [deletdeData] = useDeleteCarDataMutation()
    const deleteEntity = async (id: number) => {
        deletdeData({ id, url })
    }
   return (id: number) => {
        d(openModal({
            key: 'confirm', payload: {
                index: 'delete_admin',
                onConfirm: () => deleteEntity(id)
            }
        }))
    }
}