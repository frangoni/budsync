import QRCode from 'qrcode';
import { TPlant } from '@/redux/reducers/plants';

export const generateQRCodes = async (plants: TPlant[]) => {
	const qrData = await Promise.all(
		plants.map(async plant => {
			const qrUrl = await QRCode.toDataURL(plant.id);
			return { id: plant.id, qrUrl, strainId: plant.strainId };
		})
	);
	return qrData;
};