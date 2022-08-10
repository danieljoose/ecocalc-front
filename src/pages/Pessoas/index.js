import React, { useContext, useEffect, useState } from 'react'
import { View, Text, Modal, Pressable, ScrollView } from "react-native";
import PickerCustom from '../../components/PickerCustom';
import { Subtitle, PickerText, PessoaCardText, Title, } from "../../style/texts"
import PessoaCard from '../../components/PessoaCard';
import { ArrowLeft, PersonIcon, CloseIcon, ModalTitle, ModalName } from "./style";
import AuthContext from '../../contexts/Auth';
import {month, dayMonth} from '../../utils/monthYear'

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
                data
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
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedPessoa, setSelectedPessoa] = useState()

    const {data: dataPessoas, loading: loadingPessoas, refetch: refetchPessoas} = useQuery(GET_PESSOAS, {
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
            setMes(0)
            setMeses([...e.getHistoricoMes].map((e, index) =>  { return { nome: `${month(e.mes)}/${e.ano}`, value: `${month(e.mes)}/${e.ano}`, id: index}}))
        }
    })
    
    useEffect(()=>{
        refetchPessoas()
    }, [])

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
        return dataHistorico?.getHistoricoMes[mes].despesas.filter((e) => e.pessoa.id == pessoaId)
    }

    const getDespesasTotal = (pessoaId) => {
        if(!pessoaId){
            return
        }
        const valor = dataHistorico?.getHistoricoMes[mes].despesas.filter((e) => e.pessoa.id == pessoaId).reduce((a, b) => a + b.valor, 0)
        return `R$ ${parseInt(valor)},${valor.toFixed(2).slice(-2)}`
    }

    const renderPessoa = () => {
        return (
            dataHistorico?.getHistoricoMes.length > 0 ? (dataHistorico?.getHistoricoMes[mes]?.pessoas.map((e)=> 
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
                        
                        <ArrowLeft onPress={()=> {setSelectedPessoa(e); setModalOpen(true)}}/>
                        
                    </View>
                        
                </View>
            )) : (
                <View>
                    <Subtitle style={{marginTop: 30, fontSize: 14}}>
                        Nenhuma despesa cadastrada
                    </Subtitle>
                </View>
            )
            
        )
    }

    const renderModal = () => {
        const despesas = getDespesasPessoa(selectedPessoa?.id) || []

        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', width: 100, color: 'red'}}>
                <Modal
                    visible={modalOpen}
                    transparent={true}
                    onRequestClose={()=> setModalOpen(false)}
                >        
                    <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'rgba(0,0,0,0.5)'}}>
                        
                        <View style={{backgroundColor:'white', borderRadius:10, width:'85%', minHeight:'50%', maxHeight: '80%'}}>
                            <View style={{backgroundColor: '#AEE9DE', borderTopLeftRadius:10, borderTopRightRadius:10, padding: 20, width: '100%', height: 105}}>
                                <CloseIcon onPress={() => setModalOpen(false)}/>
                                <View style={{alignItems:'center'}}>
                                    <ModalTitle>{meses[mes]?.nome}</ModalTitle>
                                    <ModalName>{selectedPessoa?.nome}</ModalName>
                                </View>                                
                            </View>
                            <ScrollView style={{padding: 20, maxHeight: '80%'}}>
                                    {despesas?.map((e, index)=> 
                                        <View key={index} style={{marginBottom: 15, flex: 1,flexDirection: 'row'}}>
                                            <View style={{ flex: 3}}>
                                                <PickerText >
                                                {dayMonth(e.data)}
                                            </PickerText>
                                            </View>
                                            
                                            <View style={{ flex: 8}}>
                                                <PessoaCardText >
                                                {e.titulo}
                                            </PessoaCardText>
                                            </View>
                                            
                                            <View style={{flex: 5, alignItems: 'flex-end'}}>
                                                <PessoaCardText  >
                                                R$ {parseInt(e.valor)},{e.valor.toFixed(2).slice(-2)}
                                            </PessoaCardText>

                                            </View>
                                            
                                           
                                        </View>
                                    )}
                            </ScrollView>                        
                        </View>
                    </View>                    
                </Modal>
            </View>
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
            
            
            <PessoaCard data={dataHistorico?.getHistoricoMes[mes] || []} />

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
            {renderModal()}

        </View>
    )
}

export default Pessoas