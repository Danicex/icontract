import { Routes, Route } from "react-router-dom"
import './App.css'
//import MainPage from './ComponentsPages/MainPage'
import {AppDataProvider} from './Context/AppContext'
import MainPage from "./Landingpage/MainPage"
import HomePage from "./IDE/HomePage"
import CreatePage from "./IDE/CreatePage"
import SideBar from "./IDE/SideBar"
import Login from "./Auth/Login"
import Signup from "./Auth/Signup"
import ConnectWallet from "./IDE/ConnectWallet"
function App() {

  return (
    <AppDataProvider>
    <Routes>
    <Route path="/" element={ <MainPage/> } />
    <Route path="/homepage" element={ <HomePage/> } />
    <Route path="/create" element={ <CreatePage/> } />
    <Route path="/test" element={ <SideBar/> } />
    <Route path="/login" element={ <Login/> } />
    <Route path="/register" element={ <Signup/> } />
    <Route path="/connect" element={ <ConnectWallet/> } />
  </Routes>
    </AppDataProvider>
  )
}

export default App
