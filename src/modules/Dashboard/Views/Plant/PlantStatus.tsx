import { StatusContainer, TrafficLight } from './_styles';

interface PlantStatusProps {
	active: boolean | undefined;
	text?: string;
}
export default function PlantStatus({ active, text }: PlantStatusProps) {
	return (
		<StatusContainer>
			<TrafficLight active={Boolean(active)} />
			{text ? <p>{text}</p> : <p>{active ? 'Active' : 'Inactive'}</p>}
		</StatusContainer>
	);
}
