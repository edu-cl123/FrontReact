import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { Link, Navigate } from "react-router-dom"
import { useNavigate } from 'react-router-dom';

import '../CustomCss/prueba.css';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { red } from '@mui/material/colors';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

const endpoint = "http://localhost:8000/api"
const MostrarPeliculas = () => {
    //Variable usadas
    const [peliculas, setPeliculas] = useState([{ id: 0, nombre: '', director: 'Example', genero: 'Example', ano: 'Example' }])
    const [usuario, setusuario] = useState("")
    const [tablaPeliculas, settablaPeliculas] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [tipoBusqueda, setTipoBusqueda] = useState("");
    const navigate = useNavigate()

    //Funciones para el buscador por titulo
    const handleChange = e => {
        setBusqueda(e.target.value);
        filtrar(e.target.value);
    }

    //Funcion para el buscador por Director 
    const handleChange2 = e => {
        setTipoBusqueda(e.target.value)
    }

    //Funcion que nos permite buscar dependiendo del valor del input el cual lo devuelve la coincidencias
    const filtrar = (terminoBusqueda) => {
        if (tipoBusqueda == "1") {
            var resultadosBusqueda = tablaPeliculas.filter((elemento) => {
                if (elemento.nombre.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())) {
                    return elemento;
                }
            });
        } else {
            var resultadosBusqueda = tablaPeliculas.filter((elemento) => {
                if (elemento.director.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())) {
                    return elemento;
                }
            });
        }

        setPeliculas(resultadosBusqueda);
    }

    //Definición de las columnas 
    const columns = [
        { field: 'nombre', headerName: 'Nombre', width: 130 },
        { field: 'director', headerName: 'Director', width: 130 },
        { field: 'genero', headerName: 'Género', width: 130 },
        { field: 'ano', headerName: 'Año', width: 130 },
        { field: 'guion', headerName: 'Guión', width: 130 },
        {
            field: 'acciones',
            headerName: 'Acciones',
            width: 350,
            sortable: false,
            disableClickEventBubbling: true,

            renderCell: (params) => {
                const info = (e) => {
                    const currentRow = params.row;
                    navigate(`/info/${currentRow.id}`)
                };

                const deletee = async (e) => {

                    const currentRow = params.row;
                    await axios.delete(`${endpoint}/pelicula/${currentRow.id}`)
                    alert("Pelicula eliminada correctamente");
                    getAllPeliculas()

                };

                const editarr = (e) => {
                    const currentRow = params.row;
                    navigate(`/edit/${currentRow.id}`)
                };

                return (
                    //Acciones qdisponibles para usar en cada elementos 
                    <Stack direction="row" spacing={2}>
                        <Button variant="outlined" color="error" size="small" onClick={info}>Ver</Button>
                        <Button variant="outlined" color="warning" size="small" onClick={editarr}>Editar</Button>
                        <Button variant="outlined" color="error" size="small" onClick={deletee}>Eliminar</Button>

                    </Stack>
                );
            },
        }
    ];

//Funciones al entrar en la pagina 
    useEffect(() => {

        comprobarLogin()
        getAllPeliculas()
    }, [])

    //Obtenemos todas las peliculas
    const getAllPeliculas = async () => {

        const reponse = await axios.get(`${endpoint}/peliculas`)
        setPeliculas(reponse.data)
        settablaPeliculas(reponse.data)

    }

    //Comprobamos el login
    const comprobarLogin = async () => {
        if (!localStorage.getItem("usuario") && !localStorage.getItem("contrasena")) {
            navigate('/')
        } else {
            setusuario(localStorage.getItem("usuario"))
        }
    }

//Navbar y elementos
    const crearPeliculas = async () => {
        navigate(`/create/${usuario}`)
    }
//Navbar y elementos

    const Mostrar = async () => {
        navigate(`/peliculas`)
    }
//Navbar y elementos

    const CerrarSesion = async () => {
        localStorage.clear()
        navigate(`/`)
    }
    return (
        <div className='fondo'>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">Fimoteca</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link onClick={() => crearPeliculas()}>Crear película</Nav.Link>
                    <Nav.Link onClick={() => Mostrar()}>Inicio</Nav.Link>
                    <Nav.Link onClick={() => CerrarSesion()}>Cerrar sesión</Nav.Link>
                </Nav>
            </Navbar>


            <div className='d-grid gap-2'>
                <button style={{ width: '75%', margin: "0 auto", }} onClick={() => crearPeliculas()} className='btn btn-success btn-lg mt-2 mb-2 text-white'>Añadir peliculas</button>
            </div>

            <Card sx={{ margin: "0 auto", width: "75%", minWidth: 275 }}>
                <div class="row">
                    <div class="col-sm">
                        <input style={{ width: "70%", margin: "0 auto", marginTop: "20px" }}
                            className="form-control inputBuscar"
                            value={busqueda}
                            placeholder="Búsqueda por Nombre o Director"
                            onChange={handleChange}
                        />
                    </div>
                    <div class="col-sm">
                        <Select style={{ height:"50%",width: "30%", margin: "0 auto", marginTop: "20px" }}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={tipoBusqueda}
                            label="Busqueda"
                            placeholder='Nombre'
                            onChange={handleChange2}
                        >
                            <MenuItem value={1}>Nombre</MenuItem>
                            <MenuItem value={2}>Director</MenuItem>
                        </Select>
                    </div>
                </div>

                <CardContent>
                    <div style={{ width: '100%' }}>
                        <DataGrid
                            rows={peliculas}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 5 },
                                },
                            }}
                            pageSizeOptions={[5, 10]}

                        />
                    </div>
                </CardContent>

            </Card>


        </div>
    )
}

export default MostrarPeliculas