import { combineReducers } from 'redux';
import { pagination, parameters, plants, records, rooms, strains, tasks, theme, users } from './reducers/index';
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
	[baseApi.reducerPath]: baseApi.reducer,
});

export default rootReducer;
