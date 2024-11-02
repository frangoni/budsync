import { ModalHandle } from '@/modules/_shared/components/Dialog';
import { generatePDF } from '@/modules/_shared/utilities/pdf';
import { generateQRCodes } from '@/modules/_shared/utilities/qr';
import { TPlant } from '@/redux/reducers/plants';
import { useGetRoomQuery } from '@/redux/reducers/rooms';
import { TableProps } from 'antd';
import { useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PLANT_COLUMNS from './_columns';
import AppButton from '@/modules/_shared/components/Button';

export default function useRoom() {
	const { roomId } = useParams();
	const { data, isLoading, error } = useGetRoomQuery(roomId!, { skip: !roomId });
	const [selectedRows, setSelectedRows] = useState<TPlant[]>([]);
	const navigate = useNavigate();
	const navigateToPlant = (plantId: string) => navigate(`/dashboard/plants/${plantId}`);
	const modalRef = useRef<ModalHandle>(null);
	const openModal = () => modalRef.current?.open();
	const closeModal = () => modalRef.current?.close();
	const COLUMNS = [
		...PLANT_COLUMNS,
		{
			title: 'Actions',
			key: 'actions',
			render: (_: any, record: TPlant) => (
				<AppButton onClick={() => navigateToPlant(record.id)} buttonType='secondary' text='View details' />
			),
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
