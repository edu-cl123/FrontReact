import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IconName } from "react-icons/fa";


const endpoint = 'http://localhost:8000/api/pelicula/'

const EditProduct = () => {
    const [nombre, setNombre] = useState('')
    const [director, setDirector] = useState('')
    const [genero, setGenero] = useState('')
    const [ano, setAno] = useState('')
    const [guion, setGuion] = useState('')
    const [id_usuario, setId_usuario] = useState(1)

    const { id } = useParams()

    const navigate = useNavigate()

    const inicio = async (e) => {
        navigate('/peliculas')
    }

    useEffect(() => {
        const getPeliculaById = async () => {
            const response = await axios.get(`${endpoint}${id}`)
            setNombre(response.data.nombre)
            setDirector(response.data.director)
            setGenero(response.data.genero)
            setAno(response.data.ano)
            setGuion(response.data.guion)
            setId_usuario(response.data.id_usuario)
        }
        getPeliculaById()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div   >
            <div className="container">
                <form onSubmit={inicio}>
                    <div className="row">
                        <h4>Información peliculas</h4>
                        <div className="input-group ">
                        <label> Nombre película: </label>

                            <label> {nombre}</label>
                        </div>

                        <div className="input-group ">
                        <label> Director de la película: </label>

                        <label> {director}</label>

                        </div>
                        <div className="input-group">
                        <label> Genero de la película: </label>

                        <label> {genero}</label>

                        </div>
                        <div className="input-group">
                        <label>Año publicación de la película: </label>

                        <label> {ano}</label>

                        </div>
                        <div className="input-group">
                        <label> Guiónista de la película: </label>

                        <label> {guion}</label>
                        </div>
  
                        <button type='submit' className="editarButton ">Volver inicio</button>
                    </div>

                </form>
            </div>

        </div>
    )
}

export default EditProduct