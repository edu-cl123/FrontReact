import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import '../CustomCss/prueba.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const endpoint = 'http://localhost:8000/api/pelicula/'

const EditPeliculas = () => {
    //Variables usadas
    const [nombre, setNombre] = useState('')
    const [director, setDirector] = useState('')
    const [genero, setGenero] = useState('')
    const [ano, setAno] = useState('')
    const [guion, setGuion] = useState('')
    const [id_usuario, setId_usuario] = useState(1)
    const [usuario, setusuario] = useState("")

    const { id } = useParams()

    //Proipiedad que nos permite la navegación
    const navigate = useNavigate()

    //Funcion que usamos junto con la api para pode actualizar una peliculas utilizando su id
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
        navigate('/peliculas')
    }

    //Propiedad navbar
    const Mostrar = async () => {
        navigate(`/peliculas`)
    }
    //Propiedad navbar

    const CerrarSesion = async () => {
        localStorage.clear()
        navigate(`/`)
    }

    //Función que se ejecuta al entrar a la pantalla la cual obtenemos el id de la pelicula y seteamos los input con dichos valores, ademas de comprobar el login
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
        comprobarLogin()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //Comporbamos que un usuario haya iniciado sesión
    const comprobarLogin = async () => {
        if (!localStorage.getItem("usuario") && !localStorage.getItem("contrasena")) {
            navigate('/')
        } else {
            setusuario(localStorage.getItem("usuario"))
        }
    }

    return (
        <div  className='fondo' >
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">Fimoteca</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link onClick={() => Mostrar()}>Inicio</Nav.Link>
                    <Nav.Link onClick={() => CerrarSesion()}>Cerrar sesión</Nav.Link>
                </Nav>
            </Navbar>
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
                        <div className='d-grid gap-2'>
                            <button type='submit' className='btn btn-primary btn-lg mt-2 mb-2 text-white'>Editar pelicula</button>

                        </div>
                    </div>

                </form>
            </div>

        </div>
    )
}

export default EditPeliculas