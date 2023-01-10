import { Users, X, Star, Plus, Pencil } from 'phosphor-react';
import { FormEvent, useEffect, useState } from 'react';
import { api } from '../services/api';
import '../styles/Home.scss'
import { ModalHome } from './ModalHome';
import '../styles/index.scss'
import { Favoritos } from './Favoritos';
import { ModalEditarContato } from './ModalEditarContato';

export function Home(){

  const [ contacts, setContacts ] = useState<any[]>([])
  const [ favorites, setFavorites ] = useState<any[]>([])
  const [ openModal, setOpenModal ] = useState(false)
  const [ openEditModal, setOpenEditModal ] = useState(false)
  const [ editContact, setEditContact ] = useState({})

  async function handleAuthentication(){
    try {
      const authentication = await api.post("/api/auth/login", {username: "admin", password: "12345678"})
      
      return authentication.data;
    } catch (err) {
      console.log(`Erro ao autenticar: ${err}`)
    }
  }

  async function handleGetAllContacts(){
    try{
      const { tokenType, accessToken } = await handleAuthentication()

      const usersSearch = await api.post("/api/contato/pesquisar", { termo: "" }, {
        headers: {
          Authorization: `${tokenType} ${accessToken}`
        }
      })

      setContacts(usersSearch.data)
    }catch(err){
      console.log("Erro ao carregar: "+ err)
    }
  }

  async function handleGetAllFavorites(){
    try {
      const { tokenType, accessToken } = await handleAuthentication()

      const favoritesSearch = await api.get("/api/favorito/pesquisar", {
        headers: {
          Authorization: `${tokenType} ${accessToken}`
        }
      })

      setFavorites(favoritesSearch.data)
    } catch (err) {
      console.log("Erro ao carregar favoritos: " + err)
    }
  }

  async function handleNewFavorite(contact:string){
    try {
      const { tokenType, accessToken } = await handleAuthentication()

      await api.post("/api/favorito/salvar", contact, {
        headers: {
          Authorization: `${tokenType} ${accessToken}`
        }
      })

      setFavorites([...favorites, contact])
      alert("Contato adicionado aos favoritos")
    } catch (err) {
      console.log(`Erro ao adicionar aos favoritos: ${err}`)
      alert("Erro ao adicionar aos favoritos")
    }
  }

  async function handleContactSearch(event: FormEvent){
    event?.preventDefault()
      const formData = new FormData(event.target as HTMLFormElement)
      const data = Object.fromEntries(formData)
      console.log("request",data)
    try {
      const { tokenType, accessToken } = await handleAuthentication()

      const searchedContact = await api.post("/api/contato/pesquisar", data, {
        headers: {
          Authorization: `${tokenType} ${accessToken}`
        }
      })
      setContacts(searchedContact.data)
      setFavorites(searchedContact.data)
      alert("Pesquisa realizada com sucesso!")
    } catch (err) {
      console.log(`Erro ao pesquisar: ${err}`)
    }
  }

  async function handleDeleteContact({id}: {id:null}){
    try {
      const { tokenType, accessToken } = await handleAuthentication()

      await api.delete(`/api/contato/remover/${id}`, {
        headers: {
          Authorization: `${tokenType} ${accessToken}`
        }
      });
      
      alert('Contato excluído com sucesso!')
      handleGetAllContacts()
    } catch (err) {
      console.log(`Erro ao deletar: ${err}`)
      alert(`Erro ao deletar ${err}`)
    }
  }

  async function handleEditContact(contact:any){
    setEditContact(contact)
    setOpenEditModal(true)
  }


  useEffect(() => {
    handleGetAllContacts()
  }, [])

  useEffect(() => {
    handleGetAllFavorites()
  }, [])

  return(
    <div className="container">
      <h2><span><Users size={25} weight="bold" /> </span> Contatos</h2>
        <div className="search-user">
          <form onSubmit={handleContactSearch}>
            <input type="text" name='termo' placeholder="Digite um nome" />
            <input type="submit" value="Procurar" /> 
          </form>
          <div className="create-contact">
            <button onClick={() => setOpenModal(true)}><span><Plus size={20} weight="bold" /></span>Criar novo</button>
          </div>
        </div>
        {openModal && <ModalHome setOpenModal={setOpenModal} contacts={contacts} setContacts={setContacts} />}
        <Favoritos favorites={favorites} handleGetAllContacts={handleGetAllContacts} handleDeleteContact={handleDeleteContact} />

      {contacts.map((contact) => (
        <div key={contact.id}>
          <div className="user" >
            <div className="userInfo">
              <img src="https://github.com/CarolMaiaP.png" alt="foto do usuario" />
              <h3>{contact.pessoa.nome}</h3>
              <h2>{contact.id}</h2>
              <h4>{contact.pessoa.nome}</h4>
              <p><strong>{contact.telefone}</strong></p>
            </div>
            <div className="actions">
              <button onClick={() => handleDeleteContact(contact)}><X size={27} /></button>
              <button onClick={() => handleEditContact(contact)} ><Pencil size={27} /></button>
              <button onClick={() => handleNewFavorite(contact)}><Star size={27} /></button>
            </div>
          </div>
          {openEditModal && <ModalEditarContato setOpenEditModal={setOpenEditModal} editContact={editContact} contacts={contacts} setContacts={setContacts} />}
        </div>
      ))}
    </div>
  )
}