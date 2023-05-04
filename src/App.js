import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MostrarPeliculas from './components/MostrarPeliculas';
import EditarPeliculas from './components/EditarPeliculas';
import CrearPeliculas from './components/CrearPeliculas';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MostrarPeliculas />} />
          {/* <Route path='/create' element={<CrearPeliculas />} /> */}
          {/* <Route path='/edit/:id' element={<EditarPeliculas />} /> */}
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
