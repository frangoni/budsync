import { combineReducers } from 'redux';
import {
	pagination,
	parameters,
	plants,
	records,
	rooms,
	strains,
	tasks,
	theme,
	users,
	desks,
	irrigations,
	stats,
} from './reducers/index';
import { baseApi } from './baseApi';

const rootReducer = combineReducers({
	theme,
	users,
	rooms,
	plants,
	records,
	tasks,
	strains,
	parameters,
	pagination,
	desks,
	irrigations,
	stats,
	[baseApi.reducerPath]: baseApi.reducer,
});

export default rootReducer;
