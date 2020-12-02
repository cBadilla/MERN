const express = require('express');
const router = express.Router();

const tareaControllers = require('../controllers/tareaControllers');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

//Crear tarea
//api/tareas

router.post('/',
    auth,
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('proyecto', 'El proyecto es obligatorio').not().isEmpty()
    ],
    tareaControllers.crearTarea
);

//Obtener las tareas por proyecto
router.get('/',
    auth,
    tareaControllers.obtenerTareasProyecto
);

//Actualizar tarea 
router.put('/:id',
    auth,
    tareaControllers.actualizarTarea
);

//Eliminar tarea 
router.delete('/:id',
    auth,
    tareaControllers.eliminarTarea
);

module.exports = router;