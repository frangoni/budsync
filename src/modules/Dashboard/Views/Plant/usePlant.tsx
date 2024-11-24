import useModal from '@/modules/_shared/hooks/useModal';
import { generatePDF } from '@/modules/_shared/utilities/pdf';
import { generateQRCodes } from '@/modules/_shared/utilities/qr';
import { useGetPlantQuery } from '@/redux/reducers/plants';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import RECORDS_COLUMNS from './_columns';
import AppButton from '@/modules/_shared/components/Button';
import { TRecord, useGetRecordsQuery } from '@/redux/reducers/records';

type ModalContent = 'record' | 'crop';

export default function usePlant() {
	const { openModal, closeModal, modalRef } = useModal();
	const { plantId } = useParams();
	if (!plantId) throw new Error('Plant ID is required');
	const { data: currentPlant, isLoading, error } = useGetPlantQuery(plantId);
	const { data: plantRecords } = useGetRecordsQuery({ plantId: plantId, page: 1, size: 10 });
	const [modalContent, setModalContent] = useState<ModalContent>('record');
	const navigate = useNavigate();
	const navigateToRecord = (recordId: string) => navigate(`/dashboard/record/${recordId}`);

	const COLUMNS = [
		...RECORDS_COLUMNS,
		{
			title: 'Actions',
			key: 'actions',
			render: (_: any, record: TRecord) => (
				<AppButton onClick={() => navigateToRecord(record.id)} buttonType='secondary' text='View details' />
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

	return {
		currentPlant,
		isLoading,
		error,
		openModal,
		closeModal,
		modalRef,
		reprintQR,
		setContentAndOpenModal,
		modalContent,
		plantId,
		COLUMNS,
		plantRecords,
	};
}
