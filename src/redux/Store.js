import {configureStore} from '@reduxjs/toolkit';
import {logger} from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import RootSaga from './sagas/RootSaga';
import DeviceControllerReducer from './reducers/DeviceControllerReducer';
import TabBarReducer from './reducers/TabBarReducer';
import SignUpReducer from './reducers/SignUpReducer';

let SagaMiddleware = createSagaMiddleware();
const middleware = [SagaMiddleware, logger];
export default configureStore({
  reducer: {
    DeviceControllerReducer,
    TabBarReducer,
    SignUpReducer,
  },
  middleware,
});
SagaMiddleware.run(RootSaga);
