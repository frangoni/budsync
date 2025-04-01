import { AppSelect, AppSwitch } from '@/modules/_shared/components/Form/styles';
import { FilterField, FiltersWrapper } from './_styles';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { StatsParams } from '@/redux/reducers/stats';
import useStatsFilters from './useStatsFilters';
import AppButton from '@/modules/_shared/components/Button';
dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;

export interface StatsFiltersProps {
	statsParams: StatsParams;
	setStatsParams: (params: StatsParams) => void;
	getStats: (params: StatsParams) => void;
	isFetching: boolean;
}

export default function StatsFilters({ statsParams, setStatsParams, getStats, isFetching }: StatsFiltersProps) {
	const {
		loadingRooms,
		rooms,
		handleDesksFetch,
		loadingDesks,
		desks,
		loadingStrains,
		strains,
		handleDateChange,
		updateStatsParams,
	} = useStatsFilters({ statsParams, setStatsParams });

	return (
		<FiltersWrapper>
			<FilterField>
				<label>Room</label>
				<AppSelect
					loading={loadingRooms}
					placeholder='All rooms'
					allowClear
					options={rooms?.content.map(({ room }) => ({ value: room.id, label: room.name }))}
					onChange={value => handleDesksFetch(value as number)}
					showSearch
				/>
			</FilterField>
			<FilterField>
				<label>Table</label>
				<AppSelect
					loading={loadingDesks}
					placeholder='All tables'
					disabled={!statsParams.roomId}
					allowClear
					options={desks?.map(desk => ({ value: desk.id, label: desk.name }))}
					showSearch
					onChange={deskId => updateStatsParams({ deskId: Number(deskId) || 0 })}
				/>
			</FilterField>
			<FilterField>
				<label>Strains</label>
				<AppSelect
					loading={loadingStrains}
					placeholder='All strains'
					allowClear
					options={strains?.map(strain => ({ value: strain.id, label: strain.name }))}
					showSearch
					onChange={strainId => updateStatsParams({ strainId: Number(strainId) || 0 })}
				/>
			</FilterField>
			<FilterField>
				<label htmlFor='startDate'>Date range</label>
				<RangePicker
					value={[dayjs(statsParams.startDate), dayjs(statsParams.endDate)]}
					maxDate={dayjs(new Date())}
					onChange={handleDateChange}
					allowClear={false}
				/>
			</FilterField>
			<FilterField>
				<label htmlFor='active'>Active</label>
				<AppSwitch checked={statsParams.active} onChange={checked => updateStatsParams({ active: checked })} />
			</FilterField>
			<AppButton
				id='submit'
				onClick={() => getStats(statsParams)}
				text='Submit'
				disabled={isFetching}
				loading={isFetching}
			/>
		</FiltersWrapper>
	);
}
