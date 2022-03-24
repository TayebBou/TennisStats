import { Dialog } from 'primereact/dialog';
import { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { homeActions } from '../../config/stateSlices/homeSlice';

const ModalError = ({error}:{error: string | null}) => {

    const dispatch = useDispatch();

    const onHide = () => {
        dispatch(homeActions.setError(null));
      };

    return (
        <Dialog dismissableMask={true}
        visible={error ? true : false} onHide={() => onHide()} 
        breakpoints={{'960px': '75vw'}} style={{width: '50vw'}}
        footer={<Fragment></Fragment>}
        baseZIndex={1000}>
          <Fragment>
              <h1 style={{ textAlign: 'center', marginTop: '0', marginBottom: 'calc(80px - 2rem)' }} ><strong>{error}</strong></h1>
          </Fragment>
      </Dialog>
    )
}

export default ModalError;