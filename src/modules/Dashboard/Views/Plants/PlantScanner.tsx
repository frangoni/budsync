import AppButton from '@/modules/_shared/components/Button';
import { Html5Qrcode } from 'html5-qrcode';
import { useRef, useState } from 'react';
import { PlantScannerContainer, QRCardLayout } from './_styles';
import { Card } from '@/modules/_shared/components/Layout/_styles';
import { Icon } from '@iconify/react/dist/iconify.js';

interface PlantScannerProps {
	onScan: (result: string | null) => void;
}

export default function PlantScanner({ onScan }: PlantScannerProps) {
	const scannerRef = useRef<Html5Qrcode | null>(null);
	const [isScanning, setIsScanning] = useState(false);

	const startScanner = () => {
		setIsScanning(true);
		scannerRef.current = new Html5Qrcode('scanner');
		scannerRef.current.start(
			{ facingMode: 'environment' },
			{ fps: 10, qrbox: { width: 250, height: 250 } },
			decodedText => {
				onScan(decodedText);
				stopScanner();
			},
			errorMessage => {
				console.warn('QR Code scanning failed', errorMessage);
			}
		);
	};

	const stopScanner = () => {
		setIsScanning(false);
		scannerRef.current?.stop().then(() => {
			scannerRef.current?.clear();
			scannerRef.current = null;
		});
	};

	return (
		<PlantScannerContainer>
			{!isScanning && (
				<Card>
					<QRCardLayout>
						<Icon icon='mdi:qrcode-scan' />
						<AppButton text='Open QR Scanner' onClick={startScanner} />
					</QRCardLayout>
				</Card>
			)}
			<div id='scanner'>
				{isScanning && (
					<AppButton buttonType='secondary' icon={<Icon icon='mdi:close' />} onClick={stopScanner} />
				)}
			</div>
		</PlantScannerContainer>
	);
}
