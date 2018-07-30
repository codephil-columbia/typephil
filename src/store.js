import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import localforage from 'localforage';
import { combineReducers } from 'redux';
 import logger from 'redux-logger'

import requestTextConverter from './middleware/requestTextConverter';

import {
  isLoggedIn,
  app as appReducer
} from './reducers';

import {
  statsForUser,
  chapterProgressPercentage
} from './reducers/homepage';

import {
  auth as authReducer
} from './reducers/auth'

localforage.config({
  driver      : localforage.WEBSQL,
  name        : 'TypePhil',
  version     : 1.0,
  size        : 4980736, 
  storeName   : 'keyvaluepairs'
});

const persistConfig = {
  storage: localforage,
  blacklist: ['currentLesson'],
  key: 'root',
  debug: true
}

const persistAuthConfig = {
  storage: localforage,
  whitelist: ['auth' ],
  key: 'auth',
  debug: true
}

const TypePhilApp = combineReducers({
  auth: persistReducer(persistAuthConfig, authReducer),
  chapterProgressPercentage,
  statsForUser,
  app: persistReducer(persistConfig, appReducer)
})

const persistedReducer = persistReducer(
    persistConfig,
    TypePhilApp
);

export let store = createStore( 
    persistedReducer,
    composeWithDevTools(applyMiddleware(thunk)),
    applyMiddleware(logger)
);

export let persistor = persistStore( store );
export default persistor;
