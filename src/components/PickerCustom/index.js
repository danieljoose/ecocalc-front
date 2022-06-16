import React, {useState} from "react";
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native'
import {Picker} from '@react-native-picker/picker';
import colors from "../../style/colors";


const PickerCustom = ({ data, selectedValue, onChange, width }) => {
    return (
      <View style={{
        alignItems: "center",
        maxWidth: "100%",
        backgroundColor: 'white',
        marginVertical: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.88,
        shadowRadius: 16.00,
        borderRadius: 40,

        elevation: 29,
      }}>
        <Picker
          selectedValue={selectedValue}
          style={{  
            width: width ? width : 350, 
            color: colors.thirdBlue,
           }}
          onValueChange={(itemValue, itemIndex) => onChange(itemValue)}
        >
            {data.map((elem) =>(
                <Picker.Item label={elem.label} value={elem.value} />
            ))}
        </Picker>
      </View>
    );
}

export default PickerCustom