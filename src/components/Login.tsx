import { SignIn } from 'phosphor-react'
import { FormEvent } from 'react'
import { api } from '../services/api';
import { loginSchema } from '../Validations/LoginValidation';
import '../styles/Login.scss'

export function Login(){
  async function handleLogin(event: FormEvent){
    try {
      event.preventDefault()
      const formData = new FormData(event.target as HTMLFormElement)
      const data = Object.fromEntries(formData)
      
      
      const authentication = await api.post("/api/auth/login", data)
      console.log("aaaaaaaaaaaaaa", authentication.data)
      alert("Login efetuado com sucesso!")
    } catch (err) {
      console.log(`Erro ao efetuar login: ${err}`)
      alert("Erro ao efetuar login. Usuário ou senha incorretos")
    }
  }

  return(
    <div className="login">
      <h2><span><SignIn size={25} weight="bold" /></span>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-field">
          <label htmlFor="user">Usuário</label>
          <input type="text"  name='username' id='user' placeholder="Digite seu usuário" />
        </div>
        <div className="form-field">
          <label htmlFor="password">Senha:</label>
          <input type="password" name='password' id="password" placeholder="Digite sua senha" />
        </div>
        <div className="remember">
          <input type="checkbox" id='check-remember' />
          <label htmlFor="check-remember">Lembrar-me</label>
        </div>
        <input type="submit" value="Entrar" />
      </form>
    </div>
  )
}