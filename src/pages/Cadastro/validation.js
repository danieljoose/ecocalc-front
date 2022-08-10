import * as yup from "yup";

export const cadastroValidation = yup
  .object({
    nome: yup
      .string()
      .required('O campo "Nome" é obrigatório'),
    sobrenome: yup
      .string()
      .required('O campo "Sobrenome" é obrigatório'),
    email: yup
      .string()
      .email('O e-mail digitado é inválido')
      .required('O campo "Email" é obrigatório'),
      senha: yup.string().required('O campo "Senha" é obrigatório'),   
  })
