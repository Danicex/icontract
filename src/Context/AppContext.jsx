import axios from 'axios';
import React, {  createContext, useContext, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';


const GlobalContext = createContext();

export function AppDataProvider ({ children }){
    const   navigate = useNavigate()
    const [isAuth, setIsAuth] = useState(false)
    const [AuthCredentials, setAuthCredentials] = useState(localStorage.getItem('credentials') || {});
    const user_id = 1
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
    const api_endpoint = 'http://127.0.0.1:8000'
    //const api_endpoint = 'https://learnmax-backend.onrender.com/'
    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.body.className = theme;
    }, [theme]);


    const login = async (email, password) => {    
        try {
            // Send login request with form data
            const response = await axios.post(`${api_endpoint}/token`, 
                new URLSearchParams({ username: email, password: password }), 
                { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
            );
    
            // Extract access token
            const { access_token } = response.data;
            
            // Save token in localStorage
            localStorage.setItem("access_token", access_token);
            console.log("Login successful:", response.data);
            
            // Redirect to homepage after login
            navigate('/homepage');
    
        } catch (error) {
            console.error("An error occurred:", error.response?.data || error.message);
        }
    };
    

    const signup = async (email, password)=>{
        try{
            const response = await axios.post(`${api_endpoint}/register`, {
                email,
                password
            });
            setIsAuth(true);
            const x =  response.data
            localStorage.setItem('credentials', x.resource_owner )
        } catch{
            console.log("an err  occored")
        }
        
    }
 
    return (
        <GlobalContext.Provider value={{
            theme,
            setTheme,
            api_endpoint,
            login,
            signup,
            user_id
        }}>
            {children}
        </GlobalContext.Provider>
    );
}

export function useMyContext() {
    return useContext(GlobalContext);
}