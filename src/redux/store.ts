import { combineReducers, configureStore } from '@reduxjs/toolkit';
import theme from './reducers/theme';
import user from './reducers/user';
import { useDispatch, useSelector } from 'react-redux';
import { userApi } from './reducers/user';
import { setupListeners } from '@reduxjs/toolkit/query';
import { CONSTANTS } from '@/modules/_shared/_constants';
import { KEY_PREFIX, getStoredState, persistReducer, persistStore, purgeStoredState } from 'redux-persist';
import localforage from 'localforage';

const persistConfig = {
	key: CONSTANTS.PERSIST_REDUX_KEY,
	storage: localforage,
};

const rootReducer = combineReducers({ theme, user, [userApi.reducerPath]: userApi.reducer });
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer: persistedReducer,
	devTools: process.env.NODE_ENV !== 'production',
	middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }).concat(userApi.middleware),
});

export const persistedStore = persistStore(store as any);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

export default store;

export async function getState() {
	return getStoredState(persistConfig) as Promise<RootState | undefined>;
}

export async function clearStoredState() {
	return Promise.all([
		purgeStoredState(persistConfig),
		localforage.removeItem(CONSTANTS.JWT_LS_KEY),
		localforage.removeItem(KEY_PREFIX + CONSTANTS.PERSIST_REDUX_KEY),
	]);
}
