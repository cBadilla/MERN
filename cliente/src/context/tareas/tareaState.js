import React, { useReducer } from 'react';

import TareaContext from './tareaContext'
import TareaReducer from './tareaReducer'

import clienteAxios from '../../config/axios'

import {
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA
} from '../../types'

const TareaState = props => {
    const initialState = {
        tareasProyecto: [],
        errorTarea: false,
        tareaSeleccionada: null
    }

    //Crear dispatch y state
    const [state, dispatch] = useReducer(TareaReducer, initialState);

    //Crear las funciones

    //Obtener las tareas de un proyecto especifico
    const obtenerTareas = async proyecto => {
        try {
            const resultado = await clienteAxios.get('/api/tareas', {params: {proyecto}});
            dispatch({
                type: TAREAS_PROYECTO,
                payload: resultado.data.tareas
            })
        } catch (error) {
            console.log(error)
        }
    }

    //Agregar una tarea al proyeco seleccionado
    const agregarTarea = async tarea => {
        try {
            const resultado = await clienteAxios.post('/api/tareas', tarea);
            dispatch({
                type: AGREGAR_TAREA,
                payload: resultado.data.tarea
            })
        } catch (error) {
            console.log(error)
        }
    }

    //Valida y muestra un error
    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    //Eliminar tarea por id
    const eliminarTarea = async (id, proyecto) => {
      try {
          await clienteAxios.delete(`/api/tareas/${id}`, {params: {proyecto}})
        dispatch({
            type: ELIMINAR_TAREA,
            payload: id
        })
      } catch (error) {
          console.log(error)
      }
    }

       //Editar la tarea
       const actualizarTarea = async (tarea) => {
      try {

        const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea)
        dispatch({
            type: ACTUALIZAR_TAREA,
            payload: resultado.data.tareaExiste
        })
      } catch (error) {
          console.log(error)
      }
    }

    //Extrae una tarea para editarla
    const editarTareaActual = (tarea) => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }

 


    return (
        <TareaContext.Provider
            value={{
                tareasProyecto: state.tareasProyecto,
                errorTarea: state.errorTarea,
                tareaSeleccionada: state.tareaSeleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                editarTareaActual,
                actualizarTarea
            }}
        >
            {props.children}
        </TareaContext.Provider>
    )
}

export default TareaState;
