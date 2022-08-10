import React , { useMemo, useState, useEffect, useContext } from 'react'
import { useForm } from 'react-hook-form'
import styled, { css } from '@emotion/native'
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native'
import EcoCalc from "../../assets/ecocalc.svg";
import Pig from "../../assets/pig.svg";
import AuthContext from '../../contexts/Auth';
import { Subtitle, TouchableText, SmallText } from "../../style/texts"
import { gql, useApolloClient, useMutation } from "@apollo/client";
import { Stack, IconButton } from "@react-native-material/core";
import { Input } from "../../components/Input"
import { PressableButton } from "../../style/button"
import { loginValidation } from './validation';
import { Formik } from 'formik';


const SIGN_IN = gql`
  mutation ($login: String!, $senha: String!) {
    signin(login: $login, senha: $senha) {
      token
    }
  }
`;

const Login = ({ navigation }) => {
    const client = useApolloClient();
    const [badLogin, setBadLogin] = useState(false)

    const { login, isLogged } = useContext(AuthContext)
    const [signIn, { loading }] = useMutation(SIGN_IN, {
        onError: (err) => {
          if (/bad_credentials/.exec(err.message)) {
            setBadLogin(true)
            console.log('erro')
          }
        },
        onCompleted: async (e) => {
            await login(e.signin.token)    
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

            <Formik
                initialValues={{ email: '', senha: '' }}
                onSubmit={values => onSubmit(values)}
                validationSchema={loginValidation}
            >
                {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
                     <>
                        <Stack style={{width: '75%'}}>
                            <Input placeholder="E-mail" style={{marginTop: 30}} onChangeText={(e)=>{setFieldValue('email', e); badLogin && setBadLogin(false)}} onBlur={handleBlur('email')} value={values.nome}/>
                            {errors.email && touched.email ? (
                                <Text style={styles.errors}>{errors.email}</Text>
                            ) : null}
                            <Input placeholder="Senha" secureTextEntry={true} style={{marginTop: 10, marginBottom: 30}} onChangeText={(e)=>{setFieldValue('senha', e); badLogin && setBadLogin(false)}} onBlur={handleBlur('senha')} value={values.senha}/>      
                            {errors.senha && touched.senha ? (
                                <Text style={styles.errors}>{errors.senha}</Text>
                            ) : badLogin ? (
                                <Text style={styles.errors}>O e-mail ou senha está incorreto</Text>
                            ): null}          
                        </Stack>
                        
                        <PressableButton
                            onPress={handleSubmit}
                            title='Entrar'
                            style={{marginTop: '20px'}}
                        />
                    </>
                )}
            </Formik>

            <View style={{flexDirection: 'row'}}>                
                    <SmallText>
                        Ainda não possui uma conta?
                    </SmallText>
                <TouchableOpacity onPress={()=>navigation.navigate('Cadastro')}> 
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
    errors: {
        marginLeft: 15,
        marginBottom: 15,
        color: 'red',
        fontSize: 11,
        fontFamily: "Montserrat-Medium"
    },

 })