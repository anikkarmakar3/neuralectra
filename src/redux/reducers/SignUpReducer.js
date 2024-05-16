import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  status: '',
  token: null,
  isLoading: true,
  error: {},
  signUpStatus: {},
};

const SignUpSlice = createSlice({
  name: 'SignUp',
  initialState,
  reducers: {
    // Sign Up request
    signUpReq(state, action) {
      state.status = action.type;
    },
    // Sign Up success
    signUpSuccess(state, action) {
      state.status = action.type;
      state.signUpStatus = action.payload;
    },
    // Sign Up failure
    signUpFailure(state, action) {
      state.status = action.type;
      state.error = action.payload;
    },
  },
});

export const {
  // SWITCH ON DEVICE
  signUpReq,
  signUpSuccess,
  signUpFailure,
} = SignUpSlice.actions;

export default SignUpSlice.reducer;
