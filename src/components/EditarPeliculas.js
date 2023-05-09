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

    const update = async (e) => {
        e.preventDefault()
        await axios.put(`${endpoint}${id}`, {
            nombre: nombre,
            director: director,
            genero: genero,
            ano: ano,
            guion: guion,
            id_usuario: id_usuario
        })
        navigate('/')
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
                <form onSubmit={update}>
                    <div className="row">
                        <h4>Editar peliculas</h4>
                        <div className="input-group ">
                            <input value={nombre}
                                onChange={(e) => setNombre(e.target.value)} type="text" placeholder="Nombre" />
                        </div>

                        <div className="input-group ">
                            <input value={director}
                                onChange={(e) => setDirector(e.target.value)} type="text" placeholder="Director" />
                        </div>
                        <div className="input-group">
                            <input value={genero}
                                onChange={(e) => setGenero(e.target.value)} type="text" placeholder="Genero" />
                        </div>
                        <div className="input-group">
                            <input value={ano}
                                onChange={(e) => setAno(e.target.value)} type="text" placeholder="Año de creación" />
                        </div>
                        <div className="input-group">
                            <input value={guion}
                                onChange={(e) => setGuion(e.target.value)} type="text" placeholder="Guión" />
                        </div>
                        <button type='submit' className="editarButton ">Editar pelicula</button>
                    </div>

                </form>
            </div>


            {/* Registro para el login            <div class="form">
                <div class="title">Bienvenido</div>
                <div class="subtitle">Registrate en nuestra plataforma!</div>
                <div class="input-container ic1">
                    <input id="firstname" class="input" type="text" placeholder="Usuario " />
                </div>
                <div class="input-container ic2">
                    <input id="lastname" class="input" type="text" placeholder=" Correo Electronico" />
                </div>
                <div class="input-container ic2">
                    <input id="email" class="input" type="text" placeholder="Contraseña " />
                </div>
                <button type="text" class="submit">Registrar</button>
            </div>
 */}

        </div>
    )
}

export default EditProduct