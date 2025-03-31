import Header from '@/modules/_shared/components/Layout/Header';
import { SectionContainer } from '@/modules/_shared/components/Layout/_styles';
import StatsContainer from './StatsContainer';
import StatsFilters from './StatsFilters';
import useStats from './useStats';
import { Icon } from '@iconify/react/dist/iconify.js';
import ReportLoader from './ReportLoader';

const StatsComponent = () => {
	const { error, isFetching, getStats, setStatsParams, stats, statsParams, pdfRef, toPDF, isUninitialized } =
		useStats();
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
				<StatsFilters
					setStatsParams={setStatsParams}
					statsParams={statsParams}
					getStats={getStats}
					isFetching={isFetching}
				/>
				<div className='spacer-16' />
				{isFetching ? (
					<ReportLoader />
				) : (
					<div ref={pdfRef}>
						<StatsContainer statsResponse={stats} isUninitialized={isUninitialized} />
					</div>
				)}
			</SectionContainer>
		</>
	);
};

export default StatsComponent;
