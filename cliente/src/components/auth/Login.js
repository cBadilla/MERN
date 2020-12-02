import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';

const Login = (props) => {

    //Extraer los valores del context
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    const authContext = useContext(AuthContext);
    const { mensaje, autenticado, iniciarSesion } = authContext;

    //En caso de que el password o el usuario no exista
    useEffect(() => {
        if (autenticado) {
            props.history.push('/proyectos')
        }
        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }
        //eslint-disable-next-line
    }, [mensaje, autenticado, props.history])


    const [usuario, setUsuario] = useState({
        email: '',
        password: ''
    });

    // Estraer variables del objeto del state
    const { email, password } = usuario;

    const handleUsuario = (e) => {

        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }

    //Cuando el usuario quiere iniciar sesion
    const handleSubmit = (e) => {
        e.preventDefault();

        //Validación
        if (email.trim() === '' || password.trim() === '') {
            mostrarAlerta('Todos los campos son obligaorios', 'alerta-error')
        }

        //Pasar al action
        iniciarSesion({ email, password });
    }

    return (
        <div className="form-usuario">

            {alerta ?
                (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>)
                : null}

            <div className="contenedor-form sombra-dark">
                <h1>Iniciar Sesión</h1>

                <form
                    onSubmit={handleSubmit}
                >
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
                            placeholder="Tu contraseña"
                            value={password}
                            onChange={handleUsuario}
                        />
                    </div>
                    <div className="campo-form">
                        <input
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Iniciar Seción"
                        />

                    </div>
                </form>
                <Link
                    to={'/nueva-cuenta'}
                    className="enlace-cuenta"
                >
                    ObtenerCuenta
                </Link>
            </div>

        </div>
    );
}

export default Login;