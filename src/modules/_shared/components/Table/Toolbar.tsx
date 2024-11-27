import { StyledTableToolbar, ToolbarItems } from './styles';

interface TableToolbarProps {
	title: string;
	items: React.ReactNode[];
}

export default function TableToolbar({ title, items }: TableToolbarProps) {
	return (
		<StyledTableToolbar>
			<p>{title}</p>
			<ToolbarItems>
				{items.map((item, index) => (
					<span key={index}>{item}</span>
				))}
			</ToolbarItems>
		</StyledTableToolbar>
	);
}
