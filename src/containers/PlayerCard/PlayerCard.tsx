import { Card } from 'primereact/card';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { homeActions } from '../../config/stateSlices/homeSlice';
import { IPlayer } from '../../shared/models/player.model';
import { IRootState } from '../../shared/models/rootState.model';
import PlayerDetails from '../PlayerDetails/PlayerDetails';

const PlayerCard = ({player}:{player:IPlayer}) => {

    const players = useSelector((state: IRootState) => state.home.players);
    const playerSelected = useSelector((state: IRootState) => state.home.playerSelected);
    const dispatch = useDispatch();


    const fetchPlayerDetails = (playerId:number | undefined) => {
        const playerSelectedData = players.find((a:IPlayer) => a.id === playerId);
        dispatch(homeActions.setPlayerSelected(playerSelectedData));
        dispatch(homeActions.setVisible(true));
    }

    return (
        <React.Fragment>
            <div onClick={() => fetchPlayerDetails(player.id)}>
                <Card  title={`${player.firstname} ${player.lastname}`} style={{ width: '25rem', marginBottom: '2em' }}>
                    
                </Card>
            </div>
            <PlayerDetails player={playerSelected}/>
        </React.Fragment>
    )
}

export default PlayerCard;