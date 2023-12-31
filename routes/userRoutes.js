const express = require('express')
const router=express.Router()
const userController=require('../controllers/userController')
const authController=require('../controllers/authController')

router.post('/register', authController.signup)
router.post('/login', authController.login)

router.use(authController.protect)
router.use(middleware)

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser)

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deletUser)

module.exports={
    router
}



