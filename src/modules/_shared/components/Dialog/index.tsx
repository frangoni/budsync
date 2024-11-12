import { ReactNode, forwardRef, useImperativeHandle, useRef } from 'react';
import { DialogContent, StyledDialog } from './styles';
import AppButton from '../Button';
import { Card } from '../Layout/_styles';
import { Icon } from '@iconify/react/dist/iconify.js';
import useKeyBindings from '../../hooks/useKeyBindings';

interface ModalProps {
	children: ReactNode;
}

export interface ModalHandle {
	open: () => void;
	close: () => void;
}

const Modal = forwardRef<ModalHandle, ModalProps>(({ children }, ref) => {
	const dialogRef = useRef<HTMLDialogElement>(null);

	useKeyBindings([{ key: 'Escape', callback: () => dialogRef.current?.close() }]);

	useImperativeHandle(ref, () => ({
		open: () => dialogRef.current?.show(),
		close: () => dialogRef.current?.close(),
	}));

	return (
		<StyledDialog ref={dialogRef}>
			<Card>
				<DialogContent>{children}</DialogContent>
			</Card>
			<AppButton id='closeModal' onClick={() => dialogRef.current?.close()} icon={<Icon icon='mdi:close' />} />
		</StyledDialog>
	);
});

export default Modal;
