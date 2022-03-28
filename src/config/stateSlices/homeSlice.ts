import { createSlice, Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { IHomeStates } from "../../shared/models/homeStates.model";
import { BACKEND_URL } from "../constants";


const initialHomeState: IHomeStates = {
    players: [],
    error: null,
    visible: false,
    playerSelected: {},
    matchedPlayers: []
}

const homeSlice = createSlice({
    name: 'home',
    initialState : initialHomeState,
    reducers : {
        setError(state:IHomeStates, action) {
            state.error = action.payload;
        },
        setRankedPlayers(state:IHomeStates, action) {
            const playersArray = action.payload;
            const rankedPlayersArray = [...playersArray].sort((a,b) => a.data.rank - b.data.rank);
            state.players = rankedPlayersArray;
            state.matchedPlayers = rankedPlayersArray;
        },
        setVisible(state:IHomeStates, action) {
            state.visible = action.payload;
        },
        setPlayerSelected(state:IHomeStates, action) {
            state.playerSelected = action.payload;
        },
        setMatchedPlayers(state:IHomeStates, action) {
            state.matchedPlayers = action.payload;
        }
    }
})

// Custom action creator
export const getPlayers = () => {
    return (dispatch: Dispatch) => {
        axios
        .get(`${BACKEND_URL}/players.json`)
        .then(res => {
            dispatch(homeSlice.actions.setRankedPlayers(res.data));
        })
        .catch(function (error) {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              if(error.response.data.error) {
                dispatch(homeSlice.actions.setError(error.response.data.error));
              }
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              if(error && error.message) {
                dispatch(homeSlice.actions.setError(error.message));
                }
            } else {
                // Something happened in setting up the request that triggered an Error
                if(error && error.message) {
                    dispatch(homeSlice.actions.setError(error.message));
                }
            }
        })
    }
}

export const homeActions = homeSlice.actions;
export default homeSlice.reducer;