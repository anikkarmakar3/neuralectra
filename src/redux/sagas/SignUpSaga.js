import {call, put, select, takeLatest} from 'redux-saga/effects';
import {getApi} from '../../utils/helpers/ApiRequest';
import {signUpSuccess, signUpFailure} from '../reducers/SignUpReducer';

export function* signUpSaga(action) {
  try {
    yield put(signUpSuccess(action.payload));
  } catch (error) {
    yield put(signUpFailure(error));
  }
}

const watchFunction = [
  (function* () {
    yield takeLatest('SignUp/signUpReq', signUpSaga);
  })(),
];

export default watchFunction;
