import * as NS from 'features/Test/namespace'
import {arrayUnion, doc, getDoc, setDoc, Timestamp, updateDoc} from "firebase/firestore";
import {db} from "../../../entities/Chat";

const LS_KEY = 'saved_tests'
const FB_DOC_PATH = "user_test_results"
type UserId = number | null
export const getResults = async (userId: UserId) => {
    if (userId) {
        const docRef = doc(db, FB_DOC_PATH, userId.toString());
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.get('savings') as NS.ISavedTestResult[]
        } else {
            return []
        }
    } else {
        const data = localStorage.getItem(LS_KEY)
        return data ? JSON.parse(data) as NS.ISavedTestResult[] : []
    }

}

export const saveResults = async (userId: UserId, payload: NS.TestPayload) => {
    if (userId) {
        const docRef = doc(db, FB_DOC_PATH, userId.toString());
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const savings = docSnap.get('savings') as NS.ISavedTestResult[]
            await updateDoc(docRef, {
                savings: arrayUnion({
                    id: (savings[savings.length - 1]?.id || 0) + 1,
                    date: Date.now(),
                    results: payload
                } as NS.ISavedTestResult)
            })
        } else {
            await setDoc(docRef, {
                userId,
                savings: [{
                    id: 1,
                    results: payload,
                    date: Date.now()
                } as NS.ISavedTestResult]
            })
        }
    } else {
        const data = localStorage.getItem(LS_KEY)
        const parsed = data ? JSON.parse(data) as NS.ISavedTestResult[] : []
        localStorage.setItem(LS_KEY, JSON.stringify([...parsed, {
            id: (parsed[parsed.length - 1]?.id || 0) + 1,
            date: Date.now(),
            results: payload,
        }]))
    }
}

export const deleteTestResults = async (userId: UserId, id: number) => {
    if (userId) {
        const docRef = doc(db, FB_DOC_PATH, userId.toString());
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const savings = docSnap.get('savings') as NS.ISavedTestResult[]
            await updateDoc(docRef, {
                savings: savings.filter(r => r.id !== id)
            })
        }
    } else {
        const data = localStorage.getItem(LS_KEY)
        const parsed = data ? JSON.parse(data) as NS.ISavedTestResult[] : []
        localStorage.setItem(LS_KEY, JSON.stringify(parsed.filter(r => r.id !== id)))
    }
}

export const clearTestResults = async (userId: UserId) => {
    if (userId) {
        const docRef = doc(db, FB_DOC_PATH, userId.toString());
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            await updateDoc(docRef, {
                savings: []
            })
        }
    } else {
        localStorage.removeItem(LS_KEY)
    }
}