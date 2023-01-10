import {Link} from 'react-router-dom'
import '../styles/Navbar.scss'

function handleLogout(){
  localStorage.removeItem("tokenType")
  localStorage.removeItem("accessToken")
  localStorage.removeItem("userId")
}

export function Navbar(){
  return(
    <header className="navbar">
      <Link to="/" >Login</Link>
      <Link to="/home" >Home</Link>
      <Link to="/cadastro" >Meu Cadastro</Link>
      <Link to="/usuarios" >Usuários</Link>
      <Link to="/pessoas" >Pessoas</Link>
      <Link to="/contato" >Contato</Link>
      <Link to="/" ><button onClick={handleLogout}>Logout</button></Link>
    </header>
  )
}