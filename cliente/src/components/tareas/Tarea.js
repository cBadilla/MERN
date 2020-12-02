import React, { useContext } from 'react';

import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'

const Tareas = ({ tarea }) => {

    //Extraer si un proyecto está activo
    const proyectosContext = useContext(proyectoContext);
    const { proyectoSeleccionado } = proyectosContext;

    //Extraer el proyecto actual
    const [proyectoActual] = proyectoSeleccionado;

    //State de la tarea
    const tareasContext = useContext(tareaContext);
    const { eliminarTarea, obtenerTareas, actualizarTarea, editarTareaActual} = tareasContext;


    // Funcion que se ejecuta cuando el usuario preciona el boton de eliminar tarea
    const handleClickEliminar = (tarea) => {
        eliminarTarea(tarea._id, proyectoActual._id);
        obtenerTareas(proyectoActual._id);
    }

    // Funcion que modifica el estado de las tareas
    const handleClickEstadoTarea = (tarea) => {
        if (tarea.estado) {
            tarea.estado = false;
        } else {
            tarea.estado = true;
        }
        actualizarTarea(tarea);
    }

    //Editar la tarea actual
    const handleClickEditarTarea = (tarea) =>{
        editarTareaActual(tarea);
    }



    return (
        <li className="tarea sombra">
            <p>{tarea.nombre}</p>
            <div className="estado">
                {tarea.estado
                    ?
                    (
                        <button
                            type="button"
                            className="completo"
                            onClick={() => handleClickEstadoTarea(tarea)}
                        >
                            Completo
                        </button>
                    )
                    :
                    (
                        <button
                            type="button"
                            className="incompleto"
                            onClick={() => handleClickEstadoTarea(tarea)}
                        >
                            Incompleto
                        </button>
                    )
                }
            </div>
            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={() => handleClickEditarTarea(tarea)}
                >
                    Editar
                </button>
                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={() => handleClickEliminar(tarea)}
                >
                    Eliminar
                </button>
            </div>
        </li>
    );
}

export default Tareas;