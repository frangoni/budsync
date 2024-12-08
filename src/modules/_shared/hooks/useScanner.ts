import { Html5Qrcode } from 'html5-qrcode';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useScanner() {
	const scannerRef = useRef<Html5Qrcode | null>(null);
	const navigate = useNavigate();
	const [isScanning, setIsScanning] = useState(false);

	const startScanner = () => {
		setIsScanning(true);
		scannerRef.current = new Html5Qrcode('scanner');
		scannerRef.current.start(
			{ facingMode: 'environment' },
			{ fps: 10, qrbox: { width: 500, height: 500 } },
			decodedText => {
				stopScanner();
				navigate(`/dashboard/plants/${decodedText}`);
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

	return {
		isScanning,
		startScanner,
		stopScanner,
	};
}
