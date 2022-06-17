import React, { useContext, useEffect, useState } from 'react'
import styled, { css } from '@emotion/native'
import { View, TextInput, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native'
import {Picker} from '@react-native-picker/picker';
import PickerCustom from '../../components/PickerCustom';
import auth from "../../services/auth"
import EcoCalc from "../../assets/ecocalc.svg";
import Pig from "../../assets/pig.svg";
import { Stack, IconButton } from "@react-native-material/core";
import { Input } from "../../components/Input"
import { PressableButton } from "../../style/button"
import { Subtitle, TouchableText, SmallText, Title } from "../../style/texts"
import AsyncStorage from '@react-native-community/async-storage'
import AuthContext from '../../contexts/Auth';
import ListCard from '../../components/ListCard';

const Dashboard = ({ navigation }) => {
    const { logout, user, signed, credentialsUser, getToken  } = useContext(AuthContext)
    const [selectedValue, setSelectedValue] = useState("java");

    // useEffect(()=>{
    //     console.log('q ' + signed);
    //     console.log('q ' + (async () => getToken)());
    //     if(signed){
    //         (async () => credentialsUser())()
    //     } else {
    //         console.log(user);
    //         (async () => logout())()
    //     }
    // }, [])

    const data = [
        { label: 'Despesas Totais', value: '1' },
        { label: 'Label Two', value: '2' },
        { label: 'Label Tri', value: '3' },
    ]

    return (
        <View style={{alignItems: 'center', flex: 1, paddingHorizontal: 30 }}>

            <Subtitle style={{fontSize: 15, marginTop: 10, marginBottom: 10}}>
                Visualize o total gasto em cada mês e quanto
                você poupou em relação ao mês anterior.
                Clique e acesse os detalhes de cada mês.</Subtitle>

            <PickerCustom
                selectedValue={selectedValue}
                onChange={setSelectedValue}
                data={data}
            />

            <ListCard/>
            

           
        </View>
    )
}

export default Dashboard