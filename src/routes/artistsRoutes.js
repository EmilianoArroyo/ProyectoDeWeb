const router = require('express').Router();
const artistController = require('./../controllers/artistsController');
const auth = require('./../middlewares/auth')
const roles = require('./../middlewares/roles')
const file = require('./../middlewares/file');
const secquery = require('./../middlewares/secquery')

// Los datos se mandan por post y por json para seguridad
router.post('/login/artist',secquery,artistController.iniciarsesion);
router.post('/register/artist',file.single('profilePhoto'),artistController.creartist);
router.post('/register/albums',auth,roles(['artist'],{'none':'none'}),file.single('albumPhoto'),artistController.registeralbum);
router.get('/artist',secquery,artistController.showProfile);
router.get('/search',secquery,artistController.search);

module.exports = router;