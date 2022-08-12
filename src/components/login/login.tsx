import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { ILoginForm } from './login-form.inteface';
import ILoginResponse from './login-response.interface';
import IHttpService from '../../services/http-service/http-service.interface';
import { Alert, IconButton, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
});

export default function Login({ httpService }: { httpService: IHttpService }) {
	const navigate = useNavigate();
	const [open, setOpen] = React.useState(false);
	const handleSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	}
	const handleSnackbarSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const loginForm: ILoginForm = {
			username: data.get('username'),
			password: data.get('password'),
		}
		const response: ILoginResponse = await httpService.post("login", loginForm);
		if (response.success) {
			navigate("/home", { replace: true });
		} else {
			console.log("teste");
			setOpen(true);
		}
	}
	const snackBarContent = (
		<React.Fragment>
			<IconButton
				size="small"
				aria-label="close"
				color="inherit"
				onClick={handleSnackbarClose}
			>
				<CloseIcon fontSize="small" />
			</IconButton>
		</React.Fragment>
	);
	return (
		<>
			<ThemeProvider theme={darkTheme}>
				<Container component="main" maxWidth="xs">
					<CssBaseline />
					<Box
						sx={{
							marginTop: 8,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}
					>
						<Box component="form" onSubmit={handleSnackbarSubmit} noValidate sx={{ mt: 1 }}>
							<TextField
								margin="normal"
								required
								fullWidth
								id="username"
								label="Username"
								name="username"
								autoComplete="username"
								autoFocus
							/>
							<TextField
								margin="normal"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="current-password"
							/>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								sx={{ mt: 3, mb: 2 }}
							>
								{"Sign In"}
							</Button>
						</Box>
					</Box>
				</Container>
				<Snackbar
					open={open}
					autoHideDuration={5000}
					onClose={handleSnackbarClose}
					message="Wrong credentials"
					action={snackBarContent}
				>
					<Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
						{"Wrong credentinals"}
					</Alert>
				</Snackbar>
			</ThemeProvider>
		</>

	)
};