import AppButton from '@/modules/_shared/components/Button';
import { ButtonGroup, ConfirmationWrapper } from '@/modules/_shared/components/Layout/_styles';
import useNotification from '@/modules/_shared/hooks/useNotification';
import { useFinishTaskMutation } from '@/redux/reducers/tasks';
import { Icon } from '@iconify/react/dist/iconify.js';

interface FinishTaskProps {
	onSubmit: () => void;
	taskId: string;
}

export default function FinishTask({ onSubmit, taskId }: FinishTaskProps) {
	const [finishTask, { isLoading }] = useFinishTaskMutation();
	const notification = useNotification();

	const handleFinishTask = async () => {
		const finishedTask = await finishTask(taskId);
		if (finishedTask.error) {
			return notification.error({
				message: 'Error finishing task',
			});
		}
		notification.success({
			message: 'Task finished!',
			description: 'Task successfully finished',
		});
		onSubmit();
	};

	return (
		<ConfirmationWrapper>
			<Icon icon='mdi:warning-decagram-outline' fontSize={'56rem'} />
			<h4>Do you want set the task as complete?</h4>
			<ButtonGroup>
				<AppButton text='Yes' onClick={handleFinishTask} buttonType='secondary' loading={isLoading} />
				<AppButton text='No' onClick={onSubmit} buttonType='danger' />
			</ButtonGroup>
		</ConfirmationWrapper>
	);
}
