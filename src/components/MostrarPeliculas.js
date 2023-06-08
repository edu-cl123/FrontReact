import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, Navigate } from "react-router-dom"
import { useNavigate } from 'react-router-dom';

import '../CustomCss/prueba.css';

const endpoint = "http://localhost:8000/api"
const MostrarPeliculas = () => {
    const [peliculas, setPeliculas] = useState([])
    const [usuario, setusuario] = useState("")

    const navigate = useNavigate()


    useEffect(() => {

        comprobarLogin()
        getAllPeliculas()
    },[])

    const getAllPeliculas = async () => {

        const reponse = await axios.get(`${endpoint}/peliculas`)
        setPeliculas(reponse.data)

    }

    const comprobarLogin = async () => {
        if (!localStorage.getItem("usuario")  && !localStorage.getItem("contrasena") ) {
            navigate('/')
        }else{
            setusuario(localStorage.getItem("usuario"))
        }
    }

    const deletePeliculas = async (id) => {

        axios.delete(`${endpoint}/pelicula/${id}`)
        getAllPeliculas()
    }

    const crearPeliculas =async()=>{
        navigate(`/create/${usuario}`)
    }
    return (
        <div>

            <div className='d-grid gap-2'>
                <button onClick={() => crearPeliculas()} className='btn btn-success btn-lg mt-2 mb-2 text-white'>Añadir peliculas</button>
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
                                <Link to={`/info/${pelicula.id}`} className='btn btn-success mr-7 '>Ver</Link>
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