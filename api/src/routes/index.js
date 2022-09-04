const { Router } = require('express');
const {activitiesRouter} = require('./activities')
const {countriesRouter} = require('./countries')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.use('/countries', countriesRouter);
router.use('/activities', activitiesRouter);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
