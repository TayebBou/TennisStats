import { Dialog } from "primereact/dialog";
import { useDispatch, useSelector } from "react-redux";
import { homeActions } from "../../config/stateSlices/homeSlice";
import { IPlayer } from "../../shared/models/player.model";
import { IRootState } from "../../shared/models/rootState.model";
import classes from './PlayerDetails.module.css';


const PlayerDetails = ({player}:{player:IPlayer}) => {

    const visible = useSelector((state: IRootState) => state.home.visible);
    const dispatch = useDispatch();

    const onHide = () => {
        dispatch(homeActions.setVisible(false));
      };

    return (
        <Dialog header="Header" visible={visible} position={"bottom"} modal style={{ width: '50vw' }}  onHide={() => onHide()}
                    draggable={false} resizable={false} maskClassName={classes.mask} dismissableMask={true}>
                    <p className="m-0">{player.firstname} Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </Dialog>
    )
}

export default PlayerDetails;