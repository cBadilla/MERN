import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';

const NuevaCuenta = (props) => {

    //Extraer los valores del context
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    const authContext = useContext(AuthContext);
    const { mensaje, autenticado, registrarUsuario } = authContext;

    //En caso de que el usuario ya se haya autenticado o registrado 
    useEffect(()=>{
        if (autenticado) {
            props.history.push('/proyectos')
        }
        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }
        //eslint-disable-next-line
    },[mensaje, autenticado, props.history ])

    const [usuario, setUsuario] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmar: ''
    });


    // Estraer variables del objeto del state
    const { nombre, email, password, confirmar } = usuario;

    const handleUsuario = (e) => {

        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }

    //Cuando el usuario quiere iniciar sesion
    const handleSubmit = (e) => {
        e.preventDefault();

        // //Validación
        if (nombre === '' || email === '' || password === '' || confirmar === '') {
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
            return;
        };

        // //Contraseña con 6 caracteres como minimo
        if (password.length < 6) {
            mostrarAlerta('La contraseña debe de ser de almenos 6 caracteres', 'alerta-error')
            return;
        };

        // //que las dos contraseñas sean iguales
        if (password !== confirmar) {
            mostrarAlerta('Las contraseñas no coinciden', 'alerta-error');
            return;
        }
        //Pasar al action
        registrarUsuario({
            nombre,
            email,
            password
        })
 }

    return (
        <div className="form-usuario">

            {alerta ?
                (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>)
                : null}

            <div className="contenedor-form sombra-dark">
                <h1>Crear una cuenta</h1>

                <form
                    onSubmit={handleSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="nombre">Nombre</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            placeholder="Tu nombre"
                            value={nombre}
                            onChange={handleUsuario}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Tu email"
                            value={email}
                            onChange={handleUsuario}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Tu password"
                            value={password}
                            onChange={handleUsuario}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="confirmar">Confirmar contraseña</label>
                        <input
                            type="password"
                            id="confirmar"
                            name="confirmar"
                            placeholder="Repite tu contraseña"
                            value={confirmar}
                            onChange={handleUsuario}
                        />
                    </div>
                    <div className="campo-form">
                        <input
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Crear Cuenta"
                        />

                    </div>
                </form>
                <Link
                    to={'/'}
                    className="enlace-cuenta"
                >
                    Volver a Inicar Sesión
                </Link>
            </div>

        </div>
    );
}

export default NuevaCuenta;