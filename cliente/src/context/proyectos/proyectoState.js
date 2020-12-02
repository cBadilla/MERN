import React, { useReducer } from 'react';

import proyectoContext from './proyectoContext'
import proyectoReducer from './proyectoReducer'

import {
    FORMULARIO_PROYECTO,
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTO,
    PROYECTO_ERROR,
    MOSTRAR_ERROR,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO,
} from '../../types'

import clienteAxios from '../../config/axios'


const ProyectoState = props => {


    const initialState = {
        proyectos: [],
        formNuevoProyecto: false,
        errorFormulario: false,
        proyectoSeleccionado: null,
        mensaje: null
    }

    // Dispatcj para ejecutar las acciones
    const [state, dispatch] = useReducer(proyectoReducer, initialState)

    //Serie de funciones para el CRUD
    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        })
    }

    const obtenerProyectos = async () => {
        try {
            const resultado = await clienteAxios.get('/api/proyectos');

            //Obtener los proyectos (lo que tome la función como parametro es lo que va a ser el payload)
            dispatch({
                type: OBTENER_PROYECTOS,
                payload: resultado.data.proyectosUsuario
            })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error' 
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
    }

    //Agregar nuevo proyecto
    const agregarProyecto = async proyecto => {

        try {
            const resultado = await clienteAxios.post('/api/proyectos', proyecto)

            //Insertar el proyecto en el state
            dispatch({
                type: AGREGAR_PROYECTO,
                payload: resultado.data
            })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error' 
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
    }

    //Mostrar error
    const mostrarError = () => {
        dispatch({
            type: MOSTRAR_ERROR
        })
    }

    //Seleccionar proyecto
    const proyectoActual = proyecto => {
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyecto
        })

    }

    //Eliminar un proyecto
    const eliminarProyecto = async (proyectoId) => {
        try {
             await clienteAxios.delete(`/api/proyectos/${proyectoId}`)
            dispatch({
                type: ELIMINAR_PROYECTO,
                payload: proyectoId
            })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error' 
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
    }

    
    return (
        <proyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                formNuevoProyecto: state.formNuevoProyecto,
                errorFormulario: state.errorFormulario,
                proyectoSeleccionado: state.proyectoSeleccionado,
                mensaje: state.mensaje,
                mostrarFormulario,
                obtenerProyectos,
                agregarProyecto,
                mostrarError,
                proyectoActual,
                eliminarProyecto
            }}
        >
            {props.children}
        </proyectoContext.Provider>
    )
}

export default ProyectoState;