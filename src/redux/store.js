import {createStore, applyMiddleware} from "redux";
import { persistStore } from "redux-persist";
import logger from 'redux-logger';
import rootReducer from './root-reducer';

const middlewares = [logger];
export const store = createStore(rootReducer, applyMiddleware(...middlewares));
export const persistor = persistStore(store);//To store the state of the app locally in case of trd

export default { store, persistor };