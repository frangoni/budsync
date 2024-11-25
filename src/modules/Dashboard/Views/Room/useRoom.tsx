import { generatePDF } from '@/modules/_shared/utilities/pdf';
import { generateQRCodes } from '@/modules/_shared/utilities/qr';
import { TPlant } from '@/redux/reducers/plants';
import { useGetAllPlantsQuery, useGetRoomQuery } from '@/redux/reducers/rooms';
import { TableProps } from 'antd';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PLANT_COLUMNS from './_columns';
import AppButton from '@/modules/_shared/components/Button';
import useModal from '@/modules/_shared/hooks/useModal';

export default function useRoom() {
	const { roomId } = useParams();
	if (!roomId) throw new Error('Room ID is required');
	/* 	const { data: room } = useGetRoomQuery({ id: roomId }); */
	const { data: allPlants, isLoading, isError } = useGetAllPlantsQuery({ id: roomId, page: 1, size: 10 });
	const [selectedRows, setSelectedRows] = useState<TPlant[]>([]);
	const navigate = useNavigate();
	const navigateToPlant = (plantId: number) => navigate(`/dashboard/plants/${plantId}`);
	const { openModal, closeModal, modalRef } = useModal();

	const COLUMNS = [
		...PLANT_COLUMNS,
		{
			title: 'Actions',
			key: 'actions',
			render: (_: any, plant: TPlant) => (
				<AppButton onClick={() => navigateToPlant(plant.id)} buttonType='secondary' text='View details' />
			),
			width: 1,
		},
	];

	const rowSelection: TableProps<TPlant>['rowSelection'] = {
		onChange: (selectedRowKeys: React.Key[], selectedRows: TPlant[]) => {
			console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
			setSelectedRows(selectedRows);
		},
		getCheckboxProps: (record: TPlant) => ({
			name: record.id.toString(),
		}),
	};

	const reprintQR = async () => {
		const qrCode = await generateQRCodes(selectedRows);
		generatePDF(qrCode);
	};

	return {
		isLoading,
		isError,
		allPlants,
		selectedRows,
		rowSelection,
		reprintQR,
		navigateToPlant,
		openModal,
		closeModal,
		modalRef,
		roomId,
		COLUMNS,
	};
}
