import './App.css';
import './CustomCss/prueba.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MostrarPeliculas from './components/MostrarPeliculas';
import EditarPeliculas from './components/EditarPeliculas';
import VerPeliculas from './components/VerPeliculas';
import CrearPeliculas from './components/CrearPeliculas';
import Login from './components/Login';
import Register from './components/Register';


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

        </Routes>
      </BrowserRouter>

    </div>);
}

export default App;
