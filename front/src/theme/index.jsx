import { createTheme } from '@mui/material/styles'

const theme = createTheme({
	palette: {
		type: 'light',
		primary: {
			main: 'hsl(185, 75%, 39%)',
			secondary: 'hsl(216, 99%, 60%)'
		},
		text: {
			primary: 'hsl(0, 0%, 16%)',
			secondary: ' hsl(0, 0%, 59%)'
		},
		background: {
			paper: 'hsl(0, 0%, 95%)',
			default: 'hsl(190, 80%, 80%)'
		}
	},
	typography: {
		body1: {
			fontSize: '1em',
			fontWeight: 700
		},
		body2: {
			fontSize: '0.65em',
			fontWeight: 400
		},
		caption: {
			fontSize: '0.90em',
			fontWeight: 700
		}
	},

	components: {
		MuiTypography: {
			defaultProps: {
				gutterBottom: true
			},
			styleOverrides: {
				root: {
					marginBottom: '0.5em',
					fontFamily: 'Kumbh Sans',
					lineHeight: 1.15
				}
			}
		}
	}
})

export default theme
