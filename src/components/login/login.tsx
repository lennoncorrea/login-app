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
import Loading from '../loading/loading';
import ErrorSnackBar from '../snackbar/error-snackbar';


const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
});

export default function Login({ httpService }: { httpService: IHttpService }) {
	const navigate = useNavigate();
	const [openSnackbar, setOpenSnackbar] = React.useState(false);
	const [openLoading, setOpenLoading] = React.useState(false);
	const handleButtonSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const loginForm: ILoginForm = {
			username: data.get('username'),
			password: data.get('password'),
		}
		setOpenLoading(true);
		const response: ILoginResponse = await httpService.post("login", loginForm);
		setOpenLoading(false);
		if (response === undefined) {
			throw new Error("Invalid login response");
		}
		if (response.success) {
			navigate("/home", { replace: true });
		} else {
			setOpenSnackbar(true);
		}
	}
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
						<Box component="form" onSubmit={handleButtonSubmit} noValidate sx={{ mt: 1 }}>
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
				<ErrorSnackBar
					open={openSnackbar}
					setOpen={setOpenSnackbar}
					message={"Invalid credentials"}
					type={"error"}
				/>
				<Loading open={openLoading} />
			</ThemeProvider>
		</>
	)
};