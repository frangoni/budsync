import { baseApi } from './baseApi';
import { initialPaginationState } from './reducers/pagination';
import { initialParametersState } from './reducers/parameters';
import { initialPlantsState } from './reducers/plants';
import { initialRecordsState } from './reducers/records';
import { initialRoomsState } from './reducers/rooms';
import { initialStrainsState } from './reducers/strains';
import { initialTasksState } from './reducers/tasks';
import { initialThemeState } from './reducers/theme';
import { initialUserState } from './reducers/users';

const initialStore = {
	version: 1,
	users: initialUserState,
	theme: initialThemeState,
	rooms: initialRoomsState,
	plants: initialPlantsState,
	records: initialRecordsState,
	tasks: initialTasksState,
	strains: initialStrainsState,
	parameters: initialParametersState,
	pagination: initialPaginationState,
	[baseApi.reducerPath]: baseApi.reducer,
};

export default initialStore;
