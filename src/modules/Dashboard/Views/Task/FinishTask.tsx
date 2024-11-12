import AppButton from '@/modules/_shared/components/Button';
import { ButtonGroup, ConfirmationWrapper } from '@/modules/_shared/components/Layout/_styles';
import { useFinishTaskMutation } from '@/redux/reducers/tasks';
import { Icon } from '@iconify/react/dist/iconify.js';

interface FinishTaskProps {
	onSubmit: () => void;
	taskId: string;
}

export default function FinishTask({ onSubmit, taskId }: FinishTaskProps) {
	const [finishTask] = useFinishTaskMutation();

	const handleFinishTask = async () => {
		await finishTask(taskId);
		onSubmit();
	};

	return (
		<ConfirmationWrapper>
			<Icon icon='mdi:warning-decagram-outline' fontSize={'56rem'} />
			<h4>Do you want set the task as complete?</h4>
			<ButtonGroup>
				<AppButton text='Yes' onClick={handleFinishTask} buttonType='secondary' />
				<AppButton text='No' onClick={onSubmit} buttonType='danger' />
			</ButtonGroup>
		</ConfirmationWrapper>
	);
}
