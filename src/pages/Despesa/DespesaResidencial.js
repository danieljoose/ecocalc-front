import React, { useState, useContext } from 'react'
import { View, Text } from "react-native";
import { useForm } from 'react-hook-form'
import IconDespesa from "../../assets/icon-despesa.svg";
import { Subtitle, TitleLight, SmallText, Title , Pressable, TouchableWithoutFeedback} from "../../style/texts"
import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import { Stack, IconButton } from "@react-native-material/core";
import { PressableButton } from "../../style/button"
import { Input } from "../../components/Input"
import DatePickerCustom from '../../components/DatePicker';
import DateTimePicker from '@react-native-community/datetimepicker';

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
    const [selectedValue, setSelectedValue] = useState(null);
    const { user, getId } = useContext(AuthContext)
    const [date, setDate] = useState(new Date());
    const { register, setValue, handleSubmit, watch } = useForm()

    const {data: dataResidencias, loading: loadingResidencias} = useQuery(GET_RESIDENCIAS, {
        variables: {
            usuarioId: user.id
          },
    })

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

            <Stack style={{width: '90%'}}>
                <Input placeholder="Título" style={{marginTop: 25}} onChangeText={text => setValue('titulo', text)}/>
                <DatePickerCustom setValue={text => setValue('data', text)} placeholder="Data"/>
                <Input placeholder="Valor" onChangeText={text => setValue('valor', text)}/>
               
                <PickerCustom
                    selectedValue={selectedValue}
                    onChange={(e)=>{
                      setSelectedValue(e)
                      setValue('residenciaId', e)
                    }}
                    optionalLabel='Residência'
                    data={dataResidencias?.getResidencias}
                    fonte={14}
                    color="#AFE9DE"
                />   
            </Stack>


            <PressableButton
                    onPress={handleSubmit(onSubmit)}
                    title='Adicionar'                    
                />


        </View>
    )
}

export default DespesaResidencial