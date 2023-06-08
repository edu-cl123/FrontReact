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
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

const endpoint = "http://localhost:8000/api"
const MostrarPeliculas = () => {
    const [peliculas, setPeliculas] = useState([])
    const [usuario, setusuario] = useState("")

    const navigate = useNavigate()

    const columns = [
        { field: 'nombre', headerName: 'Nombre', width: 130 },
        { field: 'director', headerName: 'Director', width: 130 },
        { field: 'genero', headerName: 'Genero', width: 130 },
        { field: 'ano', headerName: 'Año', width: 130 },
        { field: 'guion', headerName: 'Guión', width: 130 },
        {
            field: 'action',
            headerName: 'Action',
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
                    alert("Peliculas eliminada correctamente");
                    getAllPeliculas()

                };

                const editarr = (e) => {
                    const currentRow = params.row;
                    navigate(`/edit/${currentRow.id}`)
                };

                return (
                    <Stack direction="row" spacing={2}>
                        <Button variant="outlined" color="error" size="small" onClick={info}>Ver</Button>
                        <Button variant="outlined" color="warning" size="small" onClick={editarr}>Editar</Button>
                        <Button variant="outlined" color="error" size="small" onClick={deletee}>Eliminar</Button>

                    </Stack>
                );
            },
        }
    ];


    useEffect(() => {

        comprobarLogin()
        getAllPeliculas()
    }, [])

    const getAllPeliculas = async () => {

        const reponse = await axios.get(`${endpoint}/peliculas`)
        setPeliculas(reponse.data)

    }

    const comprobarLogin = async () => {
        if (!localStorage.getItem("usuario") && !localStorage.getItem("contrasena")) {
            navigate('/')
        } else {
            setusuario(localStorage.getItem("usuario"))
        }
    }


    const crearPeliculas = async () => {
        navigate(`/create/${usuario}`)
    }

    const Mostrar = async () => {
        navigate(`/peliculas`)
    }

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
                <button onClick={() => crearPeliculas()} className='btn btn-success btn-lg mt-2 mb-2 text-white'>Añadir peliculas</button>
            </div>

            <Card sx={{ margin:"0 auto",width:"75%",minWidth: 275 }}>
                <CardContent>
                <div style={{ width:'100%'}}>
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