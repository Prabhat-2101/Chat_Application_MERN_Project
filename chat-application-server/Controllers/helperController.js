const expressAsyncHandler = require('express-async-handler');
const { ObjectId } = require('mongodb');
const ChatModal = require('../modals/ChatModal')
const UserModal = require('../modals/UserModal');
const MessageModal = require('../modals/MessageModal');

const addGroupController = expressAsyncHandler(async (req, res) => {
    const { chatName, isGroupChat, admin, userList, lastMsg } = req.body;
    if (!chatName || !userList || userList.length < 1) {
        res.status(400).json({ message: "Fill All input Fields and at least one user is required" });
        return;
    }
    try {
        const adminUser = await UserModal.findOne({ email: admin });
        if (!adminUser) {
            res.status(404).json({ message: "Admin user not found" });
            return;
        }

        const userIds = await Promise.all(userList.map(async (userEmail) => {
            const user = await UserModal.findOne({ email: userEmail });
            if (!user) {
                throw new Error(`User not found: ${userEmail}`);
            }
            return user._id;
        }));

        const existingChat = await ChatModal.findOne({
            admin: adminUser._id,
            userList: { $all: userIds }
        });
        if (existingChat) {
            res.status(409).json({ message: "Group with same users already exists" });
            return;
        }

        const newChat = await ChatModal.create({
            chatName,
            isGroupChat,
            admin: adminUser._id,
            userList: userIds,
            lastMsg
        });

        if (newChat) {
            res.json({
                chatName: chatName,
                isGroup: isGroupChat,
                admin: admin,
                userList: userList,
                lastMsg: lastMsg
            });
        }
    } catch (error) {
        res.send(error);
    }
});

const addUserController = expressAsyncHandler(async (req, res) => {
    const { chatName, isGroupChat, admin, userList, lastMsg } = req.body;
    if (!chatName || !userList || userList.length !== 1) {
        res.status(400).json({ message: "Fill All input Fields and only one user is allowed" });
        return;
    }
    try {
        const adminUser = await UserModal.findOne({ email: admin });
        if (!adminUser) {
            res.status(404).json({ message: "Admin user not found" });
            return;
        }
        const user = await UserModal.findOne({ email: userList[0] });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        const existingChat = await ChatModal.findOne({
            admin: adminUser._id,
            userList: user._id
        });
        if (existingChat) {
            res.status(409).json({ message: "Username Already Added to your contact" });
            return;
        }
        const newChat = await ChatModal.create({
            chatName,
            isGroupChat,
            admin: adminUser._id,
            userList: [user._id],
            lastMsg
        });

        if (newChat) {
            res.json({
                chatName: chatName,
                isGroup: isGroupChat,
                admin: admin,
                userList: userList,
                lastMsg: lastMsg
            });
        }
    } catch (error) {
        res.send(error);
    }
});

const addMessageController = expressAsyncHandler(async(req,res)=>{
    const {sender,reciever,content} = req.body;
    try {
        const senderUser = await UserModal.findOne({_id:sender});
        if(!senderUser){
            res.status(404).json({message:"Sender user not found"});
            return;
        }
        const recieverUser = await UserModal.findOne({_id:reciever});
        if(!recieverUser){
            res.status(404).json({message:"Reciever user not found"});
            return;
        }
        const newMessage = await MessageModal.create({
            sender:senderUser._id,
            reciever:recieverUser._id,
            content
        });
        if(newMessage){
            res.json({
                sender:sender,
                reciever:reciever,
                content:content
            });
        }
    } catch (error) {
        res.send(error);
    }
});

const fetchUsersController = expressAsyncHandler(async (req, res) => {
    const userId = req.params.username;
    try {
        const user = await UserModal.findOne({ email:userId });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        const chats = await ChatModal.find({
            $or: [
                { admin: user._id },
                { userList: user._id, isGroupChat: true }
            ]
        });
        if(!chats){
            res.status(404).json({ message: "Chats not found" });
        }else{
            res.status(200).json(chats);
        }
    } catch (error) {
      res.send(error);
    }
});

const fetchUsersDetailsController = expressAsyncHandler(async (req, res) => {
    const userId = new ObjectId(req.params.userid);
    try {
      const user = await UserModal.findOne({ _id: userId });
      if (!user) {
        res.status(404).json({ message: "User not found"});
        return;
      }else{
        res.status(200).json(user);
      }
    } catch (error) {
      res.send(error);
    }
});

const fetchUserChatsController = expressAsyncHandler(async (req, res) => {
    const senderId = req.params.senderId;
    const receiverId = req.params.receiverId;
    try {
      const chats = await MessageModal.find({
        $or: [
          { sender: senderId, reciever: receiverId },
          { sender: receiverId, reciever: senderId }
        ]
      });
      if (!chats) {
        res.status(404).json({ message: "Chats not found" });
      } else {
        res.status(200).json(chats);
      }
    } catch (error) {
      res.send(error);
    }
  });


module.exports = { addUserController,addGroupController, addMessageController,fetchUsersController,fetchUsersDetailsController,fetchUserChatsController }