import { IPlayer } from "./player.model";

export interface IHomeStates {
    players: Array<IPlayer>,
    error: string | null,
    visible: boolean,
    playerSelected: IPlayer,
    matchedPlayers: Array<IPlayer>
}