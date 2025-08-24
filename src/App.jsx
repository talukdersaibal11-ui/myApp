import { Route, Routes } from 'react-router-dom'
import './App.css'
import { LoginPage } from './pages/auth/LoginPage'
import { RegistrationPage } from './pages/auth/RegistrationPage'
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage'

function App() {

  return (
    <Routes>
      <Route path={"/"} element={<LoginPage/>}/>
      <Route path={"/register"} element={<RegistrationPage/>}/>
      <Route path={"/forget/password"} element={<ForgotPasswordPage/>}/>
    </Routes>
  )
}

export default App
