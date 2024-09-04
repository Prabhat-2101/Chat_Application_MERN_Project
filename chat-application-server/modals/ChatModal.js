const mongoose = require('mongoose');

const chat = mongoose.Schema({
    chatName:{
        type:String,
        required:true
    },
    isGroupChat:{
        type:Boolean,
        required:true
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    userList:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    lastMsg:{
        type: String,
        ref: "Message"
    }
},{timeStamp: true})

const Chat = mongoose.model("Chat",chat);
module.exports = Chat;