'use client';
import React, { useState, FormEvent } from 'react';
import { useAuth } from '../../Context/authContext';
import { 
  Button, Container, Grid, TextField, Typography, InputAdornment, 
  IconButton, Box, Link, Snackbar, Alert
} from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock } from '@mui/icons-material';

export const LoginForm: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>('');  // Snackbar用メッセージ
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');  // Snackbarのタイプ
    const { login, error } = useAuth();  // エラーとlogin関数を取得

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => e.preventDefault();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Form submitted, calling login function...");
        try {
            await login(email, password);
            setSnackbarMessage('ログインに成功しました');  // 成功メッセージ
            setSnackbarSeverity('success');
        } catch (err) {
            setSnackbarMessage('ログインに失敗しました');  // 失敗メッセージ
            setSnackbarSeverity('error');
        } finally {
            setShowSnackbar(true);  // スナックバーを表示
        }
    };

    const handleSnackbarClose = () => {
        setShowSnackbar(false);
    };

    return (
        <Box sx={{ mt: 8, mb: 4 }}>
            <Container maxWidth="sm">
                <Typography variant="h4" component="h1" align="center" gutterBottom>
                    ログイン
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="メールアドレス"
                                variant="outlined"
                                type="email"
                                value={email}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                                required
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Email />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="パスワード"
                                variant="outlined"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                                required
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Lock />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                size="large"
                            >
                                ログイン
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                <Box mt={3} textAlign='center'>
                    <Typography color='primary'>
                        <Link href='/Register' underline='hover'>
                            アカウントをお持ちではないですか？登録はこちら
                        </Link>
                    </Typography>
                </Box>
            </Container>

            {/* スナックバー */}
            <Snackbar
                open={showSnackbar}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={snackbarSeverity}
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}  {/* スナックバーのメッセージ表示 */}
                </Alert>
            </Snackbar>
        </Box>
    );
};