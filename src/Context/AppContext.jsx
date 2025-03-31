import axios from 'axios';
import React, {  createContext, useContext, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';


const GlobalContext = createContext();

export function AppDataProvider ({ children }){
    const  navigate = useNavigate()
    const [projectHistory, setProjectHiostry] = useState(localStorage.getItem('history') ||  [])
   const [walletAdd, setWalletAdd] = useState(localStorage.getItem('wallet') || '')
    const user_id = 1
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
    const api_endpoint = 'http://127.0.0.1:8000'
    //const api_endpoint = 'https://learnmax-backend.onrender.com/'
    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.body.className = theme;
    }, [theme]);


   
 
    return (
        <GlobalContext.Provider value={{
            theme,
            setTheme,
            api_endpoint,
            user_id,
            walletAdd,
            setWalletAdd,
            projectHistory,
            setProjectHiostry
        }}>
            {children}
        </GlobalContext.Provider>
    );
}

export function useMyContext() {
    return useContext(GlobalContext);
}