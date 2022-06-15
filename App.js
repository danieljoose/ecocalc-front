import 'react-native-gesture-handler';
import React from 'react';
import { gql, useMutation, useQuery } from "@apollo/client";
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { ImageBackground, View } from 'react-native';
import AuthRoutes from './src/routes/AuthRoutes';
import AppRoutes from './src/routes/AppRoutes';
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
  new HttpLink({uri: "http://192.168.15.9:8080/graphql"})
])


const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
});



const logged = false
export default function App(){
  return(
    <ApolloProvider client={client}>
      <View style={{flex: 1}}>
        <ImageBackground
          style={{flex: 1, justifyContent: "center", width: '100%'}}
          source={ require("./src/assets/background-forms.jpg")}
          resizeMode="cover">
          <NavigationContainer theme={navTheme} >
            {logged ? <AuthRoutes/> : <AppRoutes/>}
          </NavigationContainer>
        </ImageBackground>
      </View>
    </ApolloProvider>
  );
}
