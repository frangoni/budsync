import useModal from '@/modules/_shared/hooks/useModal';
import { generatePDF } from '@/modules/_shared/utilities/pdf';
import { generateQRCodes } from '@/modules/_shared/utilities/qr';
import { useGetPlantQuery } from '@/redux/reducers/plants';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

type ModalContent = 'record' | 'crop';

export default function usePlant() {
	const { openModal, closeModal, modalRef } = useModal();
	const { plantId } = useParams();
	const { data: currentPlant, isLoading, error } = useGetPlantQuery(plantId!);
	const [modalContent, setModalContent] = useState<ModalContent>('record');

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
	};
}
