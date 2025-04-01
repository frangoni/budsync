import Header from '@/modules/_shared/components/Layout/Header';
import { SectionContainer } from '@/modules/_shared/components/Layout/_styles';
import StatsContainer from './StatsContainer';
import StatsFilters from './StatsFilters';
import useStats from './useStats';
import { Icon } from '@iconify/react/dist/iconify.js';
import ReportLoader from './ReportLoader';
import AppButton from '@/modules/_shared/components/Button';

const StatsComponent = () => {
	const { error, isFetching, getStats, setStatsParams, stats, statsParams, pdfRef, toPDF, toExcel, isUninitialized } =
		useStats();
	if (error) return <div>Error: {error.toString()}</div>;

	return (
		<>
			<Header
				title='Stats'
				description='Check your metrics, export your report.'
				subtitle={
					<>
						<AppButton
							icon={<Icon icon='vscode-icons:file-type-pdf2' />}
							buttonType='icon'
							onClick={() => toPDF()}
							disabled={!stats || isFetching}
						/>
						<AppButton
							icon={<Icon icon='vscode-icons:file-type-excel' />}
							buttonType='icon'
							onClick={() => toExcel()}
							disabled={!stats || isFetching}
						/>
					</>
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
