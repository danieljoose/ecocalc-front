import React, { useState, createContext } from 'react'
import jwt_decode from "jwt-decode";
import AsyncStorage from '@react-native-community/async-storage'

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const key = "@ecocalc";
    const REACT_APP_GRAPHQL_URL = 'http://192.168.15.8:8080/graphql';
    
    const [ user, setUser ] = useState({
      auth: Boolean(getToken) ? Boolean(getToken) : true,
      id: null,
      email: null,
      nome: null,
    })

    const credentialsUser = (token) => {
      if(!token){
        setUser({
          auth: false,
          id: null,
          email: null,
          nome: null,
        })
        
        return
      }
      
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
      console.log('aqui foi')
    
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
      .then(data => console.log(data))
      .catch(err => console.error(err));
    };
    
    const isLogged = async () => {
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
      return true
    };
    
    const getToken = async () => {
      const token = await AsyncStorage.getItem(`${key}/token`)
      return token;
    };
    
    const getId = async () => {
      return await AsyncStorage.getItem(`${key}/id`);
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