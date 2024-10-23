export interface ThemeInterface {
	colors: {
		background: {
			primary: string;
			secondary: string;
			dark: string;
			main: string;
			sidebar: string;
			cards: string;
			danger: string;
			buttons: {
				primary: string;
				secondary: string;
				toolbar: string;
			};
			mainDimmer: string;
			linear: string;
			linear2: string;
			table: {
				hover: string;
			};
			warning: string;
			success: string;
			lightDanger: string;
			overlay: string;
		};
		border: {
			primary: string;
			success: string;
			danger: string;
			active: string;
			stepper: {
				bar: string;
				circle: string;
			};
			context: string;
		};
		text: {
			primary: string;
			header: string;
			success: string;
			danger: string;
			warning: string;
			active: string;
			secondary: string;
			button: string;
			dark: string;
			white: string;
			inverted: string;
		};
		icon: {
			active: string;
			primary: string;
		};
		warning: {
			medium: string;
		};
		danger: {
			light: string;
			medium: string;
		};
		success: {
			light: string;
			medium: string;
		};
		info: {
			light: string;
			medium: string;
		};
	};
}

const sizing = {
	sizing: {
		text: {
			small: '0.9rem',
		},
	},
};

const appTheme: { dark: ThemeInterface; light: ThemeInterface } = {
	...sizing,
	dark: {
		colors: {
			background: {
				primary: '#212121',
				secondary: '#131313',
				dark: '#FFFFFF',
				main: '#6EB5B7',
				sidebar: '#383838',
				cards: '#171717',
				buttons: {
					primary: '#377E80',
					secondary: '#FFFFFF',
					toolbar: '#4B4B4B',
				},
				mainDimmer: '#6EB5B74D',
				linear: 'linear-gradient(180deg, #377E80 0%, #6EB5B7 100%)',
				linear2: 'linear-gradient(96.31deg, #00B0EF 7.57%, #00BBA0 96.87%)',
				table: {
					hover: '#4B4B4B',
				},
				warning: 'rgba(255, 159, 67, 0.12)',
				success: 'rgba(40, 199, 111, 0.12)',
				danger: '#FCECEA',
				lightDanger: 'rgba(234, 84, 85, 0.12)',
				overlay: 'rgba(51, 51, 51, 0.9)',
			},
			border: {
				primary: '#E9ECEF33',
				success: '#46C740',
				danger: '#EA5455',
				active: '#6EB5B7',
				stepper: {
					circle: '#6E6B7B',
					bar: 'rgba(233, 236, 239, 0.2)',
				},
				context: 'rgba(233, 236, 239, 0.2)',
			},
			text: {
				primary: '#FFFFFF',
				header: '#FFFFFF',
				success: '#46C740',
				danger: '#EA5455',
				warning: '#FF9F43',
				active: '#6EB5B7',
				secondary: '#BABFC7',
				button: '#FFFFFF',
				dark: '#4B4B4B',
				white: '#FFFFFF',
				inverted: '#FFFFFF',
			},
			icon: {
				active: '#6EB5B7',
				primary: '#FFFFFF',
			},
			warning: {
				medium: '#FF9F43',
			},
			danger: {
				light: '#FCECEA',
				medium: '#EA5455',
			},
			success: {
				light: '#EAFBE7',
				medium: '#46C740',
			},
			info: {
				light: '#D7F2F5',
				medium: '#00CFE8',
			},
		},
	},
	light: {
		colors: {
			background: {
				primary: '#F9F9F9',
				secondary: '#FFFFFF',
				dark: '#333333',
				main: '#377E80',
				sidebar: '#FFFFFF',
				cards: '#f4f4f4',
				buttons: {
					primary: '#377E80',
					secondary: '#FFFFFF',
					toolbar: '#E9ECEF',
				},
				mainDimmer: '#377E804D',
				linear: 'linear-gradient(180deg, #377E80 0%, #6EB5B7 100%)',
				linear2: 'linear-gradient(96.31deg, #00B0EF 7.57%, #00BBA0 96.87%)',
				table: {
					hover: '#E9ECEF',
				},
				warning: 'rgba(255, 159, 67, 0.12)',
				success: 'rgba(40, 199, 111, 0.12)',
				danger: 'rgba(234,84,85,0.12)',
				lightDanger: 'rgba(234, 84, 85, 0.12)',
				overlay: 'rgba(51, 51, 51, 0.35)',
			},
			border: {
				primary: '#d7d7d7',
				success: '#46C740',
				danger: '#EA5455',
				active: '#377E80',
				stepper: {
					circle: '#E9ECEF',
					bar: '#E9ECEF',
				},
				context: '#E9ECEF',
			},
			text: {
				primary: '#6E6B7B',
				header: '#5E5873',
				success: '#46C740',
				danger: '#EA5455',
				warning: '#FF9F43',
				active: '#377E80',
				secondary: '#BABFC7',
				button: '#FFFFFF',
				dark: '#4B4B4B',
				white: '#FFFFFF',
				inverted: '#333333',
			},
			icon: {
				active: '#377E80',
				primary: '#6E6B7B',
			},
			warning: {
				medium: '#FF9F43',
			},
			danger: {
				light: '#FCECEA',
				medium: '#EA5455',
			},
			success: {
				light: '#EAFBE7',
				medium: '#46C740',
			},
			info: {
				light: '#D7F2F5',
				medium: '#00CFE8',
			},
		},
	},
};

export default appTheme;
