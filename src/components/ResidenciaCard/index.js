import React, {useEffect} from "react";
import { View, Text, ScrollView, SafeAreaView } from "react-native";
import { Card, FirstCard, Percentage, MonthText, NumText, MoneyText, CentsText, NumTitle, TotalText } from "./style";

import UpArrow from "../../assets/up_arrow.svg"
import StaticSquare from "../../assets/rank-static.svg"
import DownArrow from "../../assets/down_arrow.svg"
import {month} from '../../utils/monthYear'


const ResidenciaCard = ({data}) => {
    // useEffect(()=>{
    //     console.log("OXE ", data)
    // }, [data])

    // console.log("Opa? ", data)

    return(  
        <Card style={{ flexDirection: 'row', padding: 15}}>
            <View style={{width: '60%', flex:1}}>
                <View style={{flex:1}}>
                    <MonthText >
                        {data && data?.mes ? `${month(data?.mes)}/${data?.ano}` : '-/-'}
                    </MonthText>
                </View>
              
                <View>
                    <TotalText>
                        Total gasto:
                    </TotalText>
                    <View style={{flexDirection: 'row'}}>
                    <MoneyText>
                        R$ {data?.valorTotal ? data?.valorTotal?.toFixed(0) : '0'}
                    </MoneyText>
                    <CentsText>
                        ,{data?.valorTotal ? data?.valorTotal?.toFixed(2).slice(-2) : '00'}
                    </CentsText> 
                </View>
                
                    
                </View>
            </View>

            <View style={{width: '40%', alignItems: 'flex-end'}}>
                <NumTitle>
                    N° de despesas:                                  
                </NumTitle>
                <NumText>
                    {data?.despesas?.length}
                </NumText>

                <NumTitle>
                    N° de residências:                                  
                </NumTitle>
                <NumText>
                    {data?.residencias?.length}
                </NumText>
                <NumTitle>
                    N° de pessoas:                                  
                </NumTitle>
                <NumText>
                    {data?.pessoas?.length}
                </NumText>
            </View> 

            
        </Card>
    )
}

export default ResidenciaCard
