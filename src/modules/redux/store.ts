import { configureStore } from '@reduxjs/toolkit';
import theme from './reducers/theme';
import { useDispatch, useSelector } from 'react-redux';
import { userApi } from './reducers/user';
import { setupListeners } from '@reduxjs/toolkit/query';

const store = configureStore({
	reducer: {
		theme,
		[userApi.reducerPath]: userApi.reducer,
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(userApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

export default store;
