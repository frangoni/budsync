import useModal from '@/modules/_shared/hooks/useModal';
import { generatePDF } from '@/modules/_shared/utilities/pdf';
import { generateQRCodes } from '@/modules/_shared/utilities/qr';
import { useGetPlantQuery } from '@/redux/reducers/plants';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RECORDS_COLUMNS from './_columns';
import AppButton from '@/modules/_shared/components/Button';
import { TRecord, useGetRecordsQuery } from '@/redux/reducers/records';
import usePagination from '@/modules/_shared/hooks/usePagination';

type ModalContent = 'record' | 'crop' | 'edit';

export default function usePlant({ plantId }: { plantId: string }) {
	const { openModal, closeModal, modalRef } = useModal();
	const { page, size } = usePagination();
	const { data: currentPlant, isLoading, error, refetch } = useGetPlantQuery(plantId);

	const {
		data: plantRecords,
		refetch: refetchRecords,
		isFetching,
		isLoading: isLoadingRecords,
	} = useGetRecordsQuery({ plantId, page, size }, { refetchOnMountOrArgChange: true });
	const [modalContent, setModalContent] = useState<ModalContent>('record');
	const navigate = useNavigate();
	const navigateToRecord = (recordId: string) => navigate(`/dashboard/record/${recordId}`);

	const COLUMNS = [
		...RECORDS_COLUMNS,
		{
			title: 'Actions',
			key: 'actions',
			render: (_: string, record: TRecord) => (
				<AppButton
					onClick={() => navigateToRecord(record.id.toString())}
					buttonType='secondary'
					text='View details'
				/>
			),
			width: 1,
		},
	];

	const reprintQR = async () => {
		if (!currentPlant) return;
		const qrCode = await generateQRCodes([currentPlant]);
		generatePDF(qrCode);
	};

	const setContentAndOpenModal = (content: ModalContent) => {
		setModalContent(content);
		openModal();
	};

	const onEditSuccess = () => {
		refetch();
		closeModal();
	};

	const onAddRecordSuccess = () => {
		refetchRecords();
		closeModal();
	};

	return {
		currentPlant,
		isLoading,
		error,
		openModal,
		modalRef,
		reprintQR,
		setContentAndOpenModal,
		modalContent,
		plantId,
		COLUMNS,
		plantRecords,
		onEditSuccess,
		onAddRecordSuccess,
		isFetching,
		isLoadingRecords,
	};
}
