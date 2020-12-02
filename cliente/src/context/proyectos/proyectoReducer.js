import {
    FORMULARIO_PROYECTO,
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTO,
    PROYECTO_ERROR,
    MOSTRAR_ERROR,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO
    
} from '../../types'

export default (state, action) => {
    switch (action.type) {

        case FORMULARIO_PROYECTO:
            return {
                ...state,
                formNuevoProyecto: true
            }
        case OBTENER_PROYECTOS:
            return {
                ...state,
                proyectos: action.payload
            }
        case AGREGAR_PROYECTO:
            return {
                ...state,
                proyectos: [...state.proyectos, action.payload],
                formNuevoProyecto: false,
                errorFormulario: false
            }
            case PROYECTO_ERROR:
            return {
                ...state,
                mensaje: action.payload
            }
        case MOSTRAR_ERROR:
            return {
                ...state,
                errorFormulario: true
            }
        case PROYECTO_ACTUAL:
            return {
                ...state,
                proyectoSeleccionado: state.proyectos.filter(proyecto =>
                    proyecto._id === action.payload)
            }
        case ELIMINAR_PROYECTO:
            return {
                ...state,
                proyectos: state.proyectos.filter(proyecto =>
                    proyecto._id !== action.payload),
                proyectoSeleccionado: null
            }
        default:
            return state;
    }
}