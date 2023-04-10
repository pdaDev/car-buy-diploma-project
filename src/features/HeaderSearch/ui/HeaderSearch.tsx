import {FC} from "react";

import s from './HeaderSearch.module.scss'
import {Selector} from "../../../shared/ui/Selector/Selector";
interface IProps {

}

export const HeaderSearch: FC<IProps> = () => {
    return <div className={s.search}>
        <Selector options={[{ value: '', label: '' }]}
                  current={''}
                  onChange={()=>{}}
                  withSearch
                  countOfVisibleOptions={10}/>

    </div>
}