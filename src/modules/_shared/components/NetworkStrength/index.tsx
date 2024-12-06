import { useState, useEffect } from 'react';
import { NetworkStrengthWrapper } from './styles';
import { Icon } from '@iconify/react/dist/iconify.js';

interface ConnectionInfo {
	effectiveType: string;
	downlink: number;
	rtt: number;
	saveData: boolean;
}

const NetworkStrength = () => {
	const [connectionInfo, setConnectionInfo] = useState<ConnectionInfo | null>(null);

	useEffect(() => {
		const getConnectionInfo = () => {
			if ('connection' in navigator) {
				const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
				setConnectionInfo({
					effectiveType: connection.effectiveType,
					downlink: connection.downlink,
					rtt: connection.rtt,
					saveData: connection.saveData,
				});
			} else {
				console.warn('Network Information API is not supported in this browser.');
			}
		};

		getConnectionInfo();

		if ('connection' in navigator) {
			navigator.connection.addEventListener('change', getConnectionInfo);
			return () => navigator.connection.removeEventListener('change', getConnectionInfo);
		}
	}, []);

	if (!connectionInfo) return;
	const { effectiveType, downlink, rtt } = connectionInfo;

	const signalBarsByQuality = (rtt: number, downlink: number) => {
		if (rtt < 100 && downlink > 10) return 3; // Good RTT and high bandwidth
		if (rtt < 200 && downlink > 5) return 2; // Moderate RTT and acceptable bandwidth
		if (rtt < 300 || downlink > 1) return 1; // Poor RTT or minimal bandwidth
		return 0; // Very poor connection
	};

	const colorBarsByRTT = rtt < 100 ? 'green' : rtt < 200 ? 'yellow' : rtt < 300 ? 'orange' : 'red';

	if (rtt === 0) return 'Offline';

	return (
		<NetworkStrengthWrapper>
			{rtt ? (
				<>
					<p> {effectiveType}</p>
					<p>{downlink} Mbps</p>
					<Icon icon={`mdi:signal-cellular-${signalBarsByQuality(rtt, downlink)}`} color={colorBarsByRTT} />
					<p>{rtt} ms</p>
				</>
			) : (
				<p>Offline</p>
			)}
		</NetworkStrengthWrapper>
	);
};

export default NetworkStrength;
