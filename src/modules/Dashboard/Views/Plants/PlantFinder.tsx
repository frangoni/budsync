import { PlantFinderContainer, PlantInfo } from './_styles';
import { useLazyGetPlantQuery } from '@/redux/reducers/plants';
import { AppForm, AppInput } from '@/modules/_shared/components/Form/styles';
import { useDebounce } from '@/modules/_shared/hooks/useDebounce';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppButton from '@/modules/_shared/components/Button';
import Loader from '@/modules/Loading';

export default function PlantFinder() {
	const [triggerGetPlant, { data: plant, status }] = useLazyGetPlantQuery();
	const [plantId, setPlantId] = useState('');
	const debouncedPlantId = useDebounce(plantId, 1000);
	const [isTyping, setIsTyping] = useState(false);
	const navigate = useNavigate();
	async function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
		setIsTyping(true);
		const plantIdInput = e.currentTarget.value;
		setPlantId(plantIdInput);
	}

	useEffect(() => {
		if (debouncedPlantId) triggerGetPlant(debouncedPlantId);
		setIsTyping(false);
	}, [debouncedPlantId, triggerGetPlant]);

	const getComponentByStatus = () => {
		if (status === 'pending' || isTyping) return <Loader />;
		if (status === 'fulfilled' && plant)
			return (
				<PlantInfo>
					<h2>Plant info</h2>
					<p>Plant number: {plant.id}</p>
					<p>Strain: {plant.strain.name}</p>
					<p>Room: {plant.room.name}</p>
					<p>Total quantity: {plant.totalQ}</p>
					<AppButton
						buttonType='secondary'
						text='View plant'
						onClick={() => navigate(`/dashboard/plants/${plant.id}`)}
					/>
				</PlantInfo>
			);
		if (status === 'rejected') return <p>Plant not found</p>;
	};

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
			{getComponentByStatus()}
		</PlantFinderContainer>
	);
}
