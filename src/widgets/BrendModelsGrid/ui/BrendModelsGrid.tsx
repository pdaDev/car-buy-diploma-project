// @ts-nocheck
import {FC, memo, useMemo} from "react";
import {CarModelMiniCard, NS} from "../../../entities/Car";
import {addPrefix, cn, Grid} from "../../../shared";
import {useAppNavigate} from "../../../app/services";
import s from './BrendModelsGrid.module.scss'

interface IProps {
    data: NS.IServerBrend['models']
    loading: boolean
}

export const BrendModelsGrid: FC<IProps> = memo(({data, loading}) => {

    const advertisementsCountForModels = data ? data.map(model => model.advertisement_count) : []
    const maxCountAdvertisements = Math.max(...advertisementsCountForModels)
    const n = useAppNavigate()
    // const minCountAdvertisements = Math.min(...advertisementsCountForModels)

    const carsWithProperOrder = useMemo(() => {
        const getCardSize = (count: number): NS.ModelMiniCardSize => {
            if (count >= maxCountAdvertisements * 0.95) {
                return 'large'
            }
            if (count <= 0.6 * maxCountAdvertisements) {
                return 'small'
            }
            return 'medium'
        }


        const carModelsWithSize = data ? data.map(model => ({...model, size: getCardSize(model.advertisement_count)})) : []
        const filterCarModels = (key: NS.ModelMiniCardSize) => carModelsWithSize
            .filter(model => model.size === key)

        type CardWithSize = NS.IModelMiniCard & { size: NS.ModelMiniCardSize }
        type Pattern = 'small_medium' | 'medium_small' | 'small_medium_small' | 'medium' | 'large' | 'small' | 'small_one_line'
        const carsWithProperOrder: { pattern: Pattern, data: CardWithSize[] }[] = []


        class Cards {
            public data: CardWithSize[] = []
            public index: number = 0

            constructor(props: any) {
                this.data = props
            }

            public isFinished() {
                return this.index >= this.data.length
            }

            public getElements(count: number) {
                const maxElIndex = Math.min(this.index + count - 1, this.data.length)
                const set = this.data.filter((_, index) => index >= this.index && index <= maxElIndex)
                this.index += maxElIndex + 1
                return set
            }

            public getLessCount() {
                return this.data.length - this.index
            }
        }

        const SmallCards = new Cards(filterCarModels('small'))
        const MediumCards = new Cards(filterCarModels('medium'))
        const LargeCards = new Cards(filterCarModels('large'))
        let rowIndex = 0

        console.log(filterCarModels('small'), filterCarModels('large'), filterCarModels('medium'))

        while (!(SmallCards.isFinished() && LargeCards.isFinished() && MediumCards.isFinished())) {

            const availablePatterns: Pattern[] = []
            const countOfMediumCards = MediumCards.getLessCount()
            const countOfSmallCards = SmallCards.getLessCount()
            const countOfLargeCards = LargeCards.getLessCount()

            if (countOfMediumCards >= 1 && countOfSmallCards >= 4)
                availablePatterns.unshift('small_medium', 'medium_small', 'small_medium_small')
            if (countOfSmallCards >= 8)
                availablePatterns.unshift('small')
            if (countOfMediumCards >= 2)
                availablePatterns.unshift('medium')
            if (countOfLargeCards >= 1)
                availablePatterns.unshift('large')
            if (countOfSmallCards >= 4)
                availablePatterns.unshift('small_one_line')


            const currentPattern: Pattern = availablePatterns.length > 0
                ? availablePatterns[Math.floor(Math.random() * (availablePatterns.length))]
                : countOfMediumCards > 0 ? 'medium_small' : 'small_one_line'

            carsWithProperOrder[rowIndex] = {pattern: currentPattern, data: []}

            switch (currentPattern) {
                case 'medium':
                    carsWithProperOrder[rowIndex].data = [...MediumCards.getEle8ments(2)]
                    break
                case 'small_one_line':
                    carsWithProperOrder[rowIndex].data = [...SmallCards.getElements(4)]
                    break
                case 'small':
                    carsWithProperOrder[rowIndex].data = [...SmallCards.getElements(8)]
                    break
                case 'large':
                    carsWithProperOrder[rowIndex].data = [...LargeCards.getElements(1)]
                    break
                case 'small_medium':
                    carsWithProperOrder[rowIndex].data = [...SmallCards.getElements(4), ...MediumCards.getElements(1)]
                    break
                case 'medium_small':
                    carsWithProperOrder[rowIndex].data = [...MediumCards.getElements(1), ...SmallCards.getElements(4)]
                    break
                case 'small_medium_small':
                    carsWithProperOrder[rowIndex].data = [...SmallCards.getElements(2), ...MediumCards.getElements(1), ...SmallCards.getElements(2)]
                    break
            }
            rowIndex++
        }

        return carsWithProperOrder
    }, [data])

    const goToModelPage = (page: number) => () => n(p => p.car.model._key_(page))


    return <div className={s.w}>
        {carsWithProperOrder.map((row, index) => <div
                                                      className={cn(s.row, addPrefix('pattern', row.pattern, s))}>
            {row.data.map(model => <CarModelMiniCard onClick={goToModelPage(model.id)}
                                                     {...model}
                                                     loading={loading}
                                                     />)}
        </div>)}
    </div>
})
