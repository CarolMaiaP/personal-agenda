import { Users, X, Star, Plus, Pencil } from 'phosphor-react';
import { FormEvent, useEffect, useState } from 'react';
import { api } from '../services/api';
import '../styles/Home.scss'
import { ModalHome } from './ModalHome';
import '../styles/index.scss'
import { Favoritos } from './Favoritos';
import { ModalEditarContato } from './ModalEditarContato';
import { getAuthUser } from '../services/auth';

interface contacsProps{
  id: number,
  telefone: string,
  email: string
  pessoa: {
    nome: string,
    telefone: string,
    
  }
}

export function Home(){

  const [ contacts, setContacts ] = useState<contacsProps[]>([])
  const [ favorites, setFavorites ] = useState<any[]>([])
  const [ openModal, setOpenModal ] = useState(false)
  const [ openEditModal, setOpenEditModal ] = useState(false)
  const [ editContact, setEditContact ] = useState({})
  
  async function handleGetAllContacts(){
    try{
      const config = await getAuthUser()
      const url = "/api/contato/pesquisar"
      const body = { termo: "" }

      const usersSearch = await api.post(url, body, config)

      setContacts(usersSearch.data)
    }catch(err){
      console.log("Erro ao carregar: "+ err)
    }
  }

  async function handleGetAllFavorites(){
    try {
      const config = getAuthUser()
      const url = "/api/favorito/pesquisar"

      const favoritesSearch = await api.get(url, config)

      setFavorites(favoritesSearch.data)
    } catch (err) {
      console.log("Erro ao carregar favoritos: " + err)
    }
  }

  async function handleNewFavorite(contact:string){
    try {
      const url = "/api/favorito/salvar"
      const config = getAuthUser()

      await api.post(url, contact, config)

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
      const url = "/api/contato/pesquisar"
      const config = getAuthUser()

      const searchedContact = await api.post(url, data, config)
      setContacts(searchedContact.data)
      setFavorites(searchedContact.data)
      alert("Pesquisa realizada com sucesso!")
    } catch (err) {
      console.log(`Erro ao pesquisar: ${err}`)
    }
  }

  async function handleDeleteContact({id}: {id:number}){
    try {
      const url = `/api/contato/remover/${id}`
      const config = getAuthUser()

      await api.delete(url, config);
      
      alert('Contato excluído com sucesso!')
      handleGetAllContacts()
    } catch (err) {
      console.log(`Erro ao deletar: ${err}`)
      alert(`Erro ao deletar ${err}`)
    }
  }

  async function handleEditContact(contact:contacsProps){
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
              <h4>{contact.email}</h4>
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