import { X } from 'phosphor-react'
import { FormEvent } from 'react';
import { api } from '../services/api';
import * as yup from 'yup'
import '../styles/index.scss'
import '../styles/ModalPessoa.scss'
import { cepNumber, cpfNumber } from '../utils/validation';

const validationSchema = yup.object({
  nome: yup.string().required(),
  cpf: yup.string().matches(cpfNumber).required(),
  bairro: yup.string(),
  cep: yup.string().matches(cepNumber),
  cidade: yup.string(),
  estado: yup.string(),
  logradouro: yup.string(),
  numero: yup.string(),
  pais: yup.string()
})

export function ModalPessoa({setOpenModal, people, setPeople}:any){
  async function handleAuthentication(){
    try {
      const authentication = await api.post("/api/auth/login", {username: "admin", password: "12345678"})
      
      return authentication.data;
    } catch (err) {
      console.log(`Erro ao autenticar: ${err}`)
    }
  }

  async function handleCreatePeople(event: FormEvent){
    try {
      event.preventDefault()
      const formData = new FormData(event.target as HTMLFormElement)
      const data = Object.fromEntries(formData)


      const person = {
        "cpf": data.cpf,
        "endereco": {
          "bairro": data.bairro,
          "cep": data.cep,
          "cidade": data.cidade,
          "estado": data.estado,
          "logradouro": data.logradouro,
          "numero": data.numero,
          "pais": data.pais
        },
        "nome": data.name
      }

      // Validation
      console.log(`formvalues ${JSON.stringify(person)}`)
      const isValid = await validationSchema.validate(person)

      const { tokenType, accessToken } = await handleAuthentication()

      const newPerson = await api.post("/api/pessoa/salvar", person, {
        headers: {
          Authorization: `${tokenType} ${accessToken}`
        }
      })
      setPeople([...people, newPerson.data.object])
      setOpenModal(false)
      alert("Pessoa criada com sucesso!")
    } catch (err) {
      console.log(`Erro ao criar pessoa: ${err}`)
      alert(`Erro ao criar pessoa: ${err}`)
    }
  }

  return(
    <div className="modal-background">
        <div className="modal">
          <h2>Criar novo contato<span onClick={() => setOpenModal(false)}><X size={30} /></span> </h2>
           <form onSubmit={handleCreatePeople}>
            <div className="form-field">
              <label htmlFor="name">Nome: </label>
              <input id="name" name="name" type="text" placeholder="Digite o nome" />
            </div>
            <div className="form-field">
              <label htmlFor="cpf">CPF:</label>
              <input id="cpf" name="cpf" type="text" placeholder="Digite o CPF" />
            </div>
            <fieldset>
              <legend>Endereço</legend>
              <div className="form-field">
                <label htmlFor="bairro">Bairro:</label>
                <input id="bairro" name="bairro" type="text" placeholder="Digite o bairro" />
              </div>
              <div className="form-field">
                <label htmlFor="cep">CEP:</label>
                <input id="cep" name="cep" type="text" placeholder="Digite o CEP" />
              </div>
              <div className="form-field">
                <label htmlFor="cidade">Cidade:</label>
                <input id="cidade" name="cidade" type="text" placeholder="Digite a cidade" />
              </div>
              <div className="form-field">
                <label htmlFor="estado">Estado:</label>
                <input id="estado" name="estado" type="text" placeholder="Digite o estado" />
              </div>
              <div className="form-field">
                <label htmlFor="logradouro">Logradouro:</label>
                <input id="logradouro" name="logradouro" type="text" placeholder="Digite o logradouro" />
              </div>
              <div className="form-field">
                <label htmlFor="numero">Número:</label>
                <input id="numero" name="numero" type="text" placeholder="Digite o número" />
              </div>
              <div className="form-field">
                <label htmlFor="pais">País:</label>
                <input id="pais" name="pais" type="text" placeholder="Digite o país" />
              </div>
            </fieldset>
            <input type="submit" value="Criar" />
          </form>
        </div>
      </div>
  )
}