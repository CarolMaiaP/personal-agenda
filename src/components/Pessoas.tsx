import { Pencil, Plus, X } from "phosphor-react";
import { useEffect, useState } from "react"
import { api } from "../services/api";
import '../styles/Pessoas.scss'
import '../styles/index.scss'
import { ModalPessoa } from "./ModalPessoa";

interface pessoasProps{
  id: number,
  nome: string,
}

export function Pessoas(){
  const [ people, setPeople ] = useState<pessoasProps[]>([]);
  const [ openModal, setOpenModal ] = useState(false)

  async function handleAuthentication(){
    try {
      const authentication = await api.post("/api/auth/login", {username: "admin", password: "12345678"})
      
      return authentication.data;
    } catch (err) {
      console.log(`Erro ao autenticar: ${err}`)
    }
  }

  async function handleShowAllPeople(){
    try {
      const { tokenType, accessToken } = await handleAuthentication()

      const peopleList = await api.post("/api/pessoa/pesquisar", { nome: "" }, {
        headers: {
          Authorization: `${tokenType} ${accessToken}`
        }
      })
      setPeople(peopleList.data)

    } catch (err) {
      console.log(`Erro ao carregar usuários: ${err}`)
    }
  }

  async function handleDeletePerson({id}: {id: number}){
    try {
      const { tokenType, accessToken } = await handleAuthentication()

      await api.delete(`/api/pessoa/remover/${id}`, {
        headers: {
          Authorization: `${tokenType} ${accessToken}`
        }
      });
      alert('Pessoa excluída com sucesso!')
    } catch (err) {
      console.log(`Erro ao deletar pessoa: ${err}`)
      alert(`Erro ao deletar pessoa: ${err}`)
    }
  }


  useEffect(() => {
    handleShowAllPeople()
  }, [people])

  return(
    <div className="container">
      <h2>Lista de Pessoas</h2>
      <div className="createPerson">
        <button onClick={() => setOpenModal(true)}><span><Plus size={20} weight="bold" /></span>Criar novo</button>
      </div>

      {openModal && <ModalPessoa setOpenModal={setOpenModal} people={people} setPeople={setPeople} />}

      {people.map((person) => {
        return(
          <div className="pessoa" key={person.id}>
            <h3>{person.nome}</h3>
            <p>{person.id}</p>
            <div className="actions">
              <button><span><Pencil size={20} /></span></button>
              <button onClick={() => handleDeletePerson(person)}><span><X size={20} /></span></button>
            </div>
          </div>
        )
      })}
      
    </div>
  )
}