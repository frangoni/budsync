import Bud from '@/modules/_shared/assets/pngs/buddy-big-joint.png';
import { WelcomeColumn, WelcomeContainer } from './_styles';
import PlantScanner from '../Plants/PlantScanner';
import { useNavigate } from 'react-router-dom';
import Header from '@/modules/_shared/components/Layout/Header';
import { StyledBud } from '@/modules/404/styles';
import { useAppSelector } from '@/redux/store';

export default function Welcome() {
	const navigate = useNavigate();
	const { currentUser } = useAppSelector(({ users }) => users);
	const onScan = (result: string | null) => {
		if (result) navigate(`/dashboard/plants/${result}`);
	};

	return (
		<>
			<Header title='Welcome to BudSync!' />
			<WelcomeContainer>
				<WelcomeColumn>
					<h3>Hi {currentUser?.name}! My name is Buddy</h3>
					<StyledBud src={Bud} alt='Buddy' />
					<p>Click on the sidebar to navigate through the app</p>
				</WelcomeColumn>
				<h4>OR</h4>
				<WelcomeColumn>
					<h3>Look for a plant</h3>
					<PlantScanner onScan={onScan} />
				</WelcomeColumn>
			</WelcomeContainer>
		</>
	);
}
