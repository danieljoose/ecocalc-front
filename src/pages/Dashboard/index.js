import React, { useContext, useEffect, useState } from 'react'
import styled, { css } from '@emotion/native'
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native'
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

const Dashboard = ({ navigation }) => {
    const { logout, user, signed, credentialsUser  } = useContext(AuthContext)
    const [selectedValue, setSelectedValue] = useState("java");

    useEffect(()=>{
        if(signed && !user.id){
            (async () => credentialsUser())()
        } else if (!signed && user.auth) {
            (async () => logout())()
        }
    })

    const data = [
        { label: 'Label One', value: '1' },
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
                <Subtitle style={{fontSize: 15, marginTop: 10}}>
                Visualize o total gasto em cada mês e quanto
                você poupou em relação ao mês anterior.
                Clique e acesse os detalhes de cada mês.</Subtitle>

            <PressableButton
                onPress={async ()=> await logout()}
                title='Sair'
                style={{marginTop: '20px'}}
            />
        </View>
    )
}

export default Dashboard