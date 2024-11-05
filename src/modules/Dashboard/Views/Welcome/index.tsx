import Bud from '@/modules/_shared/assets/pngs/buddy-big-joint.png';
import { WelcomeColumn, WelcomeContainer } from './styles';
import PlantScanner from '../Plants/PlantScanner';
import { useNavigate } from 'react-router-dom';
import Header from '@/modules/_shared/components/Layout/Header';

export default function Welcome() {
	const navigate = useNavigate();
	const onScan = (result: string | null) => {
		console.log('Scanned:', result);
		if (result) navigate(`/dashboard/plants/${result}`);
	};

	return (
		<>
			<Header title='Welcome to BudSync!' />
			<WelcomeContainer>
				<WelcomeColumn>
					<h3>Hi user! My name is buddy</h3>
					<img src={Bud} alt='Buddy' />
					<p>Click on the sidebar to navigate through the app</p>
				</WelcomeColumn>
				<h4>OR</h4>
				<WelcomeColumn>
					<PlantScanner onScan={onScan} />
				</WelcomeColumn>
			</WelcomeContainer>
		</>
	);
}
