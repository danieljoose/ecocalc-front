import React, { useContext, useEffect, useState } from "react";
import AuthContext from '../contexts/Auth';
import AuthRoutes from './AuthRoutes';
import AppRoutes from './AppRoutes';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';


const Routes = () => {
    const { user } = useContext(AuthContext);
    const [ isLogged, setIsLogged ] = useState()


    return user.auth ? <AuthRoutes/> : <AppRoutes/>    
}

export default Routes