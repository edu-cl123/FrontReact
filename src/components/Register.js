import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const endpoint = 'http://localhost:8000/api/usuario'

const EditProduct = () => {
    const [usuario, setusuario] = useState('')
    const [correo, setcorreo] = useState('')
    const [contrasena, setcontrasena] = useState('')


    const { id } = useParams()

    const navigate = useNavigate()

    const login = async () => {
        navigate('/')
    }

    const register = async (e) => {
        e.preventDefault()
        if (usuario != "" && correo != "" && contrasena != "") {
            await axios.post(`${endpoint}`, {
                usuario: usuario,
                correo: correo,
                contrasena: contrasena,
            })
            navigate('/')
        }

    }

    return (
        <div   >


            <div className="form">
                <div className="title">Bienvenido</div>
                <div className="subtitle">Registrate en nuestra plataforma!</div>
                <div className="input-container ic1">
                    <input value={usuario}
                        onChange={(e) => setusuario(e.target.value)} id="firstname" className="input" type="text" placeholder="Usuario " />
                </div>
                <div class="input-container ic2">
                    <input value={correo}
                        onChange={(e) => setcorreo(e.target.value)} id="lastname" className="input" type="text" placeholder=" Correo Electronico" />
                </div>
                <div class="input-container ic2">
                    <input value={contrasena}
                        onChange={(e) => setcontrasena(e.target.value)} id="email" className="input" type="password" placeholder="Contraseña " />
                </div>
                <button onClick={register} type="text" class="submit">Registrar</button>

                <button onClick={login} type="text" class="submit">Iniciar sesión</button>

            </div>


        </div>
    )
}

export default EditProduct