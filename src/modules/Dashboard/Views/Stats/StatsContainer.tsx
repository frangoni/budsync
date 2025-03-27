import { TStat } from '@/redux/reducers/stats';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { GraphContainer, KPISWrapper, PDFWrapper, StatCardsWrapper } from './_styles';
import StatCard from './StatCard';

interface StatsProps {
	stats: TStat[] | undefined;
}

export const METRICS_COLORS = {
	nutrient: '#82ca9d',
	temperature: '#8884d8',
	humidity: '#ff7300',
};

export default function StatsContainer({ stats }: StatsProps) {
	const formattedStats = stats?.map(stat => ({
		...stat,
		date: new Date(stat.date).toLocaleDateString(),
	}));

	if (!stats) return <h2>Please, select filters to see data</h2>;

	return (
		<PDFWrapper>
			<GraphContainer>
				<ResponsiveContainer>
					<LineChart data={formattedStats ?? []}>
						<CartesianGrid strokeDasharray='10 10' />
						<XAxis dataKey='date' />
						<YAxis yAxisId='left' />
						<YAxis yAxisId='right' orientation='right' />
						<Tooltip />
						<Legend />
						{/* Temperature Line */}
						<Line
							yAxisId='left'
							type='monotone'
							dataKey='meanTemperature'
							stroke={METRICS_COLORS.temperature}
							name='Temperature (°C)'
						/>
						{/* Nutrient Line */}
						<Line
							yAxisId='left'
							type='monotone'
							dataKey='meanNutrient'
							stroke={METRICS_COLORS.nutrient}
							name='Nutrient (EC)'
						/>
						{/* Humidity Line */}
						<Line
							yAxisId='right'
							type='monotone'
							dataKey='meanHumidity'
							stroke={METRICS_COLORS.humidity}
							name='Humidity (%)'
						/>
					</LineChart>
				</ResponsiveContainer>
			</GraphContainer>

			<KPISWrapper>
				<h3>Temperature</h3>
				<StatCardsWrapper>
					<StatCard
						statNumber={1}
						statName='Average'
						statColor={METRICS_COLORS.temperature}
						statIcon='mdi:temperature'
					/>
					<StatCard
						statNumber={2}
						statName='Median'
						statColor={METRICS_COLORS.temperature}
						statIcon='mdi:temperature'
					/>
					<StatCard
						statNumber={3}
						statName='Range'
						statColor={METRICS_COLORS.temperature}
						statIcon='mdi:temperature'
					/>
				</StatCardsWrapper>
				<h3>Nutrient</h3>
				<StatCardsWrapper>
					<StatCard
						statNumber={4}
						statName='Average'
						statColor={METRICS_COLORS.nutrient}
						statIcon='mdi:energy-circle'
					/>
					<StatCard
						statNumber={5}
						statName='Median'
						statColor={METRICS_COLORS.nutrient}
						statIcon='mdi:energy-circle'
					/>
					<StatCard
						statNumber={6}
						statName='Range'
						statColor={METRICS_COLORS.nutrient}
						statIcon='mdi:energy-circle'
					/>
				</StatCardsWrapper>
				<h3>Humidity</h3>
				<StatCardsWrapper>
					<StatCard
						statNumber={10}
						statName='Average'
						statColor={METRICS_COLORS.humidity}
						statIcon='mdi:humidity-outline'
					/>
					<StatCard
						statNumber={10}
						statName='Median'
						statColor={METRICS_COLORS.humidity}
						statIcon='mdi:humidity-outline'
					/>
					<StatCard
						statNumber={10}
						statName='Range'
						statColor={METRICS_COLORS.humidity}
						statIcon='mdi:humidity-outline'
					/>
				</StatCardsWrapper>
			</KPISWrapper>
		</PDFWrapper>
	);
}
