import React, { useEffect } from "react";
import PlayerCard from "../PlayerCard/PlayerCard";
import classes from './Home.module.css'
import { useDispatch, useSelector } from "react-redux";
import { getPlayers } from "../../config/stateSlices/homeSlice";
import ModalError from "../../components/ModalError/ModalError";
import { IRootState } from "../../shared/models/rootState.model";
import { IPlayer } from "../../shared/models/player.model";
import SearchPlayer from "../SearchPlayer/SearchPlayer";

const Home = () => {

    const error = useSelector((state:IRootState) => state.home.error);
    const matchedPlayers = useSelector((state:IRootState) => state.home.matchedPlayers);
    const dispatch = useDispatch();

    const playersCards = matchedPlayers.map((player: IPlayer) => {
        return (
            <PlayerCard player={player} key={player.id}/>
        )
    })

    useEffect(() => {
        dispatch(getPlayers());
    },[dispatch])

    return (
        <React.Fragment>
            <ModalError error={error} />
            <div className={classes.main}>
            </div>
            
            <div className={classes.content}>
                <div className={classes['search-bar']}>
                    <SearchPlayer />
                </div>
                <div>
                    {playersCards}
                </div>
            </div>
        </React.Fragment>
    )
}

export default Home;