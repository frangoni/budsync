import { StatusContainer, TrafficLight } from './_styles';

interface PlantStatusProps {
	active: boolean | undefined;
}
export default function PlantStatus({ active }: PlantStatusProps) {
	return (
		<StatusContainer>
			<TrafficLight active={Boolean(active)} />
			<p>{active ? 'Active' : 'Inactive'}</p>
		</StatusContainer>
	);
}
