import './App.css';
import './CustomCss/prueba.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MostrarPeliculas from './components/MostrarPeliculas';
import EditarPeliculas from './components/EditarPeliculas';
import VerPeliculas from './components/VerPeliculas';
import CrearPeliculas from './components/CrearPeliculas';
import Login from './components/Login';
import Register from './components/Register';
import SinUsuario from  './components/SinUsuario';

//Usamos dependiendo de las routas sus diferente controladores por eso en esta pagina solo necesitamos las routas de donde vamos a usar cada una 
function App() {
  return (
    <div>


      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/registro' element={<Register />} />
          <Route path='/peliculas' element={<MostrarPeliculas />} />
          {<Route path='/create/:username' element={<CrearPeliculas />} />}
          {<Route path='/edit/:id' element={<EditarPeliculas />} />}
          {<Route path='/info/:id' element={<VerPeliculas />} />}
          {<Route path='/peliculas/anonimo' element={<SinUsuario />} />}

        </Routes>
      </BrowserRouter>

    </div>);
}

export default App;
