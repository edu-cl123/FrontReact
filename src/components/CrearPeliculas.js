import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import '../CustomCss/prueba.css';

const endpoint = "http://localhost:8000/api/pelicula"
const endpoint1 = 'http://localhost:8000/api/usuarioByuser/'


const CrearPeliculas = () => {
    //Variables usadas 
    const [nombre, setNombre] = useState('')
    const [director, setDirector] = useState('')
    const [genero, setGenero] = useState('')
    const [ano, setAno] = useState('')
    const [guion, setGuion] = useState('')
    const [id_usuario, setId_usuario] = useState(1)
    const [usuario, setusuario] = useState("")

    //Propiedad que nos permite la navegación
    const navigate = useNavigate()

    //Guardar las películas
    const store = async (e) => {
        e.preventDefault()

        await axios.post(endpoint, { nombre: nombre, director: director, genero: genero, ano: ano, guion: guion, id_usuario: id_usuario })

        navigate('/peliculas')
    }

    //Propiedades del toolbar de navegacion 
    const Mostrar = async () => {
        navigate(`/peliculas`)
    }
    //Propiedades del toolbar de navegacion 

    const CerrarSesion = async () => {
        localStorage.clear()
        navigate(`/`)
    }

    //Funciones que se ejecutan al iniciar la pantall
    useEffect(() => {

        comprobarLogin()
        getidUser()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //Obtenemos el id de un usario el cual esta guardado en el local storage
    const getidUser = async () => {
        const user = localStorage.getItem("usuario")
        const username = await axios.get(`${endpoint1}${user}`)
        console.log(username)
        setId_usuario(username.data[0].id)
    }

    //Comprobamos que tenga un usuario iniciado sesion para en caso de no estar que vuelva al login
    const comprobarLogin = async () => {
        if (!localStorage.getItem("usuario") && !localStorage.getItem("contrasena")) {
            navigate('/')
        } else {
            setusuario(localStorage.getItem("usuario"))
        }
    }


    //Html donde tenemos una barra de navegación y una formulario para completar los diferentes datos
    return (
        <div className="fondo">
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">Fimoteca</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link onClick={() => Mostrar()}>Inicio</Nav.Link>
                    <Nav.Link onClick={() => CerrarSesion()}>Cerrar sesión</Nav.Link>
                </Nav>
            </Navbar>

            <div className="container">
                <form onSubmit={store}>
                    <h4>Crear pelicula</h4>
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
                        <button type='submit' className='btn btn-primary btn-lg mt-2 mb-2 text-white'>Guardar pelicula</button>

                    </div>
                </form>
            </div>
        </div>

    )
}

export default CrearPeliculas