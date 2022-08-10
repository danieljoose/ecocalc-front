import * as yup from "yup";

export const loginValidation = yup
  .object({
    email: yup
      .string()
      .email('O e-mail digitado é inválido')
      .required('O e-mail é obrigatório'),
    senha: yup.string().required('A senha é obrigatória'),   
  })
