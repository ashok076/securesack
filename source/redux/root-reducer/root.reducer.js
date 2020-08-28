import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';

import userInfo from '../user-info/reducer/user-info.reducer';
import countries from '../countries/reducer/countries.reducer.js'

const logger = createLogger({
  predicate: (getState, action) => __DEV__,
});

const createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore);

const rootReducer = combineReducers({
    userData: userInfo,
    countries_list: countries
})

const store = createStoreWithMiddleware(rootReducer);

export default store;