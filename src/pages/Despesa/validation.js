import { defaultTheme } from "@react-native-material/core";
import * as yup from "yup";

const despesaResidenciaValidation = yup
  .object({
    titulo: yup
      .string()
      .required('Informe um título para sua despesa'),
    data: yup.string().required('Informa uma data para sua despesa'),   
    valor: yup.string().required('Informe um valor para sua despesa'),
    residenciaId: yup.string().required('Informe uma residência')
  })

const despesaPessoaValidation = yup
  .object({
    titulo: yup
      .string()
      .required('Informe um título para sua despesa'),
    data: yup.string().required('Informa uma data para sua despesa'),   
    valor: yup.string().required('Informe um valor para sua despesa'),
    pessoaId: yup.string().required('Informe uma pessoa')
  })

export { despesaPessoaValidation, despesaResidenciaValidation }
