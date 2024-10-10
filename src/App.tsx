import './App.css';
import { ThemeProvider, styled } from 'styled-components';
import { RouterProvider } from 'react-router-dom';
import { GlobalStyle } from './global';
import { Suspense } from 'react';
import { useTheme } from './modules/_shared/hooks/useTheme';

function App() {
	const { theme, toggleTheme } = useTheme();
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			<AppContainer>
				<h1>Welcome to BudSync</h1>
				<button onClick={toggleTheme}>Toggle theme</button>
				<Suspense>{/* <RouterProvider router={router} /> */}</Suspense>
			</AppContainer>
		</ThemeProvider>
	);
}

export default App;

const AppContainer = styled.div`
	display: flex;
	position: relative;
	max-height: 100vh;
	overflow-y: auto;
`;
