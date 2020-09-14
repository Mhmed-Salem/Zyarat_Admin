import  { useEffect } from 'react';
import auth from '../services/authService';
import axios from 'axios';



function Logout() {

    useEffect(() => {

        const removeToken = () => {
            auth.logout()
        }
        removeToken();
        const logOut = async () => {
          axios.delete('/api/rep/logout').then(res => console.log(res));
          window.location = "/login"
        }

        logOut();
        
    }, []);

    return null
}

export default Logout


