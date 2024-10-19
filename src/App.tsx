import './App.css';
import { ThemeProvider, styled } from 'styled-components';
import { RouterProvider } from 'react-router-dom';
import { GlobalStyle } from './global';
import { Suspense } from 'react';
import { useTheme } from './modules/_shared/hooks/useTheme';
import router from './modules/routes';
import { useGetUserQuery } from './redux/reducers/user';

function App() {
	const { theme, toggleTheme } = useTheme();
	const { data } = useGetUserQuery(null);

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
	max-height: 100vh;
	overflow-y: auto;
`;
