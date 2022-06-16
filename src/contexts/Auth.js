import React, { useState, createContext } from 'react'
import jwt_decode from "jwt-decode";
import AsyncStorage from '@react-native-community/async-storage'

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const key = "@ecocalc";
    const REACT_APP_GRAPHQL_URL = 'http://192.168.15.9:8080/graphql';
    
    const [ user, setUser ] = useState({
      auth: true,
      id: null,
      email: null,
      nome: null,
    })

    const credentialsUser = async () => {
      const token = await AsyncStorage.getItem(`${key}/token`);
      const { id, email, nome } = jwt_decode(token);

      setUser({
        auth: true,
        id,
        email,
        nome
      })
    }
    const login = async (token) => {
      const { id, email, nome } = jwt_decode(token);
    
      await AsyncStorage.setItem(`${key}/token`, token);
      await AsyncStorage.setItem(`${key}/id`, JSON.stringify(id));
    
      const query = `mutation ($id: ID!) {
        registerUltimoAcesso(id: $id){
          id
          nome
        }
      }`;
      
      
      setUser({
        auth: true,
        id,
        email,
        nome
      })
    
      fetch(REACT_APP_GRAPHQL_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query,
          variables: { id },
        }),
      })
      .then(r => r.json())
      .then(async data => console.log(await getId()))
      .catch(err => console.error(err));
    };
    
    const isLogged = async () => {
      console.log(Boolean(await AsyncStorage.getItem(`${key}/token`)))
      return Boolean(await AsyncStorage.getItem(`${key}/token`));
    }
    
    
    const logout = async () => {
      await AsyncStorage.removeItem(`${key}/token`);
      await AsyncStorage.removeItem(`${key}/id`);
      setUser({
        auth: false,
        id: null,
        email: null,
        nome: null
      })
      console.log('Logout ' + Boolean(await AsyncStorage.getItem(`${key}/token`)))
      return true
    };
    
    const getToken = async () => {
      return await AsyncStorage.getItem(`${key}/token`);
    };
    
    const getId = async () => {
      return AsyncStorage.getItem(`${key}/id`);
    };
    
    const getEmail = async () => {
      const token = AsyncStorage.getItem(`${key}/token`);
      const { email } = jwt_decode(token);
      return email;
    };
    
    return (
        <AuthContext.Provider
            value={{
                login,
                isLogged,
                logout,
                getToken,
                getId,
                getEmail,
                signed: Boolean(isLogged),
                user,
                credentialsUser
            }}>
                {children}
        </AuthContext.Provider>
    )  
}

export default AuthContext;