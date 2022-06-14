const express = require('express');
const { adminSignUp, adminSignIn, getAdmins, getAdmin, deleteAdmin, updateAdmin, } = require('../controlers/auth');
const { checkAuthorized, adminMiddleware, checkToken } = require('../middleware/index');
const router = express.Router();
//SIGNUP
router.post('/sign-up', adminSignUp);

//SIGNIN
router.post('/sign-in', adminSignIn);

//CHECK TOKEN
router.get('/check/token', checkToken);

//GETS
router.get('/', getAdmins);

//GET
router.get('/:adminId', getAdmin);

//Update
router.put('/:adminId', checkAuthorized, adminMiddleware, updateAdmin);

//DELETE
router.delete('/:adminId', checkAuthorized, adminMiddleware, deleteAdmin);

module.exports = router;
