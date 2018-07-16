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
  blacklist: ['currentLesson'],
  whitelist: ['auth'],
  key: 'root',
  debug: true
}

const persistAuthConfig = {
  storage: localforage,
  whitelist: ['auth' ],
  key: 'root',
  debug: true
}

const TypePhilApp = combineReducers({
  auth: persistReducer(persistAuthConfig, auth),
  chapterProgressPercentage,
  app: persistReducer(persistConfig, app)
})

const persistedReducer = persistReducer(
    persistConfig,
    TypePhilApp
);

export let store = createStore( persistedReducer, composeWithDevTools(applyMiddleware(thunk)) );
/*
    TypePhilApp,
    composeWithDevTools(applyMiddleware(thunk))
);
*/

export let persistor = persistStore( store );
