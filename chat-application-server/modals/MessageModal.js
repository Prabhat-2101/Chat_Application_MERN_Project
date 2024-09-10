const mongoose = require('mongoose');
const Chat = require('./ChatModal');

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
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
},{timeStamp: true});

const Message = mongoose.model("Message",message);
// message.post('save', async function(message) {
//     const chat = await Chat.findById(message.chat);
//     if (chat) {
//       chat.lastMsg = message.content;
//       await chat.save();
//     }
//   });
module.exports = Message;