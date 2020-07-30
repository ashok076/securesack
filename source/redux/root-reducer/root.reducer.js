import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';

import loginReducer from '../login-session/reducer/login-session.reducer';
import userInfo from '../user-info/reducer/user-info.reducer';

const logger = createLogger({
  predicate: (getState, action) => __DEV__,
});

const createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore);

const rootReducer = combineReducers({
    isLogin: loginReducer,
    userData: userInfo
})

const store = createStoreWithMiddleware(rootReducer);

export default store;
