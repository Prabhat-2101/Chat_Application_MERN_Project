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
        default: "Welcome to whatsapp"
    },
    lastSeen: {
        type: Date,
        default: Date.now()
    }
},{timeStamp: true})

const Chat = mongoose.model("Chat",chat);
module.exports = Chat;