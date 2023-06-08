import {useAppDispatch, useAppNavigate, useAppSelector} from "../../../app/services";
import {selectUserId} from "../../../entities/User/model/selectors";
import {clearTestResults, deleteTestResults, getResults, saveResults} from "../api/savedResultsAPI";
import * as NS from '../namespace'
import {reduxDeleteResult, reduxSaveResult, reduxSetResults} from "../model/slice";
import {useAuthorize} from "../../../entities/User/lib/hooks";

export const useTestStart = () => {
    const n = useAppNavigate()
    return () => n(p => p.test)
}

export const useTestResults = () => {
    const {authStatus, userId: id} = useAuthorize()
    const userId = authStatus ? id : null
    const d = useAppDispatch()

    const deleteTestResult = async (id: number) => {
        d(reduxDeleteResult(id))
        try {
            await deleteTestResults(userId, id)
        } catch (e) {
            d(reduxSaveResult(id))
        }

    }

    const saveTestResults = async (data: NS.TestPayload) => {
        d(reduxSaveResult(-10))
        try {
            await saveResults(userId, data)
        } catch (e) {
            d(reduxDeleteResult(-10))
        }

    }
    const getTestResults = async () => {
        const response = await getResults(userId)
        d(reduxSetResults(response.map(r => r.id)))
        return response as NS.ISavedTestResult[]
    }

    const clearResults = async () => {
        await clearTestResults(userId)
        d(reduxSetResults([]))
    }

    return {deleteTestResult, saveTestResults, getTestResults, clearResults}
}
