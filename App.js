import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { gql, useMutation, useQuery } from "@apollo/client";
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { ImageBackground, View } from 'react-native';
import AuthRoutes from './src/routes/AuthRoutes';
import AuthContext from './src/contexts/Auth';
import { AuthProvider } from "./src/contexts/Auth";
import auth from "./src/services/auth"
import AppRoutes from './src/routes/AppRoutes';
import Routes from './src/routes/Routes';
import { ApolloClient, InMemoryCache, HttpLink, from, ApolloProvider } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

const errorLink = onError(({ graphqlErrors, networkError}) => {
  if (graphqlErrors){
    graphqlErrors.map(({message, location, path})=>{
      console.log(`Graph Error: ${message}`)
    })
  }
})

const link = from([
  errorLink,
  new HttpLink({uri: "http://ecocalc-api.herokuapp.com/graphql"})
])


const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
});


export default function App(){
  return(
    <ApolloProvider client={client}>      
        <View style={{flex: 1}}>
          <ImageBackground
            style={{flex: 1, justifyContent: "center", width: '100%'}}
            source={ require("./src/assets/background-forms.jpg")}
            resizeMode="cover">
              <AuthProvider>
                <NavigationContainer theme={navTheme} >
                  <Routes />
                </NavigationContainer>
              </AuthProvider>
          </ImageBackground>
        </View>      
    </ApolloProvider>
  );
}
