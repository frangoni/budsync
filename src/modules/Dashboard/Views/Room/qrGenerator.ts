import QRCode from 'qrcode';
import { jsPDF } from 'jspdf';
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

export const generatePDF = (qrCodes: { id: string; qrUrl: string; strainId: string }[]) => {
	const doc = new jsPDF();
	const qrWidth = 120;

	qrCodes.forEach((qrData, index) => {
		const isTopHalf = index % 2 === 0;
		const yOffset = isTopHalf ? 10 : 150;
		const xOffset = 10;

		const topText = `ID: ${qrData.id}`;
		doc.text(topText, xOffset, yOffset + 5); // Keep this value for the top text position

		doc.addImage(qrData.qrUrl, 'JPEG', 0, yOffset + 8, qrWidth, qrWidth);

		const bottomText = `Strain name: ${qrData.strainId}`;
		doc.text(bottomText, xOffset, yOffset + qrWidth + 5);

		if (!isTopHalf && index !== qrCodes.length - 1) {
			doc.addPage();
		}
	});

	doc.save('BudSync-PLANTS.pdf');
	/* 	doc.autoPrint();
	doc.output('dataurlnewwindow'); */
};
