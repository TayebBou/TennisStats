import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { homeActions } from '../../config/stateSlices/homeSlice';
import { IPlayer } from '../../shared/models/player.model';
import { IRootState } from '../../shared/models/rootState.model';
import classes from './PlayerCard.module.css';

const PlayerCard = ({player}:{player:IPlayer}) => {

    const players = useSelector((state: IRootState) => state.home.players);
    const dispatch = useDispatch();


    const fetchPlayerDetails = (playerId:number | undefined) => {
        const playerSelectedData = players.find((a:IPlayer) => a.id === playerId);
        dispatch(homeActions.setPlayerSelected(playerSelectedData));
        dispatch(homeActions.setVisible(true));
    }

    return (
        <React.Fragment>
            <div className={classes.card} onClick={() => fetchPlayerDetails(player.id)}>
                <div className={classes['image-div']}>
                    <img src={player.picture} alt="Tennis Player" className={classes.image} />
                </div>
                <div className={classes.title} >
                    <h2 className={classes.h2}>{player.firstname} {player.lastname}</h2>
                </div>
                
                <div className={classes.info}>
                    <div>
                        <h3 className={classes.h3}>RANK</h3>
                        <p className={classes.p}>#{player.data?.rank}</p>
                    </div>
                    <div>
                        <h3 className={classes.h3}>POINTS</h3>
                        <p className={classes.p}>{player.data?.points}</p>
                    </div>
                    <div>
                        <h3 className={classes.h3}>COUNTRY</h3>
                        <p className={classes.p}>{player.country?.code}</p>
                    </div>
                </div>
            </div>
            
        </React.Fragment>
    )
}

export default PlayerCard;