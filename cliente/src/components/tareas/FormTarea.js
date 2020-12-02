import React, { useContext, useState, useEffect } from 'react';

import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'

const FormTarea = () => {

    //Extraer si un proyecto está activo
    const proyectosContext = useContext(proyectoContext);
    const { proyectoSeleccionado } = proyectosContext;

    //State de la tarea
    const tareasContext = useContext(tareaContext);
    const { tareaSeleccionada, errorTarea, agregarTarea, validarTarea, obtenerTareas, actualizarTarea } = tareasContext;

    
    //Effect que detecta si hay una tarea seleccionada
    useEffect(() => {
        if (tareaSeleccionada !== null) {
            setTarea(tareaSeleccionada)
        } else {
            setTarea({
                nombre: ''
            })
        }
    }, [tareaSeleccionada])

    //State del formulario
    const [tarea, setTarea] = useState({
        nombre: ''
    });

    //Extraer el nombre del proyecto 
    const { nombre } = tarea;

    //Si no hay proyecto seleccionado
    if (!proyectoSeleccionado) return null;

    //Array distructuring para extraer el proyecto actual
    const [proyectoActual] = proyectoSeleccionado

    //Leer los valores del formulario

    const handleChange = (e) => {
        setTarea({
            ...tarea,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        //Validar
        if (nombre.trim() === '') {
            validarTarea();
            return;
        }

        //Revisar si es edicion o nueva tarea
        if (tareaSeleccionada === null) {

            //Agregar la nueva tarea al state de tareas
            tarea.proyecto = proyectoActual._id;
            agregarTarea(tarea);

        }else {
            //Actualizar tarea existente
            actualizarTarea(tarea);
        }




        //Obtener y filtar las tareas del proyecto actual
        obtenerTareas(proyectoActual._id)

        //Reiniciar el form
        setTarea({
            nombre: ''
        })
    }

    return (
        <div className="formulario">
            <form
                onSubmit={handleSubmit}
            >
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre Tarea..."
                        name="nombre"
                        value={nombre}
                        onChange={handleChange}
                    />
                </div>
                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={tareaSeleccionada ? 'Editar Tarea' : 'Guardar Tarea'}
                    />
                </div>
            </form>
            {errorTarea ? <p className="mensaje error">El nombre de la tarea es obligatorio </p> : null}
        </div>
    );
}

export default FormTarea;