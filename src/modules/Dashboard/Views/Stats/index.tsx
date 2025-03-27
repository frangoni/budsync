import Header from '@/modules/_shared/components/Layout/Header';
import { SectionContainer } from '@/modules/_shared/components/Layout/_styles';
import StatsContainer from './StatsContainer';
import StatsFilters from './StatsFilters';
import useStats from './useStats';
import { statsData } from './_dummy';
import { usePDF } from 'react-to-pdf';
import { Icon } from '@iconify/react/dist/iconify.js';

const StatsComponent = () => {
	const { error, isLoading, getStats, setStatsParams, stats, statsParams } = useStats();
	console.log('stats :', stats);
	const date = new Date();
	const today = date.toLocaleDateString();
	const { toPDF, targetRef: pdfRef } = usePDF({
		filename: `${today} Budsync KPIs.pdf`,
		page: {},
	});

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.toString()}</div>;

	return (
		<>
			<Header
				title='Stats'
				description='Check your metrics, export your report.'
				subtitle={
					<Icon
						icon='vscode-icons:file-type-pdf2'
						onClick={() => toPDF()}
						style={{ fontSize: '2.5rem', cursor: 'pointer' }}
					/>
				}
			/>
			<SectionContainer>
				<StatsFilters setStatsParams={setStatsParams} statsParams={statsParams} getStats={getStats} />
				<div className='spacer-16' />

				<div ref={pdfRef}>
					<StatsContainer stats={statsData} />
				</div>
			</SectionContainer>
		</>
	);
};

export default StatsComponent;
