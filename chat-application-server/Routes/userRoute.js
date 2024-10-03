const express = require('express');
const Router = express.Router();
const {loginController, registerController} = require('../Controllers/userController');
const {addUserController, addGroupController,addMessageController,fetchUsersController, fetchUsersDetailsController,fetchUserChatsController,lastSeenController} = require('../Controllers/helperController');

Router.post('/login',loginController);
Router.post('/register',registerController);
Router.post('/adduser',addUserController);
Router.post('/addgroup',addGroupController);
Router.post('/addmessage',addMessageController);
Router.get('/:username', fetchUsersController);
Router.get('/u/:userid', fetchUsersDetailsController);
Router.get('/chats/:senderId/:receiverId', fetchUserChatsController);
Router.post('/logout', lastSeenController);

module.exports = Router;