import './App.css';
import { ThemeProvider, styled } from 'styled-components';
import { RouterProvider } from 'react-router-dom';
import { GlobalStyle } from './global';
import { Suspense } from 'react';
import { useTheme } from './modules/_shared/hooks/useTheme';
import router from './modules/routes';
import { ConfigProvider } from 'antd';

function App() {
	const { theme } = useTheme();

	return (
		<ThemeProvider theme={theme}>
			<ConfigProvider
				theme={{
					token: {
						colorPrimary: theme.colors.background.main,
						colorBgBase: theme.colors.background.cards,
						colorTextBase: theme.colors.text.primary,
						colorBgElevated: theme.colors.background.cards,
						colorBgContainer: theme.colors.background.primary,
						controlItemBgActive: theme.colors.background.mainDimmer,
					},
				}}
			>
				<GlobalStyle />
				<AppContainer>
					<Suspense>
						<RouterProvider router={router} />
					</Suspense>
				</AppContainer>
			</ConfigProvider>
		</ThemeProvider>
	);
}

export default App;

const AppContainer = styled.div`
	display: flex;
	flex-direction: column;
	position: relative;
	height: 100vh;
	width: 100vw;
	overflow-y: auto;
	background-color: ${({ theme }) => theme.colors.background.primary};
	color: ${({ theme }) => theme.colors.text.primary};
	transition: background-color 0.3s ease;
`;
