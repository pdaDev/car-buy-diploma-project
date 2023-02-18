import React, {FC, useEffect, useState} from "react";
import {IHandbookItem, IEngine, Table, Button} from '../shared'
import {Column} from "../shared/ui/Table/Table";
import axios from "axios";
export const App: FC = () => {
    const [engineTypes, setEngineType] = useState<IHandbookItem>()
    const [engine, setConcreteEngine] = useState<IEngine | null>(null)

    const [engines, setEngines] = useState<IEngine[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string>('')

    const back = () => setConcreteEngine(null)
    const columns: Column<IEngine>[] = [
        { accessor: 'name', header: 'название', onClickAction: (engine: IEngine) => setConcreteEngine(engine) },
        { accessor: 'horse_power', header: 'л.с.' },
        { accessor: 'volume', header: 'объем' }
    ]
    useEffect( () => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const engines = await axios.get<IEngine[]>('http://127.0.0.1:8000/api/engines/').then(data => data.data)
                setLoading(false)
                setEngines(engines)
            } catch (e) {
                setError('Упс, что-то пошло не так!!!')
            }
        }
        fetchData().then()

    }, [])

    const getLine = (header: string, value: string | number) => <h5>{`${header}: ${value}`}</h5>

    return <>
        <h1>
            Двигатели
        </h1>
        {
            engine &&  <Button label="Назад" handleClick={back} />
        }
        <h3>
            { engine ? engine.name : 'Все двигатели'}
        </h3>
        {
            loading ? '...loading' : error ? error : engine ? <div>
                { getLine('объем', engine.volume) }
                { getLine('л.с', engine.horse_power) }
                { getLine('количество сцепленйи', engine.torgue) }
                { getLine('Тип двигателя', engine.type || '' ) }
                { getLine('Топливо', engine.fuel_type || '') }
                </div>
                : <Table<IEngine> data={engines} columns={columns}/>
        }
    </>
}