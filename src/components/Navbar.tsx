import {Link} from 'react-router-dom'
import '../styles/Navbar.scss'

export function Navbar(){
  return(
    <header className="navbar">
      <Link to="/" >Login</Link>
      <Link to="/home" >Home</Link>
      <Link to="/cadastro" >Meu Cadastro</Link>
      <Link to="/usuarios" >Usuários</Link>
      <Link to="/pessoas" >Pessoas</Link>
      <Link to="/contato" >Contato</Link>
      <Link to="/logout">Logout</Link>
    </header>
  )
}