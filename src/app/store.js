// filepath: src/app/store.js
import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';        // only if you use sagas
import authReducer from './reducers/auth';            // adjust paths if needed
import rootSaga from './sagas';                       // may already exist

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  auth: authReducer,
  // …add other reducers here
});

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);   // skip if you don’t use sagas

export default store;