import AppButton from '@/modules/_shared/components/Button';
import { PlantScannerContainer, QRCardLayout } from './_styles';
import { Card } from '@/modules/_shared/components/Layout/_styles';
import { Icon } from '@iconify/react/dist/iconify.js';
import useScanner from '@/modules/_shared/hooks/useScanner';

export default function PlantScanner() {
	const { isScanning, startScanner, stopScanner } = useScanner();

	return (
		<PlantScannerContainer>
			{!isScanning && (
				<Card>
					<QRCardLayout onClick={startScanner}>
						<Icon icon='mdi:qrcode-scan' />
						<AppButton text='Open QR Scanner' />
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
