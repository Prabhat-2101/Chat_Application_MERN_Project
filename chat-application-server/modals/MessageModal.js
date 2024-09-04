const mongoose = require('mongoose');

const message = mongoose.Schema({
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    reciever:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    content:{
        type:String,
        required:true
    }
    // ,
    // chat:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Chat',
    // }
},{timeStamp: true});

const Message = mongoose.model("Message",message);
module.exports = Message;