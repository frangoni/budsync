import { Table } from 'antd';
import { styled } from 'styled-components';

export const StyledTable = styled(Table)`
	.ant-table {
		background-color: ${({ theme }) => theme.colors.background.secondary};
		color: ${({ theme }) => theme.colors.text.primary};

		th,
		td,
		.ant-table-title,
		.ant-table-container {
			border: 1px solid ${({ theme }) => theme.colors.border.primary} !important;
		}

		th {
			background-color: ${({ theme }) => theme.colors.background.primary} !important;
			color: ${({ theme }) => theme.colors.text.primary} !important;
		}

		.ant-table-tbody > tr.ant-table-row:hover > td {
			background-color: ${({ theme }) => theme.colors.background.primary} !important;
		}

		.ant-table-tbody > tr > td {
			border: 1px solid ${({ theme }) => theme.colors.border.primary};
		}

		.ant-table-row-selected > td {
			background-color: ${({ theme }) => theme.colors.background.primary} !important;
		}
	}
`;
