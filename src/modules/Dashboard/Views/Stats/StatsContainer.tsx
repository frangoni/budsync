import { TStatResponse } from '@/redux/reducers/stats';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { GraphContainer, KPISWrapper, METRICS_COLORS, PDFWrapper, StatCardsWrapper } from './_styles';
import StatCard from './StatCard';
import EmptyState from '@/modules/_shared/components/Empty';
import { smartFormatNumber } from './_utils';

interface StatsProps {
	statsResponse: TStatResponse | undefined;
	isUninitialized: boolean;
}

export default function StatsContainer({ statsResponse, isUninitialized }: StatsProps) {
	const formattedStats = statsResponse?.stats.map(stat => ({
		humidity: smartFormatNumber(stat.humidity),
		nutrient: smartFormatNumber(stat.nutrient),
		temperature: smartFormatNumber(stat.temperature),
		date: new Date(stat.record_date).toLocaleDateString(),
	}));

	if (isUninitialized)
		return <EmptyState imgOption='buddy-bong' text='Select filters and submit to generate your report.' />;
	if (!statsResponse?.stats.length) return <EmptyState text='No data available for the selected filters.' />;

	return (
		<PDFWrapper>
			<GraphContainer>
				<ResponsiveContainer>
					<LineChart data={formattedStats ?? []}>
						<CartesianGrid strokeDasharray='1 15' />
						<XAxis dataKey='date' label={{ value: 'Date', position: 'insideBottomLeft', offset: -10 }} />
						<YAxis
							yAxisId='left'
							label={{
								value: 'Temperature & Nutrient',
								angle: -90,
								position: 'insideBottomLeft',
								offset: 30,
							}}
						/>
						<YAxis
							yAxisId='right'
							orientation='right'
							label={{ value: 'Humidity', angle: 90, position: 'insideBottomRight', offset: 20 }}
						/>
						<Tooltip />
						<Legend align='right' />

						{/* Temperature Line */}
						<Line
							yAxisId='left'
							type='monotone'
							dataKey='temperature'
							stroke={METRICS_COLORS.temperature}
							name='Temperature (°C)'
						/>
						{/* Nutrient Line */}
						<Line
							yAxisId='left'
							type='monotone'
							dataKey='nutrient'
							stroke={METRICS_COLORS.nutrient}
							name='Nutrient (EC)'
						/>
						{/* Humidity Line */}
						<Line
							yAxisId='right'
							type='monotone'
							dataKey='humidity'
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
						statNumber={statsResponse.meanTemperature}
						statName='Average'
						statColor={METRICS_COLORS.temperature}
						statIcon='mdi:temperature'
					/>
					<StatCard
						statNumber={statsResponse.medianTemperature}
						statName='Median'
						statColor={METRICS_COLORS.temperature}
						statIcon='mdi:temperature'
					/>
					<StatCard
						statNumber={statsResponse.rangeTemperature}
						statName='Range'
						statColor={METRICS_COLORS.temperature}
						statIcon='mdi:temperature'
					/>
				</StatCardsWrapper>
				<h3>Nutrient</h3>
				<StatCardsWrapper>
					<StatCard
						statNumber={statsResponse.meanNutrient}
						statName='Average'
						statColor={METRICS_COLORS.nutrient}
						statIcon='mdi:energy-circle'
					/>
					<StatCard
						statNumber={statsResponse.medianNutrient}
						statName='Median'
						statColor={METRICS_COLORS.nutrient}
						statIcon='mdi:energy-circle'
					/>
					<StatCard
						statNumber={statsResponse.rangeNutrient}
						statName='Range'
						statColor={METRICS_COLORS.nutrient}
						statIcon='mdi:energy-circle'
					/>
				</StatCardsWrapper>
				<h3>Humidity</h3>
				<StatCardsWrapper>
					<StatCard
						statNumber={statsResponse.meanHumidity}
						statName='Average'
						statColor={METRICS_COLORS.humidity}
						statIcon='mdi:humidity'
					/>
					<StatCard
						statNumber={statsResponse.medianHumidity}
						statName='Median'
						statColor={METRICS_COLORS.humidity}
						statIcon='mdi:humidity'
					/>
					<StatCard
						statNumber={statsResponse.rangeHumidity}
						statName='Range'
						statColor={METRICS_COLORS.humidity}
						statIcon='mdi:humidity'
					/>
				</StatCardsWrapper>
			</KPISWrapper>
		</PDFWrapper>
	);
}
