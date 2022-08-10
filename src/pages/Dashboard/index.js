import React, { useContext, useEffect, useState } from 'react'
import styled, { css } from '@emotion/native'
import { View, TextInput, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native'
import {Picker} from '@react-native-picker/picker';
import PickerCustom from '../../components/PickerCustom';
import DashboardPicker from '../../components/DashboardPicker';
import auth from "../../services/auth"
import EcoCalc from "../../assets/ecocalc.svg";
import Pig from "../../assets/pig.svg";
import { gql, useApolloClient, useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { Stack, IconButton } from "@react-native-material/core";
import { Input } from "../../components/Input"
import { PressableButton } from "../../style/button"
import { Subtitle, TouchableText, SmallText, Title } from "../../style/texts"
import AsyncStorage from '@react-native-community/async-storage'
import AuthContext from '../../contexts/Auth';
import ModalDropdown from 'react-native-modal-dropdown';
import ListCard from '../../components/ListCard';

const GET_HISTORICO_MES = gql`
    query($usuarioId: ID, $residenciaId: ID, $pessoaId: ID) {
        getHistoricoMes(usuarioId: $usuarioId, residenciaId: $residenciaId, pessoaId: $pessoaId) {
            mes
            ano
            valorTotal
            despesas {
                id
                valor
                titulo
            }
            residencias {
                id
                nome
            }
            pessoas {
                id
                nome
            }
        }
    }    
`

const Dashboard = ({ navigation }) => {
    const { logout, user, signed, credentialsUser, getToken  } = useContext(AuthContext)
    const [selectedValue, setSelectedValue] = useState(0);

    const {data: dataHistorico, loading: loadingHistorico, refetch} = useQuery(GET_HISTORICO_MES, {
        variables: {
            usuarioId: user.id
        },
    })

    useEffect(()=>{
            if(selectedValue == 0){
                refetch({
                    usuarioId: user.id,  
                    residenciaId: null,
                    pessoaId: null                        
                })      
            } else if(selectedValue.substring(0,3) == 'res'){
                refetch({
                    usuarioId: user.id,
                    residenciaId: Number(selectedValue.slice(4)) ,
                    pessoaId: null  
                })
            } else if(selectedValue.substring(0,3) == 'pes'){
                refetch({
                    usuarioId: user.id,
                    residenciaId: null,
                    pessoaId: Number(selectedValue.slice(4))   
                })            
            }        
    }, [selectedValue])

    return (
        <View style={{alignItems: 'center', flex: 1, paddingHorizontal: 30 }}>

            <Subtitle style={{fontSize: 15, marginTop: 10, marginBottom: 10}}>
                Visualize o total gasto em cada mês e quanto
                você poupou em relação ao mês anterior.
                Clique e acesse os detalhes de cada mês.</Subtitle>

            <DashboardPicker
                selectedValue={selectedValue}
                onChange={setSelectedValue}
                width={350}
            />

            <ListCard navigation={navigation} selectedValue={selectedValue} dataMeses={dataHistorico?.getHistoricoMes} />
            

           
        </View>
    )
}

export default Dashboard