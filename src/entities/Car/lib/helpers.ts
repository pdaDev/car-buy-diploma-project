import * as NS from '../namespace'
import {formatNumber, formatPrice, IServerGenerationWithPeriod} from "../../../shared";
export function getGenerationPeriod(generation: Pick<IServerGenerationWithPeriod, 'start' | 'end'>) {
   return `${new Date(generation.start).getFullYear()} - ${generation.end ? new Date(generation.end ).getFullYear() : 'н.в.'}`
}

export function getPriceRange(price: NS.IPriceRange) {
   return `${formatNumber(price.min || 0)} — ${formatPrice(price.max || 0)}`
}