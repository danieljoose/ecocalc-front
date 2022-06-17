import React from "react";
import { View, Text, ScrollView, SafeAreaView } from "react-native";
import { Card, FirstCard, Percentage, MonthText, PercentageText, MoneyText, CentsText, DespesasText, ArrowLeft } from "./style";
import UpArrow from "../../assets/up_arrow.svg"
import DownArrow from "../../assets/down_arrow.svg"

const ListCard = () => {
    return(
        <ScrollView style={{ flex: 1, width: "100%"}}>
            <View style={{alignItems: 'center'}}>    
                <FirstCard>
                    <MonthText>
                        Abr/2022
                    </MonthText>
                    
                    <ArrowLeft/>
                    <View style={{flexDirection: 'row'}}>
                       <MoneyText>
                            R$ 1000
                        </MoneyText>
                        <CentsText>
                            ,50
                        </CentsText> 
                    </View>

                    <DespesasText>
                        27 despesas nesse mês
                    </DespesasText>
                    

                    <Percentage>
                        <UpArrow/>
                        <PercentageText color={-1}>
                            31%
                        </PercentageText>
                    </Percentage>  
                </FirstCard>

                {Array.from(Array(10).keys()).map((i)=> (
                    <Card key={i}>
                        <MonthText>
                            Mar/2022
                        </MonthText>
                        
                        <ArrowLeft/>
                        <View style={{flexDirection: 'row'}}>
                        <MoneyText>
                                R$ 1000
                            </MoneyText>
                            <CentsText>
                                ,50
                            </CentsText> 
                        </View>

                        <DespesasText>
                            27 despesas nesse mês
                        </DespesasText>
                        

                        <Percentage>
                            {i % 2 === 0 ? <UpArrow/> : <DownArrow/>}
                            <PercentageText color={i % 2 === 0 ? -1 : 1}>
                                {i % 2 === 0 ? `${i+1}0%` : `-${i+1}0%`}
                            </PercentageText>
                        </Percentage>  
                    </Card>
                ))}


                
            </View>
        </ScrollView>
        
    )
}

export default ListCard