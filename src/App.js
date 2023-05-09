import './App.css';
import './CustomCss/prueba.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MostrarPeliculas from './components/MostrarPeliculas';
import EditarPeliculas from './components/EditarPeliculas';
import CrearPeliculas from './components/CrearPeliculas';
import Login from './components/Login';
import Register from './components/Register';


function App() {
  return (
    <div className="fondo">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/registro' element={<Register />} />
          <Route path='/peliculas' element={<MostrarPeliculas />} />
          {<Route path='/create' element={<CrearPeliculas />} />}
          {<Route path='/edit/:id' element={<EditarPeliculas />} />}
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
