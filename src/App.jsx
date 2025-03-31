import { Routes, Route } from "react-router-dom"
import './App.css'
//import MainPage from './elementsPages/MainPage'
import {AppDataProvider} from './Context/AppContext'
import MainPage from "./Landingpage/MainPage"
import HomePage from "./IDE/HomePage"
import CreatePage from "./IDE/CreatePage"
import SideBar from "./IDE/SideBar"


function App() {

  return (
    <AppDataProvider>
    <Routes>
    <Route path="/" element={ <MainPage/> } />
    <Route path="/homepage" element={ <HomePage/> } />
    <Route path="/create" element={ <CreatePage/> } />
    <Route path="/test" element={ <SideBar/> } />

  </Routes>
    </AppDataProvider>
  )
}

export default App
