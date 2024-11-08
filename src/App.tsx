import './App.css';
import { ThemeProvider, styled } from 'styled-components';
import { RouterProvider } from 'react-router-dom';
import { GlobalStyle } from './global';
import { Suspense } from 'react';
import { useTheme } from './modules/_shared/hooks/useTheme';
import router from './modules/routes';
import { useGetUserQuery } from './redux/reducers/users';

function App() {
	const { theme } = useTheme();
	const { data } = useGetUserQuery(null);
	console.log(data);

	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			<AppContainer>
				<Suspense>
					<RouterProvider router={router} />
				</Suspense>
			</AppContainer>
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
