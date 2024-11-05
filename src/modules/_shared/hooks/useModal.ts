import { useRef } from 'react';
import { ModalHandle } from '../components/Dialog';

export default function useModal() {
	const modalRef = useRef<ModalHandle>(null);
	const openModal = () => modalRef.current?.open();
	const closeModal = () => modalRef.current?.close();

	return { modalRef, openModal, closeModal };
}
