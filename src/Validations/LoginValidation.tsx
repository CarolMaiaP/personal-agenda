import * as yup from 'yup'

export const loginSchema = yup.object().shape({
  usuario: yup.string().required("Usuário obrigatório"),
  senha: yup.string().min(8).required("Senha obrigatória"),
})