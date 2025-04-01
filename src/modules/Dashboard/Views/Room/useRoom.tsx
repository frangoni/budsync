import { generatePDF } from '@/modules/_shared/utilities/pdf';
import { generateQRCodes } from '@/modules/_shared/utilities/qr';
import { TPlant, TPlantStatus, useGetPlantsByDeskQuery } from '@/redux/reducers/plants';
import { RadioChangeEvent, TableProps } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PLANT_COLUMNS from './_columns';
import AppButton from '@/modules/_shared/components/Button';
import useModal from '@/modules/_shared/hooks/useModal';
import usePagination from '@/modules/_shared/hooks/usePagination';
import { useGetAllDesksQuery } from '@/redux/reducers/desks';

type ModalContent = 'add' | 'water';

export default function useRoom() {
	const { roomId } = useParams();
	const [modalContent, setModalContent] = useState<ModalContent>('add');
	const [plantsStatus, setPlantsStatus] = useState<TPlantStatus>('plants');
	const { openModal, closeModal, modalRef } = useModal();
	const { page, size, resetPage } = usePagination();
	const [deskId, setDeskId] = useState<number | undefined>(undefined);
	const {
		data: allPlants,
		isLoading,
		refetch,
	} = useGetPlantsByDeskQuery(
		{ id: deskId || 0, status: plantsStatus, page, size },
		{ skip: !deskId, refetchOnMountOrArgChange: true }
	);

	const {
		data: desks,
		isLoading: loadingDesks,
		isSuccess,
	} = useGetAllDesksQuery({ roomId: Number(roomId), page: 0, size: -1 });

	useEffect(() => {
		if (isSuccess && desks.length) setDeskId(desks[0].id);
	}, [isSuccess, desks]);

	const [selectedRows, setSelectedRows] = useState<TPlant[]>([]);
	const navigate = useNavigate();
	const navigateToPlant = (plantId: number) => navigate(`/dashboard/plants/${plantId}`);

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

	const statusOptions = [
		{ label: 'All', value: 'plants' },
		{ label: 'Active', value: 'activePlants' },
		{ label: 'Inactive', value: 'inactivePlants' },
	];

	const desksOptions = useMemo(() => {
		if (!desks) return [];
		return desks.map(({ id, name }) => ({ label: `Table ${name}`, value: id }));
	}, [desks]);

	const setStatusValue = ({ target: { value } }: RadioChangeEvent) => {
		setPlantsStatus(value);
		resetPage();
	};

	const setDeskValue = (value: unknown) => {
		if (typeof value === 'number') {
			setDeskId(value);
			resetPage();
		}
	};

	const handleAddPlant = () => {
		if (!deskId) return;
		refetch();
		closeModal();
	};

	const setContentAndOpenModal = (content: ModalContent) => {
		setModalContent(content);
		openModal();
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
		statusOptions,
		desksOptions,
		setStatusValue,
		setDeskValue,
		deskId,
		handleAddPlant,
		setDeskId,
		loadingDesks,
		setContentAndOpenModal,
		modalContent,
		closeModal,
	};
}
