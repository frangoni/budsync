import { Table } from 'antd';
import { styled } from 'styled-components';

export const StyledTable = styled(Table)`
	.ant-table {
		background-color: ${({ theme }) => theme.colors.background.secondary};
		color: ${({ theme }) => theme.colors.text.primary};
		overflow-x: auto;

		th,
		td,
		.ant-table-title,
		.ant-table-container {
			border: none !important;
		}

		th {
			background-color: ${({ theme }) => theme.colors.background.primary} !important;
			color: ${({ theme }) => theme.colors.text.primary} !important;
			border: 1px solid ${({ theme }) => theme.colors.border.context} !important;

			&.ant-table-cell::before {
				height: 0rem !important;
			}
		}

		.ant-table-tbody > tr.ant-table-row:hover > td {
			background-color: ${({ theme }) => theme.colors.background.primary} !important;
		}

		.ant-table-tbody > tr > td {
			border: 1px solid ${({ theme }) => theme.colors.border.context} !important;
		}

		.ant-table-row-selected > td {
			background-color: ${({ theme }) => theme.colors.background.primary} !important;
		}
	}

	.ant-pagination {
		a {
			color: ${({ theme }) => theme.colors.text.button};
		}
		.ant-pagination-item {
			border: 1px solid ${({ theme }) => theme.colors.border.active};
			background-color: ${({ theme }) => theme.colors.background.secondary};
		}
		.ant-pagination-item-active {
			border: 1px solid ${({ theme }) => theme.colors.border.primary};
			background-color: ${({ theme }) => theme.colors.background.main};
		}
		.ant-pagination-item-link {
			color: ${({ theme }) => theme.colors.text.button};

			&[disabled] {
				opacity: 0.1;
				cursor: not-allowed;
			}
		}
	}
`;
