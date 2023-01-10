import { X } from "phosphor-react"
import { FormEvent, useState } from "react";
import { api } from "../services/api";
import * as yup from 'yup'
import '../styles/ModalUsuario.scss'
import { cpfNumber, phoneNumber } from "../utils/validation";

const validationSchema = yup.object({
  nome: yup.string().required(),
  cpf: yup.string().matches(cpfNumber).required(),
  email: yup.string().email().required(),
  nascimento: yup.string(),
  telefone: yup.string().matches(phoneNumber),
  username: yup.string().required(),
  password: yup.string().min(8).required()
})

export function ModalUsuario({setOpenModal, users, setUsers}:any){

  async function handleAuthentication(){
    try {
      const authentication = await api.post("/api/auth/login", {username: "admin", password: "12345678"})
      
      return authentication.data;
    } catch (err) {
      console.log(`Erro ao autenticar: ${err}`)
    }
  }

  async function handleCreateUser(event: FormEvent){
    try {
      event?.preventDefault()
      const formData = new FormData(event.target as HTMLFormElement)
      const data = Object.fromEntries(formData)
      
      const user = {
        "tipos": [
          "ROLE_USER"
        ],
        "usuario": {
          "cpf": data.cpf,
          "dataNascimento": data.nascimento,
          "email": data.email,
          "nome": data.name,
          "telefone": data.telefone,
          "username": data.username,
          "password": data.password
        }
      }
      
      // Validation
      console.log(`formvalues ${JSON.stringify(user)}`)
      const isValid = await validationSchema.validate(user.usuario)

      const { tokenType, accessToken } = await handleAuthentication()
      const userCreated = await api.post("/api/usuario/salvar", user, {
        headers: {
          Authorization: `${tokenType} ${accessToken}`
        }
      })
      
      setUsers([...users, userCreated.data.object.usuario])
      setOpenModal(false)
      alert("Usuário criado com sucesso!")
      console.log("bbbbbbb", JSON.stringify(userCreated.data.object.usuario))
    } catch (err) {
      console.log(`Erro ao criar usuário: ${err}`)
      alert(`Erro ao criar usuário: ${err}`)
    }
  }

  return(
    <div className="modal-background">
          <div className="modal">
            <h2>Criar novo usuário<span onClick={() => setOpenModal(false)}><X size={30} /></span> </h2>
            <form onSubmit={handleCreateUser}>
              <div className="form-field">
                <label htmlFor="name">Nome: </label>
                <input id="name" name="name" type="text" placeholder="Digite o nome" />
              </div>
              <div className="form-field">
                <label htmlFor="cpf">CPF:</label>
                <input id="cpf" name="cpf" type="text" placeholder="Digite o CPF" />
              </div>
              <div className="form-field">
                <label htmlFor="email">E-mail:</label>
                <input id="email" name="email" type="text" placeholder="Digite o e-mail" />
              </div>
              <div className="form-field">
                <label htmlFor="data-nascimento">Data de nascimento:</label>
                <input id='data-nascimento' name="nascimento" type="date" placeholder='Digite a data de nascimento' />
              </div>
              <div className="form-field">
                <label htmlFor="telefone">Telefone: </label>
                <input id='telefone' name="telefone" type="text" placeholder='Digite o telefone' />
              </div>
              <div className="form-field">
                <label htmlFor="username">Username: </label>
                <input id='username' type="text" name="username" placeholder='Digite o username' />
              </div>
              <div className="form-field">
                <label htmlFor="password">Senha: </label>
                <input id='password' name="password" type="password" placeholder="Digite a senha"/>
              </div>
              <input type="submit" value="Criar" />
            </form>
          </div>
        </div>
  )
}