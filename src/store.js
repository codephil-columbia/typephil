import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import localforage from 'localforage';
import { combineReducers } from 'redux';

import {
  isLoggedIn,
  app
} from './reducers';

import {
  statsForUser,
  chapterProgressPercentage
} from './reducers/homepage';

import {
  auth
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
  whitelist: ['auth', 'isLoggedIn', 'currentUser', 'currentLesson'],
  key: 'root',
  debug: true
}

const persistAuthConfig = {
  storage: localforage,
  whitelist: ['isLoggedIn', 'currentUser'],
  key: 'root',
  debug: true
}

const TypePhilApp = combineReducers({
  isLoggedIn,
  auth: persistReducer(persistAuthConfig, auth),
  statsForUser,
  chapterProgressPercentage,
  app: persistReducer(persistConfig, app)
})

export let store = createStore(
    TypePhilApp,
    composeWithDevTools(applyMiddleware(thunk))
);

export let persistor = persistStore(store);
