import {FC} from "react";
import {useAppNavigate, useAppSelector} from "../../../../app/services";
import {Button} from "../../../../shared";
import Icon from "@mdi/react";
import {mdiCarSearch} from "@mdi/js/commonjs/mdi";
import {selectSavedResultsId} from "../../model/selectors";
import s from './TestResultsButton.module.scss'


export const TestResultsButton: FC = () => {
    const n = useAppNavigate()
    const goToTestResults = () => n(p => p.saved_tests)
    const testResultsCount = useAppSelector(selectSavedResultsId).length
    return <div className={s.button_wrapper} onClick={goToTestResults}>
        <Icon path={mdiCarSearch} size={0.8}/>
        { testResultsCount > 0 && <div className={s.counter}>
            { testResultsCount }
        </div> }
    </div>
}