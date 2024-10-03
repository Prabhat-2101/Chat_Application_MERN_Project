const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const user = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    lastSeen:{
        type: Date,
        default: Date.now()
    }
});

user.pre('save', async function(next) {
    const user = this;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
});

user.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", user);
module.exports = User;