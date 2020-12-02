import React, { Fragment, useState, useContext } from 'react';

import proyectoContext from '../../context/proyectos/proyectoContext'

const NuevoProyecto = () => {

    //State para el formulario

    const proyectosContext = useContext(proyectoContext);

    const { formNuevoProyecto, errorFormulario, mostrarFormulario, agregarProyecto, mostrarError } = proyectosContext;

    //State para proyecto
    const [proyecto, setProyecto] = useState({
        nombre: ''
    });


   

    //Extraer nombre del proyecto
    const { nombre } = proyecto;



    const handleChangeProyecto = (e) => {
        setProyecto({
            ...proyecto,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmitProyecto = (e) => {
        e.preventDefault();

        //Validar proyecto
        if (nombre === '') {
            mostrarError();
            return;
        }

        //Agregar al state
        agregarProyecto(proyecto);

        //Reinicia el form
        setProyecto({
            nombre: ''
        })
    }

    const handleClickForm = () => {
        mostrarFormulario();
    }


    return (
        <Fragment>
            <button
                tytpe="button"
                className="btn btn-block btn-primario"
                onClick={handleClickForm}
            >
                Nuevo Proyecto
        </button>

            {
                formNuevoProyecto
                    ?
                    <form
                        className="formulario-nuevo-proyecto"
                        onSubmit={handleSubmitProyecto}
                    >
                        <input
                            type="text"
                            className="insput-text"
                            placeholder="Nombre Proyecto"
                            name="nombre"
                            value={nombre}
                            onChange={handleChangeProyecto}
                        />
                        <input
                            type="submit"
                            className="btn btn-block btn-primario"
                            value="Agregar Proyecto"
                        />
                    </form>
                    :
                    null
            }
            {errorFormulario
                ?
                <p className="mensaje error">El nombre del proyecto es obligatorio</p>
                :
                null
            }
        </Fragment>
    );
}

export default NuevoProyecto;