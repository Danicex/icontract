import { BrowserRouter } from "react-router-dom";
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Web3Provider} from './Web3Provider'

createRoot(document.getElementById('root')).render(
  <Web3Provider>
  <BrowserRouter>
  <App />
</BrowserRouter>
  </Web3Provider>
)
