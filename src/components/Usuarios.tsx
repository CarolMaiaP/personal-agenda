import { X, Star, Plus, Pencil, UserList, Users } from 'phosphor-react';
import { FormEvent, useEffect, useState } from 'react';
import { api } from '../services/api';

import '../styles/Usuarios.scss'
import '../styles/ModalUsuario.scss'
import '../styles/index.scss'
import { ModalUsuario } from './ModalUsuario';
import { ModalEditarUsuario } from './ModalEditarUsuario';

export function Usuarios(){
  interface userProps{
    id: number,
    nome: string,
    email:string,
    telefone:string
  }

  const [ users, setUsers ] = useState<userProps[]>([])
  const [ openModal, setOpenModal ] = useState(false)
  const [ openEditModal, setOpenEditModal ] = useState(false)
  const [ editUser, setEditUser ] = useState({})

  async function handleAuthentication(){
    try {
      const authentication = await api.post("/api/auth/login", {username: "admin", password: "12345678"})
      
      return authentication.data;
    } catch (err) {
      console.log(`Erro ao autenticar: ${err}`)
    }
  }

  async function handleShowAllUsers(){
    try {
      const { tokenType, accessToken } = await handleAuthentication()

      const usersList = await api.post("/api/usuario/pesquisar", { termo: "" }, {
        headers: {
          Authorization: `${tokenType} ${accessToken}`
        }
      })
      setUsers(usersList.data)

    } catch (err) {
      console.log(`Erro ao carregar usuários: ${err}`)
    }
  }

  async function handleEditUser(user: any){
    setEditUser(user)
    setOpenEditModal(true)
  }


  useEffect(() => {
    handleShowAllUsers()
  }, [])

  return(
    <div className="container">
      <h2><span><UserList size={25} weight="bold" /></span>Lista de Usuários</h2>
      <div className="create-user">
        <button onClick={() => setOpenModal(true)}><span><Plus size={20} weight="bold" /></span>Criar novo</button>
      </div>
      {openModal && <ModalUsuario setOpenModal={setOpenModal} users={users} setUsers={setUsers} />}
      {users.map((user) => {
        return(
          <div key={user.id}>
            <div className="user">
              <div className='user-info'>
                <h3>{user.nome}</h3>
                <h4>{user.email}</h4>
                <h4>{user.telefone}</h4>
                <h4>{user.id}</h4>
              </div>
              <button onClick={() => handleEditUser(user)}><Pencil size={20} /></button>
            </div>
            {openEditModal && <ModalEditarUsuario setOpenEditModal={setOpenEditModal} editUser={editUser} users={users} setUsers={setUsers} />}
          </div>
        )
      })}
    </div>
  )
}