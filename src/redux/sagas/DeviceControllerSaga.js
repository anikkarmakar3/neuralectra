import {call, put, select, takeLatest} from 'redux-saga/effects';

import {
  // SWITCH ON / OFF DEVICE
  deviceOnSuccess,
  deviceOnFailure,

  // FETCH DEVICE DATA AND STATUS
  desviceStatusSuccess,
  desviceStatusFailure,

  // OPEN DASHBOARD
  openDashboardSuccess,
  openDashboardFailure,
  connectioncheckReq,
  connectioncheckSuccess,
  connectioncheckFailure
} from '../reducers/DeviceControllerReducer';

import {getApi, postApi} from '../../utils/helpers/ApiRequest';

// SWITCH ON/OFF APPLIANCE BY APPLIANCE CONTROLLER ID --- SAGA
export function* deviceControllerSaga(action) {
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
  };
  try {
    let response = yield call(
      postApi,
      `${action.payload.applianceId}/data?limit=1&X-AIO-Key=aio_CwtU31FhvzStUsybimQiCO8KGvXX`,
      {value: action.payload.value},
      header,
    );

    if (response?.status == 200) {
      yield put(deviceOnSuccess(response.data));
    } else {
      yield put(deviceOnFailure(response.data));
    }
  } catch (error) {
    yield put(deviceOnFailure(error));
  }
}

// FETCH DEVICE STATUS BY STATUS ID --- SAGA
export function* deviceStatusSaga(action) {
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
  };
  try {
    let response = yield call(
      getApi,
      `${`test.lightfeedback`}/data?limit=1&X-AIO-Key=aio_CwtU31FhvzStUsybimQiCO8KGvXX`,
      header,
    );
    if (response?.status == 200) {
      yield put(desviceStatusSuccess(response.data));
    } else {
      yield put(desviceStatusFailure(response.data));
    }
  } catch (error) {
    yield put(desviceStatusFailure(error));
  }
}

// OPEN DASHBOARD SAGA
export function* openDashboardSaga(action) {
  console.log('HIIIIII');
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
  };
  try {
    let response = yield call(
      getApi,
      `${action.payload}/data?limit=1&X-AIO-Key=aio_CwtU31FhvzStUsybimQiCO8KGvXX`,
      header,
    );
    if (response?.status == 200) {
      yield put(openDashboardSuccess(response.data));
    } else {
      yield put(openDashboardFailure(response.data));
    }
  } catch (error) {
    yield put(openDashboardFailure(error));
  }
}

//connectioncheckSaga

export function* connectioncheckSaga(action) {
  yield put(connectioncheckSuccess(action.payload));
}

const watchFunction = [
  (function* () {
    yield takeLatest('DeviceController/deviceOnReq', deviceControllerSaga);
  })(),
  (function* () {
    yield takeLatest('DeviceController/desviceStatusReq', deviceStatusSaga);
  })(),
  (function* () {
    yield takeLatest('DeviceController/openDashboardReq', openDashboardSaga);
  })(),
  (function* () {
    yield takeLatest('DeviceController/connectioncheckReq', connectioncheckSaga);
  })(),
];

export default watchFunction;
