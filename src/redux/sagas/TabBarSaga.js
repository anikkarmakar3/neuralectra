import {call, put, select, takeLatest} from 'redux-saga/effects';
import {getApi} from '../../utils/helpers/ApiRequest';
import {} from '../reducers/TabBarReducer';

// export function* roomTabSaga(action) {
//   try {
//     yield put(roomTabSuccess(action.payload));
//   } catch (error) {
//     yield put(roomTabFailure(error));
//     //   Toast(error.message);
//   }
// }

const watchFunction = [
  // (function* () {
  //   yield takeLatest('TabBar/roomTabReq', roomTabSaga);
  // })(),
];

export default watchFunction;
