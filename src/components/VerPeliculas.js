import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IconName } from "react-icons/fa";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


const endpoint = 'http://localhost:8000/api/pelicula/'

const VerPeliculas = () => {
    //Variables usadas
    const [nombre, setNombre] = useState('')
    const [director, setDirector] = useState('')
    const [genero, setGenero] = useState('')
    const [ano, setAno] = useState('')
    const [guion, setGuion] = useState('')
    const [id_usuario, setId_usuario] = useState(1)
    const [usuario, setusuario] = useState("")

    //Id de la peliculas que queremos ver la informacion, ese id se obtiene por la barra de navegación
    const { id } = useParams()

    const navigate = useNavigate()

    //Propiedad del navbar
    const inicio = async (e) => {
        navigate('/peliculas')
    }

    //Funciones que se ejecutan al entrar en la pantalla para poder setear el formulario
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
        comprobarLogin()
        getPeliculaById()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    //Propiedad del navbar

    const Mostrar = async () => {
        navigate(`/peliculas`)
    }
    //Propiedad del navbar

    const CerrarSesion = async () => {
        localStorage.clear()
        navigate(`/`)
    }
    //Comprobamos que un usuario tenga iniciado sesión
    const comprobarLogin = async () => {
        if (!localStorage.getItem("usuario") && !localStorage.getItem("contrasena")) {
            navigate('/')
        } else {
            setusuario(localStorage.getItem("usuario"))
        }
    }

    return (
        <div className="fondo" >
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">Fimoteca</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link onClick={() => Mostrar()}>Inicio</Nav.Link>
                    <Nav.Link onClick={() => CerrarSesion()}>Cerrar sesión</Nav.Link>
                </Nav>
            </Navbar>

            <div className="container">
                <form onSubmit={inicio}>
                    <div className="row">
                        <h4>Información pelÍcula</h4>
                        <div className="input-group ">
                            <input value={nombre} style={{ pointerEvents: "none" }}
                                onChange={(e) => setNombre(e.target.value)} type="text" placeholder="Nombre" />
                        </div>

                        <div className="input-group ">
                            <input value={director} style={{ pointerEvents: "none" }}
                                onChange={(e) => setDirector(e.target.value)} type="text" placeholder="Director" />
                        </div>
                        <div className="input-group">
                            <input value={genero} style={{ pointerEvents: "none" }}
                                onChange={(e) => setGenero(e.target.value)} type="text" placeholder="Genero" />
                        </div>
                        <div className="input-group">
                            <input value={ano} style={{ pointerEvents: "none" }}
                                onChange={(e) => setAno(e.target.value)} type="text" placeholder="Año de creación" />
                        </div>
                        <div className="input-group">
                            <input value={guion} style={{ pointerEvents: "none" }}
                                onChange={(e) => setGuion(e.target.value)} type="text" placeholder="Guión" />
                        </div>
                        <div className='d-grid gap-2'>
                            <button type='submit' className='btn btn-primary btn-lg mt-2 mb-2 text-white'>Volver inicio</button>

                        </div>
                    </div>

                </form>

            </div>

        </div>
    )
}

export default VerPeliculas