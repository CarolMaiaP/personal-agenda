import { User } from 'phosphor-react'
import '../styles/MeuCadastro.scss'
import '../styles/index.scss'

export function MeuCadastro(){
  return(
    <div className="container">
      <h2><span><User size={25} weight="bold" /></span>Cadastro</h2>
      <form>
        <div className="form-field">
          <label htmlFor="name">Nome:</label>
          <input type="text" id='name' placeholder="Digite seu nome" />
        </div>
        <div className="form-field">
          <label htmlFor="cpf">CPF:</label>
          <input type="text" id='cpf' placeholder="Digite seu CPF" />
        </div>
        <div className="form-field">
          <label htmlFor="nascimento">Data de nascimento:</label>
          <input type="text" id='nascimento' placeholder="Digite sua data de nascimento" />
        </div>
        <div className="form-field">
          <label htmlFor="email">E-mail:</label>
          <input type="text" id='email' placeholder="Digite seu e-mail" />
        </div>
        <div className="form-field">
          <label htmlFor="password">Senha:</label>
          <input type="password" id="password" placeholder="Digite sua senha" />
        </div>
        <div className="form-field">
          <label htmlFor="telephone">Telefone:</label>
          <input type="text" id="telephone" placeholder="Digite seu Telefone" />
        </div>
        <div className="form-field">
          <label htmlFor="user-name">Usuário:</label>
          <input type="text" id="user-name" placeholder="Digite seu nome de usuário" />
        </div>
        <input type="submit" value="Atualizar Cadastro" />
      </form>
    </div>
  )
}