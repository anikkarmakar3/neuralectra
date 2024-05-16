import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  status: '',
  token: null,
  isLoading: true,
  error: {},
  addType: '',
  addedRoom: [
    {roomCount: 1, status: true, id: 1},
    {roomCount: 2, status: false, id: 2},
  ],
  addedAppliances: {},
  addedCurrAppliances: {},
  deviceStatus: {},
  deviceData: {},
  openDashboardStatus: {},
  applianceId: 'test.light',
  applianceStatusId: 'test.lightfeedback',
  connectioncheckStatus:false,
};

const DeviceControlSlice = createSlice({
  name: 'DeviceController',
  initialState,
  reducers: {
    // switch on Lights request
    deviceOnReq(state, action) {
      state.status = action.type;
    },
    // switch on Lights success
    deviceOnSuccess(state, action) {
      state.status = action.type;
      state.deviceStatus = action.payload;
    },
    // switch on Lights failure
    deviceOnFailure(state, action) {
      state.status = action.type;
      state.error = action.payload;
    },

    // device data and status request
    desviceStatusReq(state, action) {
      state.status = action.type;
    },
    // device data and status success
    desviceStatusSuccess(state, action) {
      state.status = action.type;
      state.deviceData = action.payload;
    },
    // device data and status failure
    desviceStatusFailure(state, action) {
      state.status = action.type;
      state.error = action.payload;
    },

    // open dashboard request
    openDashboardReq(state, action) {
      state.status = action.type;
    },
    // open dashboard success
    openDashboardSuccess(state, action) {
      state.status = action.type;
      state.openDashboardStatus = action.payload;
    },
    // open dashboard failure
    openDashboardFailure(state, action) {
      state.status = action.type;
      state.error = action.payload;
    },


     // open dashboard request
     connectioncheckReq(state, action) {
      state.status = action.type;
    },
    // open dashboard success
    connectioncheckSuccess(state, action) {
      state.status = action.type;
      state.connectioncheckStatus = action.payload
    },
    // open dashboard failure
    connectioncheckFailure(state, action) {
      state.status = action.type;
      state.error = action.payload;
    },
  },
});

export const {
  // SWITCH ON DEVICE
  deviceOnReq,
  deviceOnSuccess,
  deviceOnFailure,

  // FETCH DEVICE STATUS BY STATUS ID
  desviceStatusReq,
  desviceStatusSuccess,
  desviceStatusFailure,

  // OPEN DASHBOARD FROM WIFI
  openDashboardReq,
  openDashboardSuccess,
  openDashboardFailure,
  connectioncheckReq,
  connectioncheckSuccess,
  connectioncheckFailure
} = DeviceControlSlice.actions;

export default DeviceControlSlice.reducer;
