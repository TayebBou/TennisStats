export interface IPlayer {
    country?: {
        code: string,
        picture: string
    },
    data?: {
        age: number,
        height: number,
        last: Array<number>,
        points: number,
        rank: number,
        weight: number
    },
    firstname?: string,
    id?: number,
    lastname?: string,
    picture?: string,
    sex?: string,
    shortname?: string
}