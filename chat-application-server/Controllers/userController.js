const UserModal = require('../modals/UserModal');
const expressAsyncHandler = require('express-async-handler');

const loginController = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ message: "Fill All input Fields"});
        return;
    }
    try {
        const user = await UserModal.findOne({ email });
        if (!user) {
            res.status(401).json({ message: "User Not Found" });
            return;
        }
        const isPasswordValid = await user.matchPassword(password);
        if (isPasswordValid) {
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                mobile: user.mobile,
            });
        } else {
            console.error('Invalid password for email:', email);
            res.status(401).json({ message: "Invalid Password" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});


const registerController = expressAsyncHandler(async (req, res) => {
    const { name, email, mobile, password } = req.body;
    if (!name || !email || !mobile || !password) {
        res.status(400).json({ message: "Fill All input Fields" });
        return; 
    }
    const userFound = await UserModal.findOne({ email });
    if (userFound) {
        res.status(409).json({ message: "User Already Exist" });
        return; 
    }
    const newUser = await UserModal.create({ name, email, mobile, password });
    if (newUser) {
        res.status(200).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            mobile: newUser.mobile,
        })
    }
});



module.exports = { loginController, registerController };