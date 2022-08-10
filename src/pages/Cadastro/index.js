import React, { useEffect, useState } from 'react'
import { set, useForm } from 'react-hook-form'
import { gql, useQuery, useMutation } from "@apollo/client";
import { View, TextInput, StyleSheet, TouchableOpacity, Text} from 'react-native'
import { Subtitle, TouchableText, SmallText, Title } from "../../style/texts"
import EcoCalc from "../../assets/ecocalc.svg";
import Pig from "../../assets/pig.svg";
import { Stack, IconButton } from "@react-native-material/core";
import { Input } from "../../components/Input"
import { PressableButton } from "../../style/button"
import { Formik } from 'formik';
import { cadastroValidation } from './validation';
import * as yup from "yup";

const GET_USUARIO_BY_ID = gql`
  query($id: ID!) {
    getUsuarioById(id: $id) {
        id
        nome
    }
  }
`;

const CADASTRAR_USUARIO = gql`
  mutation($nome: String!, $sobrenome: String!, $email: String!, $senha: String!) {
    cadastrarUsuario(nome: $nome, sobrenome: $sobrenome, email: $email, senha: $senha) {
        id
        nome
        email
    }
  }
`;


const Cadastro = ({ navigation }) =>{
    const [emailAlreadyUse, setEmailAlreadyUse] = useState(false)

    // const cadastroValidation = yup
    // .object({
    //     nome: yup
    //     .string()
    //     .required('O campo "Nome" é obrigatório'),
    //     sobrenome: yup
    //     .string()
    //     .required('O campo "Sobrenome" é obrigatório'),
    //     email: yup
    //     .string()
    //     .email('O e-mail digitado é inválido')
    //     .required('O campo "Email" é obrigatório'),
    //     senha: yup.string().required('O campo "Senha" é obrigatório'),   
    // })


    const {data: dataUser, loading: loadingUser } = useQuery(GET_USUARIO_BY_ID, {
        variables: {
            id: 1
        },
        onCompleted: (e) => {
        },
        onError: (e)=>{
        }
    })

    const [cadastrarUsuario] = useMutation(CADASTRAR_USUARIO, {
        onCompleted: (e) =>{
            navigation.navigate('Login')
        },
        onError: (err)=> {
            if (/email_already_exists/.exec(err)) {
                setEmailAlreadyUse(true)
            }
        }
    })

    const onSubmit = ({nome, sobrenome, email, senha}) => {
        cadastrarUsuario({
            variables: {
                nome,
                sobrenome,
                email,
                senha
            }
        })
    }
    
    return (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <EcoCalc style={{marginBottom: 60}}/>
            <Subtitle style={{maxWidth: '80%', textAlign: 'center'}}>
                {`Preencha os dados abaixo para\ncriar uma conta no EcoCalc`}
            </Subtitle>

            <Formik
                initialValues={{ email: '', nome: '', sobrenome: '', senha: '' }}
                onSubmit={values => onSubmit(values)}
                validationSchema={cadastroValidation}
            >
                {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
                    <>
                    
                    <Stack style={{width: '75%'}}>
                        <Input placeholder="Nome" placeholderTextColor="#6c908a" style={{marginTop: 30}} onChangeText={handleChange('nome')} onBlur={handleBlur('nome')} value={values.nome}/>
                        {errors.nome && touched.nome ? (
                            <Text style={styles.errors}>{errors.nome}</Text>
                        ) : null}
                        <Input placeholder="Sobrenome" placeholderTextColor="#6c908a" style={{marginTop: 10, marginBottom: 30}} onChangeText={handleChange('sobrenome')} onBlur={handleBlur('sobrenome')} value={values.sobrenome}/>  
                        {errors.sobrenome && touched.sobrenome ? (
                            <Text style={styles.errors}>{errors.sobrenome}</Text>
                        ) : null}   
                        <Input placeholder="E-mail" placeholderTextColor="#6c908a" style={{marginTop: 10, marginBottom: 30}} onChangeText={(e)=>{setFieldValue('email', e); emailAlreadyUse && setEmailAlreadyUse(false)}} onBlur={handleBlur('email')} value={values.email}/> 
                        {errors.email && touched.email ? (
                            <Text style={styles.errors}>{errors.email}</Text>
                        ) : emailAlreadyUse ? (
                            <Text style={styles.errors}>E-mail digitado já está em uso</Text>
                        ): null}
                        <Input placeholder="Senha" placeholderTextColor="#6c908a" secureTextEntry={true} style={{marginTop: 10, marginBottom: 30}} onChangeText={handleChange('senha')} onBlur={handleBlur('senha')} value={values.senha}/>            
                        {errors.senha && touched.senha ? (
                            <Text style={styles.errors}>{errors.senha}</Text>
                        ) : null}
                    </Stack>

                    <PressableButton
                        onPress={handleSubmit}
                        title='Cadastrar'
                        style={{marginTop: '20px'}}
                    />
                    </>
            )}
            </Formik>

            <View style={{flexDirection: 'row'}}>                
                    <SmallText>
                        Já possui uma conta?
                    </SmallText>
                <TouchableOpacity onPress={()=>navigation.navigate('Login')}> 
                    <TouchableText>
                        {` Faça seu login`}
                    </TouchableText>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Cadastro

const styles = StyleSheet.create({
    errors: {
       marginLeft: 15,
       color: 'red',
       fontSize: 11,
       fontFamily: "Montserrat-Medium"
    },
 })