import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const endpoint = "http://localhost:8000/api/pelicula"

const CrearPeliculas = () => {

    const [nombre, setNombre] = useState('')
    const [director, setDirector] = useState('')
    const [genero, setGenero] = useState('')
    const [ano, setAno] = useState('')
    const [guion, setGuion] = useState('')
    const [id_usuario, setId_usuario] = useState(1)

    const navigate = useNavigate()

    const store = async (e) => {
        e.preventDefault()
        await axios.post(endpoint, { nombre: nombre, director: director, genero: genero, ano: ano, guion: guion, id_usuario: id_usuario })
        navigate('/')
    }

    return (
        <div className='card' >
            <h3>Create Product</h3>
            <form onSubmit={store}>
                <div className='mb-3'>
                    <label className='form-label'>Nombre</label>
                    <input
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        type='text'
                        className='form-control'
                    />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Director</label>
                    <input
                        value={director}
                        onChange={(e) => setDirector(e.target.value)}
                        type='text'
                        className='form-control'
                    />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Genero</label>
                    <input
                        value={genero}
                        onChange={(e) => setGenero(e.target.value)}
                        type='text'
                        className='form-control'
                    />
                </div>

                <div className='mb-3'>
                    <label className='form-label'>Año de creación</label>
                    <input
                        value={ano}
                        onChange={(e) => setAno(e.target.value)}
                        type='text'
                        className='form-control'
                    />
                </div>

                <div className='mb-3'>
                    <label className='form-label'>Nombre Guionista</label>
                    <input
                        value={guion}
                        onChange={(e) => setGuion(e.target.value)}
                        type='text'
                        className='form-control'
                    />
                </div>
                <button type='submit' className='btn btn-primary'>Guardar pelicula</button>
            </form>
        </div>
    )
}

export default CrearPeliculas