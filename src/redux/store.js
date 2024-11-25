import {createStore, combineReducers, applyMiddleware} from 'redux';
//import {configureStore} from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import { AuthReducer, UserReducer } from './reducers';
import  {thunk}  from 'redux-thunk';
import  persistStore from 'redux-persist/es/persistStore';
import AsyncStorage from '@react-native-async-storage/async-storage';



const persistConfig = {
    key: 'SocialBharat_ntpl',
    storage: AsyncStorage,
};

const rootReducer = combineReducers({
    AuthReducer, UserReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);



export default store = createStore(persistedReducer, applyMiddleware(thunk))
 


 export const persistor = persistStore(store);




