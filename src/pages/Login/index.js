import React , { useMemo, useEffect, useContext } from 'react'
import { useForm } from 'react-hook-form'
import styled, { css } from '@emotion/native'
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import EcoCalc from "../../assets/ecocalc.svg";
import Pig from "../../assets/pig.svg";
import AuthContext from '../../contexts/Auth';
import { Subtitle, TouchableText, SmallText } from "../../style/texts"
import { gql, useApolloClient, useMutation } from "@apollo/client";
import { Stack, IconButton } from "@react-native-material/core";
import { Input } from "../../components/Input"
import { PressableButton } from "../../style/button"

const SIGN_IN = gql`
  mutation ($login: String!, $senha: String!) {
    signin(login: $login, senha: $senha) {
      token
    }
  }
`;

const Login = ({ navigation }) => {
    const client = useApolloClient();
    const { login, isLogged } = useContext(AuthContext)
    const { register, setValue, handleSubmit } = useForm()
    const [signIn, { loading }] = useMutation(SIGN_IN, {
        onError: (err) => {
          if (/bad_credentials/.exec(err.message)) {
            // enqueueSnackbar("Usuário ou senha incorretos", {
            //   variant: "error",
            //   anchorOrigin: {
            //     vertical: "top",
            //     horizontal: "center",
            //   },
            // });
            console.log('erro')
          }
        },
        onCompleted: async (e) => {


          // navigation.navigate('Dashboard')
            await login(e.signin.token)
        
        
        //   const redirectPath = query.get("redirectPath");
        //   if (redirectPath) {
        //     replace(redirectPath);
        //   } else {
        //     push("/");
        //   }
        },
      });

    const onSubmit = async ({email, senha}) => {
        signIn({
            variables: {
                login: email,
                senha
            }
        })
        // console.log(await auth.getId())
    }

    return (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <EcoCalc style={{marginBottom: 60}}/>
            <Pig style={{marginBottom: 20}}/>
            <Subtitle style={{maxWidth: '80%', textAlign: 'center'}}>
                {`Faça seu login para ter\n controle das suas despesas`}
            </Subtitle>

            <Stack style={{width: '75%'}}>
                <Input placeholder="E-mail" style={{marginTop: 30}} onChangeText={text => setValue('email', text)}/>
                <Input placeholder="Senha" secureTextEntry={true} style={{marginTop: 10, marginBottom: 30}} onChangeText={text => setValue('senha', text)}/>                
            </Stack>

            <PressableButton
                onPress={handleSubmit(onSubmit)}
                title='Entrar'
                style={{marginTop: '20px'}}
            />

            <View style={{flexDirection: 'row'}}>                
                    <SmallText>
                        Ainda não possui uma conta?
                    </SmallText>
                <TouchableOpacity onPress={async ()=>console.log(await isLogged())}> 
                    <TouchableText>
                        {` Cadastre-se`}
                    </TouchableText>
                </TouchableOpacity>
            </View>
        </View>
        
    )
}

export default Login

const styles = StyleSheet.create({
    input: {
       margin: 15,
       height: 40,
       color: 'red',
       background: 'red',
       backgroundColor: 'red',
       borderColor: '#7a42f4',
       borderWidth: 1
    },
 })