import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"

const endpoint = "http://localhost:8000/api"
const MostrarPeliculas = () => {
    const [peliculas, setPeliculas] = useState([])
    
    useEffect(() => {
        getAllPeliculas()
    }, [])
    const getAllPeliculas = async () => {

        const reponse = await axios.get(`${endpoint}/peliculas`)
        setPeliculas(reponse.data)
    }
    const deletePeliculas = async (id) => {

        axios.delete(`${endpoint}/pelicula/${id}`)
        getAllPeliculas()
    }
    return (
        <div>


            <div className='d-grid gap-2'>
                <Link to="/create" className='btn btn-success btn-lg mt-2 mb-2 text-white'>Añadir peliculas</Link>
            </div>
            <table className='table table-striped'>

                <thead className='bg-primary text-white'>
                    <tr>
                        <th>Nombre</th>
                        <th>Director</th>
                        <th>Genero</th>
                        <th>Año</th>
                        <th>Guion</th>
                        <th>Acciones</th>

                    </tr>
                </thead>
                <tbody>
                    {peliculas.map((pelicula) => (
                        <tr key={pelicula.id}>
                            <td>{pelicula.nombre}</td>
                            <td>{pelicula.director}</td>
                            <td>{pelicula.genero}</td>
                            <td>{pelicula.ano}</td>
                            <td>{pelicula.guion}</td>
                            <td> 
                                <Link to={`/edit/${pelicula.id}`} className='btn btn-warning mr-7 '>Editar</Link>
                                <button onClick={() => deletePeliculas(pelicula.id)} className='btn btn-danger'>Eliminar</button>

                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    )
}

export default MostrarPeliculas