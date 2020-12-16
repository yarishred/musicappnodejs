//Core Module
const path = require("path");

//Third Modules
const express = require("express");

//Import Controllers
const userController = require("../controllers/userController");

//Call Express Router
const router = express.Router()

//User Routes
router.get('/', userController.getIndex)
router.get('/login', userController.getCreateAccount)
router.get('/myMusic', userController.getMyMusicPlaylist)
router.post('/login', userController.postCreateAccount)
router.post('/myMusic', userController.postLogin)
router.post('/myMusicPlaylist', userController.postMyMusicPlaylist)








module.exports = router