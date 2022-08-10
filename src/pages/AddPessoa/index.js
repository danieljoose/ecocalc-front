import React, { useContext, useEffect, useState } from 'react'
import styled, { css } from '@emotion/native'
import { View, TextInput, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native'
import { useForm } from 'react-hook-form'
import IconAddPessoa from "../../assets/add-pessoa.svg";
import PickerCustom from '../../components/PickerCustom';
import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import { Stack, IconButton } from "@react-native-material/core";
import { Input } from "../../components/Input"
import { PressableButton } from "../../style/button"
import { Subtitle, TouchableText, SmallText, Title } from "../../style/texts"
import AuthContext from '../../contexts/Auth';
import * as yup from "yup";
import { Formik } from 'formik';

const ADD_PESSOA = gql`
  mutation($nome: String!, $sobrenome: String!, $residenciaId: ID, $usuarioId: ID!) {
    cadastrarPessoa(nome: $nome, sobrenome: $sobrenome, residenciaId: $residenciaId, usuarioId: $usuarioId) {
      id
      nome
    }
  }
`;

const GET_RESIDENCIA = gql`
  query($usuarioId: ID!) {
    getResidencias(usuarioId: $usuarioId) {
      id
      nome
    }
  }
`;



const AddPessoa = ({ navigation }) => {
    const { logout, user, signed, credentialsUser, getId  } = useContext(AuthContext)
    const { register, setValue, handleSubmit, watch } = useForm()
    const [selectedValue, setSelectedValue] = useState(null);

    const validation = yup
      .object({
          nome: yup
          .string()
          .required('Informe o nome desta pessoa'),
          sobrenome: yup
          .string()
          .required('Informe o sobrenome desta pessoa'),
          residenciaId: yup.string().notRequired(),   
          
      })

    const { data: dataResidencias, loading: loadingResidencias, refetch } = useQuery(GET_RESIDENCIA, {
      variables: {
        usuarioId: user.id
      },
      // onCompleted: (e)=>{
      //   // console.log(e.getResidencias[0]?.id)
      //   setSelectedValue(e.getResidencias[0]?.id)
      //   // console.log(selectedValue)
      // }
    })
    
    const [cadastrarPessoa, { loading }] = useMutation(ADD_PESSOA, {
        onError: (err) => {
            console.log(err)          
        },
        onCompleted: (e) => {
          refetch()
          navigation.navigate('Adicionar pessoa ')
        },
      });


    const onSubmit = async ({nome, sobrenome, residenciaId}) => {
        const usuarioId = await getId()
        cadastrarPessoa({
            variables: {
                nome,
                sobrenome,
                residenciaId,
                usuarioId
            }
        })
        // console.log(await auth.getId())
    }

    return (
        <View style={{alignItems: 'center', flex: 1, paddingHorizontal: 30 }}>

            <IconAddPessoa style={{marginTop: '10%'}}/>

            <Subtitle style={{fontSize: 15, marginTop: '10%'}}>
            Cadastre uma nova pessoa para gerenciar
            e visualizar seus gastos mensais.</Subtitle>           


            <Formik
                initialValues={{ nome: '', sobrenome: '', residenciaId: '' }}
                onSubmit={values => onSubmit(values)}
                validationSchema={validation}
            >
                {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
                     <>
                      <Stack style={{width: '90%'}}>
                          <Input placeholder="Nome" style={{marginTop: '15%'}} onChangeText={text => setFieldValue('nome', text)}/>
                          {errors.nome && touched.nome ? (
                                <Text style={[styles.errors]}>{errors.nome}</Text>
                            ) : null}
                          <Input placeholder="Sobrenome"  style={{marginTop: "3%"}} onChangeText={text => setFieldValue('sobrenome', text)}/>
                          {errors.sobrenome && touched.sobrenome ? (
                                <Text style={[styles.errors]}>{errors.sobrenome}</Text>
                            ) : null}
                          {/* <Input placeholder="Residência (opcional)" secureTextEntry={true} style={{marginTop: "3%", marginBottom: '15%'}} onChangeText={text => setValue('residenciaId', text)}/>      */}
                          <PickerCustom
                              selectedValue={selectedValue}
                              onChange={(e)=>{
                                setSelectedValue(e)
                                setFieldValue('residenciaId', e)
                              }}
                              optionalLabel='Selecione uma residência (opcional)'
                              data={dataResidencias?.getResidencias}
                              fonte={14}
                              color="#AFE9DE"
                          />           
                      </Stack>
                    

                      <PressableButton
                          onPress={handleSubmit}
                          title='Entrar'
                          style={{marginTop: '10%'}}
                      />
                    </>
                )}
              </Formik>
        </View>
    )
}

export default AddPessoa

const styles = StyleSheet.create({
  errors: {
      marginLeft: 15,
      marginBottom: 15,
      color: 'red',
      fontSize: 11,
      fontFamily: "Montserrat-Medium"
  },

})