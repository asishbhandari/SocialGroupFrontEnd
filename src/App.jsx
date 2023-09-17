import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import HomePage from './pages/homepage';
import LoginPage from './pages/Loginpage';
import ProfilePage from './pages/profilepage';
// import './App.css';
import { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material'
import { createTheme } from '@mui/material/styles';
import { themeSettings } from './theme'


function App() {
  const mode = useSelector((state)=> state.mode);
  const theme= useMemo(() => createTheme(themeSettings(mode)), [mode])
  const dispatch= useDispatch();
  // const isAuth = Boolean(useSelector((state) => state.token))
  return (
    <div className='app'>
      <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/profile/:userId' element={<ProfilePage />} /> 
        </Routes>
      </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}

export default App


// element={isAuth ? <HomePage /> : <Navigate to='/' />} />
//element={isAuth ? <ProfilePage /> : <Navigate to='/' />} />