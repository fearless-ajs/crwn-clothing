import {combineReducers} from "redux";
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';

import userReducer from "./user/user-reducer";
import cartReducer from "./cart/cart-reducer";
import directoryReducer from "./directory/directory.reducer";
import shopReducer from "./shop/shop.reducer";

const persistConfig = {
   //The key actually means at what point of our reducer do we wanna start storing
   //But we wanna start from the root
   key: 'root',
   storage,
   //The whitelist contains the list of the reducers we wanna store
   //We'll only whitelist the cart reducer since firebase will be handling user reducer
   whitelist: ['cart']
}

const rootReducer = combineReducers({
   user: userReducer,
   cart: cartReducer,
   directory: directoryReducer,
   shop: shopReducer
})

export default persistReducer(persistConfig, rootReducer);