import { generatePDF } from '@/modules/_shared/utilities/pdf';
import { generateQRCodes } from '@/modules/_shared/utilities/qr';
import { TPlant } from '@/redux/reducers/plants';
import { useGetRoomQuery } from '@/redux/reducers/rooms';
import { TableProps } from 'antd';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PLANT_COLUMNS from './_columns';
import AppButton from '@/modules/_shared/components/Button';
import useModal from '@/modules/_shared/hooks/useModal';

export default function useRoom() {
	const { roomId } = useParams();
	const { data, isLoading, error } = useGetRoomQuery(roomId!, { skip: !roomId });
	const [selectedRows, setSelectedRows] = useState<TPlant[]>([]);
	const navigate = useNavigate();
	const navigateToPlant = (plantId: string) => navigate(`/dashboard/plants/${plantId}`);
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
			name: record.id,
		}),
	};

	const reprintQR = async () => {
		const qrCode = await generateQRCodes(selectedRows);
		generatePDF(qrCode);
	};

	return {
		data,
		isLoading,
		error,
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
