import AppButton from '@/modules/_shared/components/Button';
import { FloatingScannerContainer } from './_styles';
import { Icon } from '@iconify/react/dist/iconify.js';
import useScanner from '@/modules/_shared/hooks/useScanner';

export default function FloatingScanner() {
	const { isScanning, startScanner, stopScanner } = useScanner();

	return (
		<FloatingScannerContainer>
			{!isScanning && <AppButton icon={<Icon icon='mdi:qrcode-scan' />} onClick={startScanner} />}
			<div id='scanner'>
				{isScanning && (
					<AppButton buttonType='secondary' icon={<Icon icon='mdi:close' />} onClick={stopScanner} />
				)}
			</div>
		</FloatingScannerContainer>
	);
}
