import React, {useState} from "react";
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native'
import {Picker} from '@react-native-picker/picker';
import colors from "../../style/colors";


const PickerCustom = ({ data, selectedValue, onChange, width, fonte, color, optionalLabel }) => {
  console.log(data)
    return (
      <View style={{
        alignItems: "center",
        maxWidth: "100%",
        backgroundColor: color || 'white',
        marginVertical: 10,
        shadowColor: color ? "#fff" : "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.88,
        shadowRadius: 16.00,
        borderRadius: 40,

        elevation: 29,
        fontSize: 10
      }}>
        <Picker
          selectedValue={selectedValue}
          placeHolder="opa"
          style={{  
            width: width || '100%', 
            color: selectedValue === null ? '#6c908a' : 'black',
            fontSize: 20,
            fontFamily: "Montserrat-Medium",
            marginLeft: 5
           }}
           mode="dropdown"
          onValueChange={(itemValue, itemIndex) => onChange(itemValue)}
        >
            {optionalLabel ? <Picker.Item style={{fontSize: fonte || 12, color: 'orange', height: 10, width: 10, paddingBottom: -10, marginLeft: -10}} enabled={false} label={optionalLabel} value={null}/> : null}
            {data ? data.map((elem) =>(
                <Picker.Item style={{fontSize: fonte || 16}} label={elem.nome} value={elem.id} key={elem.id} />
            )): null}
        </Picker>
      </View>
    );
}

export default PickerCustom