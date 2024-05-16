import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  status: {},
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
  switchedOnLights: {},
};

const TabBarSlice = createSlice({
  name: 'TabBar',
  initialState,
  reducers: {
    // add tabbar
    roomTabReq(state, action) {
      state.status = action.type;
      state.roomTab = action.payload;
    },
    //add rooms
    addRoomReq(state, action) {
      state.status = action.type;
      state.addedRoom = action.payload;
    },

    //add appliances
    addAplliancesReq(state, action) {
      state.status = action.type;
      state.addedAppliances = action.payload;
    },

    //current appliances
    addCurrAplliancesReq(state, action) {
      state.status = action.type;
      state.addedCurrAppliances = action.payload;
    },

    // on Lights
    onLightsReq(state, action) {
      state.status = action.type;
      state.switchedOnLights = action.payload;
    },
  },
});

export const {
  roomTabReq,
  addRoomReq,
  addAplliancesReq,
  addCurrAplliancesReq,
  onLightsReq,
} = TabBarSlice.actions;

export default TabBarSlice.reducer;
