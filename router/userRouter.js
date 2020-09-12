const express = require('express');
const userController = require('./../controller/userController');
const authController = require('./../controller/authController');

const router = express.Router();

//Login
router.post('/login', authController.login);

//logout
router.get('/logout', authController.logout);

//Change Password
router.patch('/changeMePassword', authController.protect, userController.changeMePassword);

router.route('/')
.get(authController.protect, userController.getAllUser)
.post(userController.createUser);

router.route('/:id')
.patch(userController.updateUser)
.get(userController.getUser);

//Desactiver ou Activer un utilisateur
router.delete('/activeOrDisableUser/:id', userController.activeOrDisable);

module.exports = router;