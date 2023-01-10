import { X } from "phosphor-react";
import { FormEvent } from "react";
import { api } from "../services/api";

export function ModalEditarPessoa({setOpenEditModal, editPessoa, people, setPeople}:any){
  async function handleAuthentication(){
    try {
      const authentication = await api.post("/api/auth/login", {username: "admin", password: "12345678"})
      
      return authentication.data;
    } catch (err) {
      console.log(`Erro ao autenticar: ${err}`)
    }
  }

  async function handleEditContact(event:FormEvent){
    try {
      event?.preventDefault()
      const formData = new FormData(event.target as HTMLFormElement)
      const data = Object.fromEntries(formData)

      const personEdit = {
        "id": editPessoa.id,
        "nome": data.nome,
        "endereco": {
          "logradouro": data.logradouro,
          "numero": data.numero,
          "cep": data.cep,
          "bairro": data.bairro,
          "cidade": data.cidade,
          "estado": data.estado,
          "pais": data.pais
        },
        "foto": {
          "id": "37e610b5-0bb0-4cb5-a4c2-cf9566591a38",
          "name": "foto.png",
          "type": "image/png"
        }
      }

      console.log("ppppppppppp", JSON.stringify(personEdit))

      const { tokenType, accessToken } = await handleAuthentication()

      const personEdited = await api.post("/api/pessoa/salvar", personEdit, {
        headers: {
          Authorization: `${tokenType} ${accessToken}`
        }
      })

      setPeople([...people.filter(({ id }: any) => id !== editPessoa.id), personEdited.data.object])
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
              <input id="id" name="id"  value={editPessoa.id} type="text" readOnly /> 
            </div>
            <div className="form-field">
              <label htmlFor="name">Nome: </label>
              <input id="name" defaultValue={editPessoa.nome} name="nome" type="text" />
            </div>
            <fieldset>
              <legend>Endereço</legend>
              <div className="form-field">
                <label htmlFor="bairro">Bairro:</label>
                <input id="bairro" defaultValue={editPessoa.endereco.bairro} name="bairro" type="text"  />
              </div>
              <div className="form-field">
                <label htmlFor="cep">CEP:</label>
                <input id="cep" defaultValue={editPessoa.endereco.cep} name="cep" type="text" />
              </div>
              <div className="form-field">
                <label htmlFor="cidade">Cidade:</label>
                <input id="cidade" defaultValue={editPessoa.endereco.cidade} name="cidade" type="text" />
              </div>
              <div className="form-field">
                <label htmlFor="estado">Estado:</label>
                <input id="estado" defaultValue={editPessoa.endereco.estado} name="estado" type="text"  />
              </div>
              <div className="form-field">
                <label htmlFor="logradouro">Logradouro:</label>
                <input id="logradouro" defaultValue={editPessoa.endereco.logradouro}  name="logradouro" type="text" />
              </div>
              <div className="form-field">
                <label htmlFor="numero">Número:</label>
                <input id="numero" defaultValue={editPessoa.endereco.numero} name="numero" type="text" />
              </div>
              <div className="form-field">
                <label htmlFor="pais">País:</label>
                <input id="pais" defaultValue={editPessoa.endereco.pais} name="pais" type="text" />
              </div>
            </fieldset>
            <input type="submit" value="Alterar" />
          </form>
        </div>
    </div>
  )
}