import { generatePDF } from '@/modules/_shared/utilities/pdf';
import { generateQRCodes } from '@/modules/_shared/utilities/qr';
import { TPlant, TPlantStatus, useGetPlantsByRoomQuery } from '@/redux/reducers/plants';
import { RadioChangeEvent, TableProps } from 'antd';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PLANT_COLUMNS from './_columns';
import AppButton from '@/modules/_shared/components/Button';
import useModal from '@/modules/_shared/hooks/useModal';
import usePagination from '@/modules/_shared/hooks/usePagination';

export default function useRoom() {
	const { roomId } = useParams();
	const [plantsStatus, setPlantsStatus] = useState<TPlantStatus>('plants');
	if (!roomId) throw new Error('Room ID is required');
	const { page, size } = usePagination();
	const {
		data: allPlants,
		isLoading,
		refetch,
	} = useGetPlantsByRoomQuery({ id: roomId, status: plantsStatus, page, size }, { refetchOnMountOrArgChange: true });

	const [selectedRows, setSelectedRows] = useState<TPlant[]>([]);
	const navigate = useNavigate();
	const navigateToPlant = (plantId: number) => navigate(`/dashboard/plants/${plantId}`);
	const { openModal, closeModal, modalRef } = useModal();

	const COLUMNS = [
		...PLANT_COLUMNS,
		{
			title: 'Actions',
			key: 'actions',
			render: (_: string, plant: TPlant) => (
				<AppButton onClick={() => navigateToPlant(plant.id)} buttonType='secondary' text='View details' />
			),
			width: 1,
		},
	];

	const rowSelection: TableProps<TPlant>['rowSelection'] = {
		onChange: (selectedRowKeys: React.Key[], selectedRows: TPlant[]) => {
			console.log('selectedRowKeys :', selectedRowKeys);
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

	const options = [
		{ label: 'All', value: 'plants' },
		{ label: 'Active', value: 'activePlants' },
		{ label: 'Inactive', value: 'inactivePlants' },
	];

	const setStatusValue = ({ target: { value } }: RadioChangeEvent) => {
		setPlantsStatus(value);
	};

	const handleAddPlant = () => {
		refetch();
		closeModal();
	};

	return {
		isLoading,
		allPlants,
		selectedRows,
		rowSelection,
		reprintQR,
		openModal,
		modalRef,
		roomId,
		COLUMNS,
		plantsStatus,
		options,
		setStatusValue,
		handleAddPlant,
	};
}
