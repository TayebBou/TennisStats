import React, { useEffect } from "react";
import PlayerCard from "../PlayerCard/PlayerCard";
import classes from './Home.module.css'
import { InputText } from 'primereact/inputtext';
import { useDispatch, useSelector } from "react-redux";
import { getPlayers } from "../../config/stateSlices/homeSlice";
import ModalError from "../../components/ModalError/ModalError";
import { IRootState } from "../../shared/models/rootState.model";
import { IPlayer } from "../../shared/models/player.model";

const Home = () => {

    const error = useSelector((state:IRootState) => state.home.error);
    const players = useSelector((state:IRootState) => state.home.players);
    const dispatch = useDispatch();

    const playersCards = players.map((player: IPlayer) => {
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
                    <InputText type="text" className="p-inputtext-lg block"  placeholder="Search a player" />
                </div>
                <div>
                    {playersCards}
                </div>
            </div>
        </React.Fragment>
    )
}

export default Home;