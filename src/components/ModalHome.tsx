import { X } from 'phosphor-react'
import { FormEvent } from 'react';
import { api } from '../services/api';
import * as yup from 'yup'
import '../styles/index.scss'
import { phoneNumber } from '../utils/validation';

const validationSchema = yup.object({
  nome: yup.string(),
  email: yup.string().email().required(),
  telefone: yup.string().matches(phoneNumber).required(),
})

export function ModalHome({setOpenModal, contacts, setContacts}:any){
  async function handleAuthentication(){
    try {
      const authentication = await api.post("/api/auth/login", {username: "admin", password: "12345678"})
      
      return authentication.data;
    } catch (err) {
      console.log(`Erro ao autenticar: ${err}`)
    }
  }

  async function handleCreateContact(event: FormEvent){
    try {
      event.preventDefault()
      const formData = new FormData(event.target as HTMLFormElement)
      const data = Object.fromEntries(formData)

      const newContact = {
        "pessoa": {
          "id": data.id,
          "nome": data.nome,
        },
        "email": data.email,
        "telefone": data.telefone,
      }

      // Validation
      console.log(`formvalues ${JSON.stringify(newContact)}`)
      const isValid = await validationSchema.validate(newContact)

      const { tokenType, accessToken } = await handleAuthentication()

      const newContactList = await api.post("/api/contato/salvar", newContact,{
        headers: {
          Authorization: `${tokenType} ${accessToken}`
        }
      })
      console.log(newContactList.data.object)
      setContacts([...contacts, newContactList.data.object])
      setOpenModal(false)
      alert("Contato criado com sucesso!")
    } catch (err) {
      console.log(`Erro ao criar contato: ${err}`)
      alert(`Erro ao criar pessoa: ${err}`)
    }
  }

  return(
    <div className="modal-background">
        <div className="modal">
          <h2>Criar novo contato<span onClick={() => setOpenModal(false)}><X size={30} /></span> </h2>
           <form onSubmit={handleCreateContact}>
           <div className="form-field">
              <label htmlFor="id">Id da pessoa: </label>
              <input id="id" name="id" type="text" placeholder="Digite o id" />
            </div>
            <div className="form-field">
              <label htmlFor="nome">Nome: </label>
              <input id="nome" name="nome" type="text" placeholder="Digite o nome" />
            </div>
            <div className="form-field">
              <label htmlFor="email">E-mail:</label>
              <input id="email" name="email" type="text" placeholder="Digite o e-mail" />
            </div>
            <div className="form-field">
              <label htmlFor="telefone">Telefone: </label>
              <input id='telefone' name="telefone" type="text" placeholder='Digite o telefone' />
            </div>
            <input type="submit" value="Criar" />
          </form>
        </div>
      </div>
  )
}