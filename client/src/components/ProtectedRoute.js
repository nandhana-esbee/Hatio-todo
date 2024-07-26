import {useState,useEffect} from 'react';
import api from '../api';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import { ACCESS_TOKEN,REFRESH_TOKEN } from '../constants';


function ProtectedRoute({children}){
    const[isAuthorized,setIsAuthorized] = useState(null);

    //calls the auth function and catch the error if the user is not authorized
    useEffect(() => {
        auth().catch(() => setIsAuthorized(false));
    },[])

    //refresh the access token
    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        if(!refreshToken){
            setIsAuthorized(false);
            return;
        }
        try{
            const response = await api.post('/userconf/token/refresh/', {refresh:refreshToken});
            if(response.status === 200){
                localStorage.setItem('ACCESS_TOKEN',response.data.tokens['access']);
                setIsAuthorized(true);
            }
            else{
                setIsAuthorized(false);
            }
        }
        catch(error){
            console.log(error);
            setIsAuthorized(false);
        }
    }

    //check if the access token expires or not
    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if(!token){
            setIsAuthorized(false);
            return;
        }

        const decoded = jwtDecode(token);
        const Exp = decoded.exp;
        const now = Date.now() / 1000;
        if(now>Exp){
            await refreshToken();
        }
        else{setIsAuthorized(true);}
    }

    if(isAuthorized === null){
        return <div>Loading...</div>
    }
    
    //if the user is not authorized then redirect to login page
    return isAuthorized ? children : <Navigate to="/login" />

}

export default ProtectedRoute;