import { combineReducers, createStore } from 'redux';
import roomReducer from '.reducers';
import dayReducer from '.reducers';
import termReducer from '.reducers';

const configureStore = (initialState = {}) => {
    return createStore(combineReducers({
    roomReducer: roomReducer,
    dayReducer: dayReducer,
    termReducer: termReducer
    }));
}
