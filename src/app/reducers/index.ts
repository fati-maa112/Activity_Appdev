import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import { persistReducer, persistStore, Persistor } from 'redux-persist';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from './auth';

interface RootState {
  auth: ReturnType<typeof auth>;
}

interface StoreConfig {
  store: Store<RootState>;
  persistor: Persistor;
  runSaga: typeof sagaMiddleware.run;
}

const sagaMiddleware: SagaMiddleware = createSagaMiddleware();

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['auth'],
};

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  blacklist: [],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, auth),
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export default (): StoreConfig => {
  const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
  const persistor = persistStore(store);
  const runSaga = sagaMiddleware.run;
  return { store, persistor, runSaga };
};