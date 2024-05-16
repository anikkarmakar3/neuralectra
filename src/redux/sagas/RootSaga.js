import {all} from 'redux-saga/effects';

// import AuthSaga from './AuthSaga';
// import ListSaga from './ListSaga';
import DeviceControllerSaga from './DeviceControllerSaga';

const combinedSaga = [...DeviceControllerSaga];

export default function* RootSaga() {
  yield all(combinedSaga);
}
