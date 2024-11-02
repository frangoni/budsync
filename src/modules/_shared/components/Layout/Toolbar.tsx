import AppButton from '../Button';
import { ToolbarWrapper } from './styles';

interface ToolbarItem {
	icon: React.ReactNode;
	onClick: () => void;
	text: string;
	disabled?: boolean;
}

interface ToolbarProps {
	items: ToolbarItem[];
}

export default function Toolbar({ items }: ToolbarProps) {
	return (
		<ToolbarWrapper>
			{items.map((item, index) => {
				const { icon, onClick, text, disabled } = item;
				return (
					<AppButton
						key={index}
						onClick={onClick}
						text={text}
						iconPosition='end'
						icon={icon}
						buttonType='secondary'
						disabled={disabled}
					/>
				);
			})}
		</ToolbarWrapper>
	);
}
