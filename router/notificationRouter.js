const express = require('express');
const notificationController = require('./../controller/notificationController');
const authController = require('./../controller/authController');

const router = express.Router();

//Protection de ressources
router.use(authController.protect);

router.patch('/state/:id', notificationController.state);
router.patch('/read/:id', notificationController.read);

router.route('/').post(notificationController.createOne)
    .get(notificationController.getAll);

module.exports = router;