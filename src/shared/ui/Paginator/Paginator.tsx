import {FC} from 'react'

import './Paginator.scss'
import {Stack} from "../Layout";
import {Button} from "../Buttons";
import {Selector} from "../Selector/Selector";
import {IOption} from "../../types";
import {cn} from "../../lib";
import Icon from "@mdi/react";
import {mdiArrowLeft, mdiArrowRight} from "@mdi/js/commonjs/mdi";
import {Page} from "./Page";

interface IProps {
    page: number
    setPage: (p: number | ((p: number) => number)) => void
    count: number
}

export const Paginator: FC<IProps> = ({
                                          count,
                                          setPage,
                                          page,
                                      }) => {

    const countArray = [...new Array(count)]
    const radius = 2
    let countOfVisiblePages = 1 + radius * 2
    let startVisiblePage = Math.max(1, page - radius)
    let endVisiblePage = startVisiblePage + countOfVisiblePages
    startVisiblePage = endVisiblePage > count - 1 ? Math.max(1, startVisiblePage - (endVisiblePage - (count - 2))) : startVisiblePage
    endVisiblePage = Math.min(endVisiblePage, count - 1)
    countOfVisiblePages = Math.min(countOfVisiblePages, endVisiblePage - startVisiblePage)

    const options = countArray.map((_, i) => ({
        value: i,
        label: (i + 1).toString()
    } as IOption))


    const pagesForRender = [...new Array(countOfVisiblePages)].map((_, i) => i + startVisiblePage)

    console.log(pagesForRender, endVisiblePage, startVisiblePage, count)

    return <Stack direction={'row'} vAlign={'center'}
                  hAlign={'start'}
                  size={'content'}
                  spacing={3}>
        <Button type={'primary'}
                withRippleEffect={false}
                classNamePrefix={'paginator'}
                disabled={page === 0}
                onClick={() => setPage(p => p - 1)}
        >
            <Icon path={mdiArrowLeft} size={20}/>
        </Button>
        <Page page={0}
              setPage={setPage}
              active={page === 0}/>
        {pagesForRender.map(i => <Page setPage={setPage}
                                        page={i}
                                        active={page === i}  />)}
        <Page page={count - 1}
              setPage={setPage}
              active={page === count - 1}/>
        <Button type={'primary'}
                withRippleEffect={false}
                classNamePrefix={'paginator'}
                disabled={page === count}
                onClick={() => setPage(p => p + 1)}
        >
            <Icon path={mdiArrowRight} size={30} />
        </Button>

        <Selector options={options}
                  current={page}
                  classNamePrefix={'paginator'}
                  onChange={setPage}
        />
    </Stack>
}
