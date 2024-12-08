import { useState, useEffect } from 'react';
import { NetworkStrengthWrapper } from './styles';
import { Icon } from '@iconify/react/dist/iconify.js';

interface Connection {
	effectiveType?: string;
	downlink?: number;
	rtt?: number;
	saveData?: boolean;
	addEventListener?: (type: string, listener: () => void) => void;
	removeEventListener?: (type: string, listener: () => void) => void;
}

const getConnection = (): Connection | null => {
	// Retrieve the connection object from the navigator
	return (
		(navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection || null
	);
};

const calculateSignalBars = (rtt: number, downlink: number): number => {
	if (rtt < 100 && downlink > 10) return 4; // Excellent
	if (rtt < 200 && downlink > 5) return 3; // Good
	if (rtt < 300 && downlink > 1) return 2; // Fair
	return 1; // Poor
};

const getSignalColor = (rtt: number): string => {
	if (rtt < 100) return 'green';
	if (rtt < 200) return 'yellow';
	if (rtt < 300) return 'orange';
	return 'red';
};

const NetworkStrength = () => {
	const [connectionInfo, setConnectionInfo] = useState<Connection | null>(null);

	useEffect(() => {
		const connection = getConnection();

		if (!connection) {
			console.warn('Network Information API is not supported in this browser.');
			return;
		}

		const updateConnectionInfo = () => {
			setConnectionInfo({
				effectiveType: connection.effectiveType,
				downlink: connection.downlink,
				rtt: connection.rtt,
				saveData: connection.saveData,
			});
		};

		updateConnectionInfo();
		connection.addEventListener?.('change', updateConnectionInfo);

		return () => {
			connection.removeEventListener?.('change', updateConnectionInfo);
		};
	}, []);

	if (!connectionInfo || !connectionInfo.downlink) {
		return (
			<NetworkStrengthWrapper>
				<Icon icon='mdi:network-strength-off' color='red' aria-label='No connection' />
				<p>No connection</p>
			</NetworkStrengthWrapper>
		);
	}

	const { effectiveType, downlink = 0, rtt = 0 } = connectionInfo;

	const signalBars = calculateSignalBars(rtt, downlink);
	const signalColor = getSignalColor(rtt);

	return (
		<NetworkStrengthWrapper>
			<p>{effectiveType || 'Unknown'}</p>
			<p>{downlink.toFixed(1)} Mbps</p>
			<Icon
				icon={`mdi:signal-cellular-${signalBars}`}
				color={signalColor}
				aria-label={`Signal strength: ${signalBars} bars`}
			/>
			<p>{rtt} ms</p>
		</NetworkStrengthWrapper>
	);
};

export default NetworkStrength;
