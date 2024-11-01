import Header from '@/modules/_shared/components/Layout/Header';
import { TPlant, useGetPlantsQuery } from '@/redux/reducers/plants';
import { useGetRoomQuery } from '@/redux/reducers/rooms';
import { useNavigate, useParams } from 'react-router-dom';
import { PLANTS_DATA } from './_dummy';
import AppTable from '@/modules/_shared/components/Table';
import { TableProps } from 'antd';
import Column from 'antd/es/table/Column';
import { StatusBadge } from './styles';
import AppButton from '@/modules/_shared/components/Button';
import Toolbar from '@/modules/_shared/components/Layout/Toolbar';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useRef } from 'react';
import Modal, { ModalHandle } from '@/modules/_shared/components/Dialog';
import AddPlants from './AddPlants';

const rowSelection: TableProps<TPlant>['rowSelection'] = {
	onChange: (selectedRowKeys: React.Key[], selectedRows: TPlant[]) => {
		console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
	},
	getCheckboxProps: (record: TPlant) => ({
		name: record.id,
	}),
};

export default function Room() {
	const { roomId } = useParams();
	const { data, isLoading, error } = useGetRoomQuery(roomId!, { skip: !roomId });
	const navigate = useNavigate();
	const navigateToPlant = (plantId: string) => navigate(`/dashboard/plants/${plantId}`);
	const modalRef = useRef<ModalHandle>(null);
	const openModal = () => modalRef.current?.open();
	const closeModal = () => modalRef.current?.close();

	if (isLoading) return <div>Loading...</div>;
	return (
		<>
			<Header title='Room' description={'Manage room name, add plants or search for active'} shouldGoBack />

			<Toolbar items={[{ icon: <Icon icon='mdi:add' />, onClick: openModal, text: 'Create plants' }]} />

			<AppTable<TPlant> rowSelection={rowSelection} title={() => 'Plants'} dataSource={PLANTS_DATA} rowKey='id'>
				<Column title='#' dataIndex='id' key='number' />
				<Column title='Strain' dataIndex='strainId' key='strain' />
				<Column
					title='Status'
					dataIndex='active'
					key='quantity'
					render={(active: boolean) => (
						<StatusBadge active={active.toString()}>{active ? 'Active' : 'Inactive'}</StatusBadge>
					)}
				/>
				<Column
					title='Actions'
					key='actions'
					render={(_: any, record: TPlant) => (
						<AppButton
							onClick={() => navigateToPlant(record.id)}
							buttonType='secondary'
							text='View details'
						/>
					)}
				/>
			</AppTable>

			<Modal ref={modalRef}>
				<AddPlants roomId={roomId} onSubmit={() => closeModal()} />
			</Modal>
		</>
	);
}
