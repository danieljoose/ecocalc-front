import React, { useContext, useEffect, useState } from 'react'
import { View, Text } from "react-native";
import PickerCustom from '../../components/PickerCustom';
import { Subtitle, PickerText, PessoaCardText, Title } from "../../style/texts"
import PessoaCard from '../../components/PessoaCard';
import { ArrowLeft, PersonIcon } from "./style";
import AuthContext from '../../contexts/Auth';
import {month} from '../../utils/monthYear'

import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";

const GET_PESSOAS = gql`
    query($usuarioId: ID!) {
        getPessoas(usuarioId: $usuarioId) {
            id
            nome
        }
    }
`

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
                pessoa {
                    id
                }
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


const Pessoas = () => {
    const { user, getId } = useContext(AuthContext)
    const [selectedValue, setSelectedValue] = useState(0);
    const [meses, setMeses] = useState([])
    const [mes, setMes] = useState(0)

    const {data: dataPessoas, loading: loadingPessoas} = useQuery(GET_PESSOAS, {
        variables: {
            usuarioId: user.id
          },
    }) 



    const {data: dataHistorico, loading: loadingHistorico, refetch} = useQuery(GET_HISTORICO_MES, {
        variables: {
            usuarioId: user.id,
            pessoaId: selectedValue
        },
        onCompleted: (e) =>{
            setMeses([...e.getHistoricoMes].map((e, index) =>  { return {nome: `${month(e.mes)}/${e.ano}`, value: `${month(e.mes)}/${e.ano}`, id: index}}))
        }
    })
    
    useEffect(()=>{
        refetch({
            usuarioId: user.id,
            pessoaId: selectedValue  
        })
    }, [selectedValue])

    const getDespesasPessoa = (pessoaId) => {
        if(!pessoaId){
            return
        }
        console.log(pessoaId)
        return dataHistorico?.getHistoricoMes[mes].despesas.filter((e) => e.pessoa.id == pessoaId)
    }

    const getDespesasTotal = (pessoaId) => {
        if(!pessoaId){
            return
        }
        const valor = dataHistorico?.getHistoricoMes[mes].despesas.filter((e) => e.pessoa.id == pessoaId).reduce((a, b) => a + b.valor, 0)
        return `R$ ${valor.toFixed(0)},${valor.toFixed(2).slice(-2)}`
    }

    const renderPessoa = () => {

        return (
            dataHistorico?.getHistoricoMes[mes]?.pessoas.map((e)=> 
                <View key={e.id} style={{
                    backgroundColor: 'white', 
                    marginTop: 15,
                    width: '100%', 
                    padding: 15,
                    shadowColor: "black",
                    shadowOffset: {
                        width: 0,
                        height: 12,
                    },
                    shadowOpacity: 0.98,
                    shadowRadius: 2.00,
                    borderRadius: 10,
                    alignItems: 'center',
                    elevation: 29,}}>
                    <View style={{
                        flexDirection: 'row', 
                        justifyContent: 'space-between',
                        width: '100%',
                        alignItems: 'center',
                    }}>
                        <PersonIcon/>
                        <View style={{justifyContent: 'space-between', flexDirection: 'row', width: '80%', alignItems: 'center',}}>
                            <PessoaCardText style={{width: '30%'}}>
                                {e.nome}
                            </PessoaCardText>
                            <PessoaCardText style={{alignItems: 'center', maxWidth: '15%', marginRight: '10%'}}>
                                {getDespesasPessoa(e?.id).length}
                            </PessoaCardText>
                            <PessoaCardText style={{maxWidth: '25%'}}>
                                {getDespesasTotal(e?.id)}
                            </PessoaCardText>
                        </View>
                        
                        <ArrowLeft/>
                    </View>
                        
                </View>
            )
            
        )
    }

    return (
        <View style={{alignItems: 'center', flex: 1, paddingHorizontal: 30 }}>
            <View>
                <PickerText style={{marginLeft: 10, marginBottom: -5}}> 
                    Pessoa(s)
                </PickerText>
                <PickerCustom
                    data={dataPessoas?.getPessoas}
                    all="Todas as pessoas"
                    selectedValue={selectedValue}
                    onChange={setSelectedValue}
                    width={350}
                />
            </View>

            <View>
                <PickerText style={{marginLeft: 10, marginBottom: -5}}> 
                    Mês
                </PickerText>
                <PickerCustom     
                    data={meses}               
                    selectedValue={mes}
                    onChange={setMes}
                    width={350}
                />
            </View>
            
            
            <PessoaCard data={dataHistorico?.getHistoricoMes[mes]} mes={mes}/>

            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '75%'}}>
                <PickerText style={{marginTop: 'auto'}}> 
                        Nome
                </PickerText>
                <PickerText style={{marginTop: 'auto'}}> 
                        Despesas
                </PickerText>
                <PickerText style={{marginTop: 'auto'}}> 
                        Gastos
                </PickerText>
            </View>

            {renderPessoa()}

        </View>
    )
}

export default Pessoas