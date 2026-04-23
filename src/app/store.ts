import { createStore, applyMiddleware, combineReducers, Store } from 'redux';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import authReducer from './reducers/auth';
import rootSaga from './sagas';

interface RootState {
  auth: ReturnType<typeof authReducer>;
}

const sagaMiddleware: SagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers<RootState>({
  auth: authReducer,
});

const store: Store<RootState> = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;