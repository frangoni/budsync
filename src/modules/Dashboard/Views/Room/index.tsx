import Header from '@/modules/_shared/components/Layout/Header';
import { TPlant } from '@/redux/reducers/plants';
import AppTable from '@/modules/_shared/components/Table';
import Toolbar from '@/modules/_shared/components/Layout/Toolbar';
import { Icon } from '@iconify/react/dist/iconify.js';
import Modal from '@/modules/_shared/components/Dialog';
import AddPlants from '../Plants/AddPlants';
import useRoom from './useRoom';
import Loader from '@/modules/_shared/components/Loading';
import { SectionContainer } from '@/modules/_shared/components/Layout/_styles';
import { AppRadioGroup, AppSelect } from '@/modules/_shared/components/Form/styles';
import TableToolbar from '@/modules/_shared/components/Table/Toolbar';
import WaterPlants from './WaterPlants';

export default function Room() {
	const {
		reprintQR,
		selectedRows,
		rowSelection,
		modalRef,
		roomId,
		COLUMNS,
		allPlants,
		statusOptions,
		desksOptions,
		setDeskValue,
		deskId,
		plantsStatus,
		setStatusValue,
		handleAddPlant,
		loadingDesks,
		modalContent,
		setContentAndOpenModal,
		closeModal,
		isFetching,
		isLoading,
	} = useRoom();

	if (isLoading || loadingDesks) return <Loader />;

	return (
		<>
			<Header title='Room' description={'Manage plants in room'} shouldGoBack />
			<Toolbar
				items={[
					{
						icon: <Icon icon='material-symbols-light:potted-plant-outline' />,
						onClick: () => setContentAndOpenModal('add'),
						text: 'Grow plants',
					},
					{
						icon: <Icon icon='mdi:qrcode' />,
						onClick: reprintQR,
						text: 'Reprint QR',
						disabled: !selectedRows.length,
					},
					{
						icon: <Icon icon='mdi:water' />,
						onClick: () => setContentAndOpenModal('water'),
						text: 'Water Plants',
						disabled: !selectedRows.length,
					},
				]}
			/>
			<SectionContainer>
				<AppTable<TPlant>
					columns={COLUMNS}
					rowSelection={rowSelection}
					loading={isFetching}
					title={() => (
						<TableToolbar
							title='Plants'
							items={[
								<AppRadioGroup
									options={statusOptions}
									onChange={setStatusValue}
									value={plantsStatus}
									optionType='button'
								/>,
								<AppSelect options={desksOptions} onChange={setDeskValue} value={deskId} />,
							]}
						/>
					)}
					dataSource={allPlants?.content}
					rowKey='id'
					totalCount={allPlants?.totalElements}
				/>
			</SectionContainer>
			<Modal ref={modalRef}>
				{modalContent === 'add' && <AddPlants roomId={roomId} onSubmit={handleAddPlant} />}
				{modalContent === 'water' && (
					<WaterPlants plantIds={selectedRows.map(row => row.id)} onSubmit={closeModal} />
				)}
			</Modal>
		</>
	);
}
