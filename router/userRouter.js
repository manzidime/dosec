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
.post(userController.checkData, userController.createUser);

router.route('/:id')
.patch(userController.checkData,userController.updateUser)
.get(userController.getUser);

//Desactiver ou Activer un utilisateur
router.patch('/activeOrDisableUser/:id', userController.activeOrDisable);

module.exports = router;