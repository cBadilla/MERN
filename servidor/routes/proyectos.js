const express = require('express');
const router = express.Router();

const proyectoControllers = require('../controllers/proyectoControllers');
const auth = require('../middleware/auth');
const {check} = require('express-validator');

//Crear proyectos
//api/proyectos
router.post('/',
    auth,
    [
        check('nombre', 'El nombre del proyecto es obligatorio'). not().isEmpty()
    ],
    proyectoControllers.crearProyecto
)

//Obtener todos los proyectos por usuario logueado
router.get('/',
    auth,
    proyectoControllers.obtenerProyectos
)

//Actualizar un proyecto
router.put('/:id',
    auth,
    [
        check('nombre', 'El nombre del proyecto es obligatorio'). not().isEmpty()
    ],
    proyectoControllers.actualizarProyecto
)

//Eliminar un proyecto
router.delete('/:id',
    auth,
    proyectoControllers.eliminarProyecto
)

module.exports = router;