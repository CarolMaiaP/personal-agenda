import { X } from 'phosphor-react'
import { FormEvent } from 'react';
import { api } from '../services/api';
import '../styles/index.scss'

export function ModalEditarContato({setOpenEditModal, editContact, contacts, setContacts}:any){
  
  async function handleAuthentication(){
    try {
      const authentication = await api.post("/api/auth/login", {username: "admin", password: "12345678"})
      
      return authentication.data;
    } catch (err) {
      console.log(`Erro ao autenticar: ${err}`)
    }
  }
  
  async function handleEditContact(event: FormEvent){
    try {
      event?.preventDefault()
      const formData = new FormData(event.target as HTMLFormElement)
      const data = Object.fromEntries(formData)

      const contactEdit = {
        "id": editContact.id,
        "pessoa": {
          "id": data.pessoaId
        },
        "email": data.email,
        "telefone": data.telefone,
        "usuario": {
          "id": data.userId
        }
      }

      const { tokenType, accessToken } = await handleAuthentication()

      const contactEdited = await api.post("/api/contato/salvar", contactEdit, {
        headers: {
          Authorization: `${tokenType} ${accessToken}`
        }
      })

      setContacts([...contacts.filter(({ id }: any) => id !== editContact.id), contactEdited.data.object])
      setOpenEditModal(false)
      alert("Usuário alterado com sucesso!")
    } catch (err) {
      console.log(`Erro ao editar contato: ${err}`)
    }
  }

  return(
    <div className="modal-background">
        <div className="modal">
          <h2>Editar contato<span onClick={() => setOpenEditModal(false)}><X size={30} /></span> </h2>
           <form onSubmit={handleEditContact}>
           <div className="form-field">
              <label htmlFor="id">Id:</label>
              <input id="id" name="id" value={editContact.id} type="text" readOnly />
            </div>
            <div className="form-field">
              <label htmlFor="id">Id do usuário: </label>
              <input id="id" name="userId"  type="text" defaultValue={editContact.usuario.id}  />
            </div>
            <div className="form-field">
              <label htmlFor="id">Id da pessoa: </label>
              <input id="id" name="pessoaId"  type="text" defaultValue={editContact.pessoa.id} />
            </div>
            <div className="form-field">
              <label htmlFor="name">Nome da pessoa: </label>
              <input id="name" value={editContact.pessoa.nome} name="name" type="text" readOnly />
            </div>
            <div className="form-field">
              <label htmlFor="email">E-mail:</label>
              <input id="email" name="email" type="text" defaultValue={editContact.email}/>
            </div>
            <div className="form-field">
              <label htmlFor="telefone">Telefone: </label>
              <input id='telefone'  name="telefone" type="text" defaultValue={editContact.telefone} />
            </div>
            <input type="submit" value="Alterar" />
          </form>
        </div>
    </div>
  )
}