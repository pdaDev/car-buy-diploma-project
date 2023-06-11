import * as NS from '../namespace'

export const combineChatId = (initiatorId: number, receiverId: number, type: NS.ChatType, advertisementId?: number, carId?: number ) => {
    switch (type) {
        case 'sell':
            return `${initiatorId}:${receiverId}:${advertisementId}:${carId}`
        case 'support':
            return `${initiatorId}:support:${receiverId}`
    }
}

export const parseChatId = (chatId: string) => {
    const splitted = chatId.split(':')

    const initiatorId = +splitted[0]
    const type = splitted[1]

    if (type === 'support') {
        return {
            initiatorId,
            type,
            receiverId: +splitted[2],
            carId: null,
            advertisementId: null
        }
    }

    if (splitted.length === 4) {
        return  {
            initiatorId,
            type: 'sell',
            receiverId: +type,
            advertisementId: +splitted[2],
            carId: +splitted[3]
        }
    }
    return null

}