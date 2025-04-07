import { useGetPlantStatsQuery } from '@/redux/reducers/stats';
import { useParams } from 'react-router-dom';
import StatsContainer from '../Stats/StatsContainer';

export default function PlantStats() {
	const { plantId } = useParams<{ plantId: string }>();

	const { data: stats } = useGetPlantStatsQuery(plantId ?? '', {
		refetchOnMountOrArgChange: true,
		skip: !plantId,
	});

	return <StatsContainer statsResponse={stats} isUninitialized={false} />;
}
