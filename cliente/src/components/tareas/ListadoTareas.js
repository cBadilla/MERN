import React, { Fragment, useContext } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import Tarea from '../tareas/Tarea'

import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'


const ListadoTareas = () => {

    const proyectosContext = useContext(proyectoContext);
    const { proyectoSeleccionado, eliminarProyecto } = proyectosContext;

    //Obtener las tareas del proyecto
    const tareasContext = useContext(tareaContext);
    const { tareasProyecto } = tareasContext;


    //Si no hay proyecto seleccionado
    if (!proyectoSeleccionado) return <h2>Selecciona un proyecto</h2>

    //Array distructuring para extraer el proyecto actual
    const [proyectoActual] = proyectoSeleccionado

      

    const handleClickEliminar = () => {
        eliminarProyecto(proyectoActual._id);
    }

    return (
        <Fragment>
            <h2>Proyecto: {proyectoActual.nombre}</h2>
            <ul className="listado-tareas">
                {tareasProyecto.length === 0
                    ?
                    (<li className="tarea"><p>No hay tareas</p></li>)
                    :
                    <TransitionGroup>
                        {tareasProyecto.map(tarea => (
                            <CSSTransition
                                key={tarea._id}
                                timeout={200}
                                classNames="tarea"
                            >
                                <Tarea
                                    tarea={tarea}
                                />
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                }
            </ul>
            <button
                type="button"
                className="btn btn-primario"
                onClick={() => handleClickEliminar()}
            >
                Eliminar Proyecto &times;
                </button>
        </Fragment>
    );
}

export default ListadoTareas;