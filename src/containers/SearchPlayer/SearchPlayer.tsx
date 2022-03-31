import { InputText } from 'primereact/inputtext';
import { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { homeActions } from '../../config/stateSlices/homeSlice';
import { IPlayer } from '../../shared/models/player.model';
import { IRootState } from '../../shared/models/rootState.model';
import './SearchPlayer.css';

const SearchPlayer = () => {

    const players = useSelector((state:IRootState) => state.home.players);
    const dispatch = useDispatch();

    const handleSearchPlayer = (event: ChangeEvent<HTMLInputElement>) => {
        if(event.target.value === '') {
            // get all players if input empty
            dispatch(homeActions.setMatchedPlayers(players));
        } else {
            // get matched players if input not empty
            dispatch(homeActions.setMatchedPlayers(players.filter(({firstname, lastname}:IPlayer) => {
                const fullName = firstname?.toLowerCase() + " " + lastname?.toLowerCase();
                const revertFullName = lastname?.toLowerCase() + " " + firstname?.toLowerCase();
                return fullName.startsWith(event.target.value.toLowerCase())
                         || revertFullName.startsWith(event.target.value.toLowerCase());
            } )));
        }
    }

    return (
        <InputText onChange={(event) => handleSearchPlayer(event)} type="text" className="p-inputtext-lg block"  placeholder="Search a player" />
    )
}

export default SearchPlayer;