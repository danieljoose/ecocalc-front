import React, { useState, useContext, useEffect } from 'react'
import { View, Text, StyleSheet } from "react-native";
import { useForm } from 'react-hook-form'
import IconDespesa from "../../assets/icon-despesa.svg";
import { Subtitle, TitleLight, SmallText, Title , Pressable, TouchableWithoutFeedback} from "../../style/texts"
import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import { Stack, IconButton } from "@react-native-material/core";
import { PressableButton } from "../../style/button"
import { Input } from "../../components/Input"
import MaskInput, { createNumberMask } from 'react-native-mask-input';
import DatePickerCustom from '../../components/DatePicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { despesaResidenciaValidation } from './validation';
import { Formik } from 'formik';
import PickerCustom from '../../components/PickerCustom';
import AuthContext from '../../contexts/Auth';


const GET_RESIDENCIAS = gql`
    query($usuarioId: ID!) {
        getResidencias(usuarioId: $usuarioId) {
            id
            nome
        }
    }
`

const ADD_DESPESA = gql`
    mutation($titulo: String!, $data: DateTime!, $valor: BigDecimal!, $residenciaId: ID, $pessoaId: ID, $usuarioId: ID!) {
        cadastrarDespesa(titulo: $titulo, data: $data, valor: $valor, residenciaId: $residenciaId, pessoaId: $pessoaId, usuarioId: $usuarioId) {
            id
            titulo
            valor
            data
        }
    }
`

const DespesaResidencial = ({navigation}) => {
    const moneyMask = createNumberMask({
        prefix: ['R', '$', ' '],
        delimiter: '.',
        separator: ',',
        precision: 2,
      })
      
    const [selectedValue, setSelectedValue] = useState(null);
    const { user, getId } = useContext(AuthContext)
    const [date, setDate] = useState(new Date());
    const [valor, setValor] = useState()
    const { register, setValue, handleSubmit, watch } = useForm()

    const {data: dataResidencias, loading: loadingResidencias, refetch} = useQuery(GET_RESIDENCIAS, {
        variables: {
            usuarioId: user.id
          },
    })

    useEffect(()=>{
        refetch()
    }, [])

    const [addDespesa, { data: dataAddDespesa, loading: loadingAddDespesa }] = useMutation(ADD_DESPESA, {
        onCompleted: (e) => {
            navigation.navigate('AddDespesaSuccess')
        },
        onError: (e) =>{
            console.log(e)
        }
    })

    const onSubmit = async ({titulo, data, valor, residenciaId}) => {
        const usuarioId = await getId()
        addDespesa({
            variables: {
                titulo,
                data,
                valor,
                residenciaId,
                usuarioId
            }
        })
    }

    return (
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 1, paddingHorizontal: 30 }}>
            <IconDespesa/>
            <Subtitle style={{fontSize: 15, marginVertical: 25}}>
            Agora informe os dados da despesa para inserir no ela e calcular-mos seus gastos atuais.</Subtitle>

            <TitleLight>
                Residêncial
            </TitleLight>

            <Formik
                initialValues={{ titulo: '', data: '', valor: '', residenciaId: '' }}
                onSubmit={values => onSubmit(values)}
                validationSchema={despesaResidenciaValidation}
            >
                {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
                     <>
                        <Stack style={{width: '90%'}}>
                            <Input placeholder="Título" style={{marginTop: 25}} onChangeText={handleChange('titulo')} onBlur={handleBlur('titulo')} value={values.titulo}/>
                            {errors.titulo && touched.titulo ? (
                                <Text style={styles.errors}>{errors.titulo}</Text>
                            ) : null}
                            <DatePickerCustom  setValue={text => setFieldValue('data', text)} placeholder="Data" />
                            {errors.data && touched.data ? (
                                <Text style={[styles.errors]}>{errors.data}</Text>
                            ) : null}
                            <MaskInput
                                style={{backgroundColor: '#AFE9DE',fontFamily: 'Montserrat-Medium', borderRadius: 30, paddingLeft: 20, marginTop: 10}}
                                value={valor}
                                mask={moneyMask}
                                onChangeText={(masked, unmasked) => {
                                    setValor(unmasked)
                                    setFieldValue('valor', masked.replace('.', '').replace(',', '.').replace('R$ ', ''))
                                }}
                                />
                             {errors.valor && touched.valor ? (
                                <Text style={[styles.errors, {marginBottom: 10}]}>{errors.valor}</Text>
                            ) : null}
                            <PickerCustom
                                selectedValue={selectedValue}
                                onChange={(e)=>{
                                setSelectedValue(e)
                                setFieldValue('residenciaId', e)
                                }}
                                optionalLabel='Residência'
                                data={dataResidencias?.getResidencias}
                                fonte={14}
                                color="#AFE9DE"
                            />   
                             {errors.residenciaId && touched.residenciaId ? (
                                <Text style={[styles.errors, {marginTop: -10}]}>{errors.residenciaId}</Text>
                            ) : null}
                        </Stack>


                        <PressableButton
                                onPress={handleSubmit}
                                title='Adicionar'                    
                            />
                    </>
                )}
            </Formik>

        </View>
    )
}

export default DespesaResidencial

const styles = StyleSheet.create({
    errors: {
        marginLeft: 15,
        marginBottom: 15,
        color: 'red',
        fontSize: 11,
        fontFamily: "Montserrat-Medium"
    },

 })