import AppButton from '../Button';
import { ToolbarWrapper } from './styles';

interface ToolbarItem {
	icon: any;
	onClick: () => void;
	text: string;
}

interface ToolbarProps {
	items: ToolbarItem[];
}

export default function Toolbar({ items }: ToolbarProps) {
	return (
		<ToolbarWrapper>
			{items.map((item, index) => {
				const { icon, onClick, text } = item;
				return (
					<AppButton
						key={index}
						onClick={onClick}
						text={text}
						iconPosition='end'
						icon={icon}
						buttonType='secondary'
					/>
				);
			})}
		</ToolbarWrapper>
	);
}
