import { X } from "phosphor-react";
import { FormEvent } from "react";
import { api } from "../services/api";

export function ModalEditarUsuario({setOpenEditModal, editUser, users, setUsers }:any){
  async function handleAuthentication(){
    try {
      const authentication = await api.post("/api/auth/login", {username: "admin", password: "12345678"})
      
      return authentication.data;
    } catch (err) {
      console.log(`Erro ao autenticar: ${err}`)
    }
  }
  
  async function handleEditUser(event: FormEvent){
    try {
      event?.preventDefault()
      const formData = new FormData(event.target as HTMLFormElement)
      const data = Object.fromEntries(formData)

      const userEdit = {
        "usuario": {
          "id": editUser.id,
          "nome": editUser.name,
          "email": data.email,
        },
        "tipos": [
          "ROLE_USER"
        ]
      }

      const { tokenType, accessToken } = await handleAuthentication()

      const userEdited = await api.post("/api/usuario/salvar", userEdit, {
        headers: {
          Authorization: `${tokenType} ${accessToken}`
        }
      })

      console.log("ççççççççççççççççççççççççççççççç",userEdited.data.object.usuario);
      console.log("ppppppppppppppppppppppppppppppp",users.filter(({ id }: any) => id !== editUser.id));
      setUsers([...users.filter(({ id }: any) => id !== editUser.id), userEdited.data.object.usuario])
      setOpenEditModal(false)
      alert("Usuário alterado com sucesso!")
    } catch (err) {
      console.log(`Erro ao editar contato: ${err}`)
      alert(`Erro ao editar contato: ${err}`)
    }
  }

  return(
    <div className="modal-background">
        <div className="modal">
          <h2>Editar usuário<span onClick={() => setOpenEditModal(false)}><X size={30} /></span> </h2>
           <form onSubmit={handleEditUser}>
           <div className="form-field">
              <label htmlFor="id">Id:</label>
              <input id="id" name="id" value={editUser.id} type="text" readOnly /> 
            </div>
            <div className="form-field">
              <label htmlFor="name">Nome: </label>
              <input id="name" value={editUser.nome} name="name" type="text" readOnly />
            </div>
            <div className="form-field">
              <label htmlFor="email">E-mail:</label>
              <input id="email" name="email" type="text" defaultValue={editUser.email}/>
            </div>
            <input type="submit" value="Alterar" />
          </form>
        </div>
    </div>
  )
}