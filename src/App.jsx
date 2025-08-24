import { Route, Routes } from 'react-router-dom'
import './App.css'
import { LoginPage } from './pages/auth/LoginPage'
import { RegistrationPage } from './pages/auth/RegistrationPage'

function App() {

  return (
    <Routes>
      <Route path={"/"} element={<LoginPage/>}/>
      <Route path={"/register"} element={<RegistrationPage/>}/>
    </Routes>
  )
}

export default App
