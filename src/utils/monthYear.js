import moment from "moment";

const meses = [
    {nome: 'Janeiro', abreviado: 'Jan'},
    {nome: 'Fevereiro', abreviado: 'Fev'},
    {nome: 'Março', abreviado: 'Mar'},
    {nome: 'Abril', abreviado: 'Abr'},
    {nome: 'Maio', abreviado: 'Mai'},
    {nome: 'Junho', abreviado: 'Jun'},
    {nome: 'Julho', abreviado: 'Jul'},
    {nome: 'Agosto', abreviado: 'Ago'},
    {nome: 'Setembro', abreviado: 'Set'},
    {nome: 'Outubro', abreviado: 'Out'},
    {nome: 'Novembro', abreviado: 'Nov'},
    {nome: 'Dezembro', abreviado: 'Dez'},
]

const monthYear = (data, abreviado, diff) => {
    const date = new Date(moment(data).add(diff, 'months'))
    const mes = meses[date.getMonth()]
    const ano = date.getFullYear()
    return abreviado ? `${mes.abreviado}/${ano}` : `${mes.nome}/${ano}`;
};
export default monthYear;
