import * as NS from './../namespace'
export const getEngineCharacteristicsLabel = ({ volume, hp, fuel }: NS.IServerEngineCharacteristics, t: Function, getHandbookItemName: Function) => {
    return `${volume} ${t("metrics.liter")} / ${hp} ${t("metrics.hp")} / ${getHandbookItemName(fuel)}`
}