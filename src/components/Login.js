import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IconName } from "react-icons/fa";

const endpoint = 'http://localhost:8000/api/usuarioByuser/'

const EditProduct = () => {
    const [usuario, setusuario] = useState('')
    const [contrasena, setcontrasena] = useState('')


    const navigate = useNavigate()


    const registro = async () => {
        navigate('/registro')
    }
    const login = async (e) => {
        e.preventDefault()
        if (usuario != "" && contrasena != "") {
            const username = await axios.get(`${endpoint}${usuario}`)
            console.log(username)            
            if (username.data[0].contrasena == contrasena) {
                localStorage.setItem("contrasena",contrasena)
                localStorage.setItem("usuario",usuario)

                navigate('/peliculas')
            }

        }
    }

    return (
        <div className="fondoLogin" >

            <div className="form">
                <div className="title">Bienvenido</div>
                <div className="input-container ic1">
                    <input value={usuario}
                        onChange={(e) => setusuario(e.target.value)} id="firstname" className="input" type="text" placeholder="Usuario " />
                </div>
                <div class="input-container ic2">
                    <input value={contrasena}
                        onChange={(e) => setcontrasena(e.target.value)} id="lastname" className="input" type="password" placeholder="Contraseña" />
                </div>
                <button onClick={login} type="text" className="submit">Iniciar sesión</button>

                <button onClick={registro} type="text" className="submit">Registrar cuenta</button>


            </div>
        </div>
    )
}

export default EditProduct