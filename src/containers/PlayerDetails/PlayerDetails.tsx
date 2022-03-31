import { Dialog } from 'primereact/dialog'
import { useDispatch, useSelector } from 'react-redux'
import CareerTitles from '../../components/CareerTitles/CareerTitles'
import { homeActions } from '../../config/stateSlices/homeSlice'
import { IPlayer } from '../../shared/models/player.model'
import { IRootState } from '../../shared/models/rootState.model'
import classes from './PlayerDetails.module.css'

const PlayerDetails = ({ player }: { player: IPlayer }) => {
  const visible = useSelector((state: IRootState) => state.home.visible)
  const dispatch = useDispatch()

  const onHide = () => {
    dispatch(homeActions.setVisible(false))
  }

  return (
    <Dialog
      header="Header"
      visible={visible}
      position={'bottom'}
      modal
      style={{ width: '50vw' }}
      onHide={() => onHide()}
      draggable={false}
      resizable={false}
      maskClassName={classes.mask}
      dismissableMask={true}
      contentClassName={classes.content}
      className={classes.dialog}
      showHeader={false}
    >
      <div>
        <h2 className={classes.h2}>
          <b className={classes.b}>{player.firstname}</b> {player.lastname}
        </h2>
        <div className={classes.country}>
          <img
            src={player.country?.picture}
            alt="Country flag"
            className={classes['country-image']}
          />
          <h3
            className={classes.h3}
            style={{ fontSize: '2.5vw', letterSpacing: '2.5vw' }}
          >
            {player.country?.code}
          </h3>
        </div>
      </div>
      <i className={`pi pi-times ${classes.close}`} onClick={() => onHide()}/>

      <div className={classes.modal}>
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
        <div className={classes['career-title']}>
          <h3 className={classes.h3}>CAREER TITLES</h3>
          <CareerTitles />
        </div>
        <div>
          <h3 className={classes.h3}>BIRTHDAY</h3>
          <p className={classes.p}>
            22 / 05 /{' '}
            {player.data?.age !== undefined ? 2022 - player.data?.age : null}
          </p>
        </div>
        <div className={classes.age}>
          <h3 className={classes.h3}>AGE</h3>
          <p className={classes.p}>{player.data?.age}</p>
        </div>
        <div>
          <h3 className={classes.h3}>WEIGHT</h3>
          <p className={classes.p}>
            {player.data?.weight !== undefined
              ? player.data?.weight / 1000
              : null}{' '}
            kg
          </p>
        </div>
        <div>
          <h3 className={classes.h3}>HEIGHT</h3>
          <p className={classes.p}>{player.data?.height} cm</p>
        </div>
        <div>
          <img
            src={player.picture}
            alt="Tennis Player"
            className={classes.image}
          />
        </div>
      </div>
    </Dialog>
  )
}

export default PlayerDetails
