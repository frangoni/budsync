import { PlantFinderContainer } from './styles';
import { useLazyGetPlantQuery } from '@/redux/reducers/plants';
import { AppForm, AppInput } from '@/modules/_shared/components/Form/styles';
import { useDebounce } from '@/modules/_shared/hooks/useDebounce';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppButton from '@/modules/_shared/components/Button';

export default function PlantFinder() {
	const [triggerGetPlant, { data: plant }] = useLazyGetPlantQuery();
	const [plantId, setPlantId] = useState('');
	const debouncedPlantId = useDebounce(plantId, 1000);
	const navigate = useNavigate();
	async function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
		const plantIdInput = e.currentTarget.value;
		setPlantId(plantIdInput);
	}

	useEffect(() => {
		if (debouncedPlantId) triggerGetPlant(debouncedPlantId);
	}, [debouncedPlantId, triggerGetPlant]);

	return (
		<PlantFinderContainer>
			<h1>Search for one</h1>
			<AppForm layout='vertical'>
				<AppForm.Item
					label='Plant Id'
					name='plantId'
					rules={[{ required: true, message: 'Please type a plant ID!' }]}
				>
					<AppInput type='text' name='plantId' onChange={handleSearch} />
				</AppForm.Item>
			</AppForm>
			{plant ? (
				<div>
					<h2>Plant info</h2>
					<p>Plant name: {plant.id}</p>
					<p>Strain: {plant.strainId}</p>
					<p>Room: {plant.roomId}</p>
					<p>Total quantity: {plant.totalQ}</p>
					<AppButton
						buttonType='secondary'
						text='View plant'
						onClick={() => navigate(`/dashboard/plants/${plant.id}`)}
					/>
				</div>
			) : null}
		</PlantFinderContainer>
	);
}
