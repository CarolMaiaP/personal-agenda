import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Contato } from './components/Contato'
import { Home } from './components/Home'
import { Login } from './components/Login'
import { MeuCadastro } from './components/MeuCadastro'
import { Navbar } from './components/Navbar'
import { Pessoas } from './components/Pessoas'
import { Usuarios } from './components/Usuarios'
import './styles/App.scss'

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/cadastro' element={<MeuCadastro />} />
          <Route path='/usuarios' element={<Usuarios />} />
          <Route path='/pessoas' element={<Pessoas />} />
          <Route path='/contato' element={<Contato />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
