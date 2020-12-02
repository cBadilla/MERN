import React, {useContext} from 'react';

import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'

const Proyecto = ({ proyecto }) => {

    //State del proyecto
    const proyectosContext = useContext(proyectoContext);
    const { proyectoActual } = proyectosContext;

    //State de la tarea
    const tareasContext = useContext(tareaContext);
    const { obtenerTareas } = tareasContext;


    //Funcion para ahregar el proyecto actual
    const handleClickProyectoActual = (id) => {
        proyectoActual(id);
        obtenerTareas(id);
       
    }
    return (
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={() => handleClickProyectoActual(proyecto._id)}
            >
                {proyecto.nombre}
            </button>
        </li>
    );
}

export default Proyecto;