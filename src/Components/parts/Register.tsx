'use client';
import React, { useState, FormEvent } from 'react';
import {
  Button, Container, Grid, TextField, Typography, InputAdornment,
  IconButton, Alert, Box, Snackbar, Card,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';

export const RegisterForm: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => e.preventDefault();

  const API_LINK = process.env.NEXT_PUBLIC_BACKEND_DEV_URL;
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const passwordCheck = /^(?=.*[a-zA-Z](?=.*\d)[a-zA-Z\d]{8,}$)/;
    if(!passwordCheck.test(password)){
      setAlertMessage('パスワードは8文字以上の英数字で設定してください');
      setShowSnackbar(true);
      return;
    }
    try {
      const res = await fetch(`${API_LINK}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          authority: "student",
        })
      });
      if (res.ok) {
        setShowSnackbar(true);
        setAlertMessage('ユーザー登録に成功しました');
      } else {
        setShowSnackbar(true);
        setAlertMessage('ユーザー登録に失敗しました');
      }
    } catch (err) {
      setShowSnackbar(true);
      setAlertMessage('エラーが発生しました');
    }
  }

  const handleSnackbarClose = () => {
    setShowSnackbar(false);
  }

  return (
    <Box sx={{ mt: 8, mb: 4 }}>
      <form onSubmit={ handleSubmit }>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="名前"
              variant="outlined"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
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
                    <EmailIcon />
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
                    <LockIcon />
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
                      {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
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
              登録
            </Button>
          </Grid>
        </Grid>
      </form>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClick={handleSnackbarClose}
          severity={alertMessage === 'ユーザー登録に成功しました' ? 'success' : 'error'}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </Box>
  )
};
