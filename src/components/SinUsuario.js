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
    const [peliculas, setPeliculas] = useState([{ id: 0, nombre: '', director: 'Example', genero: 'Example', ano: 'Example' }])
    const [usuario, setusuario] = useState("")
    const [tablaPeliculas, settablaPeliculas] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [tipoBusqueda, setTipoBusqueda] = useState("");

    const navigate = useNavigate()

    const handleChange = e => {
        setBusqueda(e.target.value);
        filtrar(e.target.value);
    }

    const handleChange2 = e => {
        setTipoBusqueda(e.target.value)
    }

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
    //metodo de filtrado 2   

    const columns = [
        { field: 'nombre', headerName: 'Nombre', width: 130 },
        { field: 'director', headerName: 'Director', width: 130 },
        { field: 'genero', headerName: 'Genero', width: 130 },
        { field: 'ano', headerName: 'Año', width: 130 },
        { field: 'guion', headerName: 'Guión', width: 130 },
    ];


    useEffect(() => {

        getAllPeliculas()
    }, [])

    const getAllPeliculas = async () => {

        const reponse = await axios.get(`${endpoint}/peliculas`)
        setPeliculas(reponse.data)
        settablaPeliculas(reponse.data)

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
                    <Nav.Link onClick={() => CerrarSesion()}>Cerrar sesión</Nav.Link>
                </Nav>
            </Navbar>

            <Card sx={{ margin: "0 auto", width: "75%", minWidth: 275,marginTop:"50px" }}>
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