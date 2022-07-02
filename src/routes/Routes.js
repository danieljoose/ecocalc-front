import React, { useContext, useEffect, useState } from "react";
import AuthContext from '../contexts/Auth';
import AuthRoutes from './AuthRoutes';
import AppRoutes from './AppRoutes';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';


const Routes = () => {
    const { user, isLogged, credentialsUser, getToken } = useContext(AuthContext);
    const [logado, setLogado] = useState()

    useEffect(()=>{
      (async ()=> {
        setLogado(await getToken())
      })()
    }, [getToken])

    useEffect(()=>{
      credentialsUser(logado)
    }, [logado])

    return (<>
        {logado ? (<AuthRoutes/>) : (<AppRoutes/>)}
    </>)
}

export default Routes