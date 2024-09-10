import React,{useEffect, useState} from 'react'
import '../App.css'
import VoiceCallButton from '@mui/icons-material/PermPhoneMsgOutlined';
import VideoCallButton from '@mui/icons-material/VideocamOutlined';
import MoreButton from '@mui/icons-material/MoreVertOutlined';
import AttachmentButton from '@mui/icons-material/InsertLinkOutlined';
import MicButton from '@mui/icons-material/MicNoneOutlined';
import SendButton from '@mui/icons-material/SendOutlined';
import EmojiButton from '@mui/icons-material/EmojiEmotionsOutlined';
import { IconButton } from '@mui/material';
import MessageOther from './MessageOther';
import MessageSelf from './MessageSelf';
import { useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';
import EmojiPicker from 'emoji-picker-react';

function Workarea({props}) {
    const navigate = useNavigate();
    const location = useLocation();
    const [conversation, setConversations] = useState(null);
    const [sender, setSender] = useState(JSON.parse(localStorage.getItem('userData')));
    const [reciever, setReciever] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [messageList, setMessageList] = useState([]);
    const [isButtonActive, setIsButtonActive] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [selectedFileType, setSelectedFileType] = useState(null);
    const [showFileTypeDialog, setShowFileTypeDialog] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [chatName,setChatName] = useState("");
    

    const handleAttachmentClick = () => {
        setShowFileTypeDialog(true);
    };

    const handleFileTypeChange = (fileType) => {
        setSelectedFileType(fileType);
        setShowFileTypeDialog(false);
        if(fileType === "camera") {
            navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
                console.log('Camera stream:', stream);
                const video = document.getElementById('camera-video');
                const overlay = document.getElementsByClassName('overlay')[0];
                overlay.style.display = 'block';
                video.srcObject = stream;
                video.play();
            }).catch(error => {
                console.error('Error accessing camera:', error);
            });
        }else{
            document.getElementById('file-input').click();
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        const overlay = document.getElementsByClassName('overlay')[0];
        overlay.style.display = 'block';
    };
    
    useEffect(() => {
        if (!location.state || !location.state.conversation.userList[0]) {
        navigate('/app/welcome');
        } else {
            const fetchMessages = async () => {
                try {
                setConversations(location.state.conversation);
                setReciever(location.state.conversation.userList[0]);
                setChatName(location.state.conversation.chatName);
                const response = await axios.get(`http://localhost:8000/user/chats/${sender._id}/${reciever}`);
                const messageList = response.data;
                messageList.sort((a, b) => a.createdAt - b.createdAt);
                setMessageList(response.data);
            } catch (error) {
              console.error(error);
            }
        };
        fetchMessages();
        setLoading(false);
        }
    }, [location]);

    const handleInputChange = (event) => {
        const inputValue = event.target.value;
        setMessage(inputValue);
        setIsButtonActive(inputValue.length > 0);
    };

    const handleSendClick = async() => {
        if (message.length > 0) {
            const data = {
                "sender":sender._id,  /* Current User's Id */
                "reciever":reciever, /* Reciever's Id */
                "content": message
            }
            const config = { headers: { "Content-Type": "application/json" } };
            const response = await axios.post('http://localhost:8000/user/addmessage', data, config);
            const { status, data: responseData } = response;
            if (status === 200) {
                console.log(responseData);
            }else{
                console.error("Network Error");
            }
            setMessage('');
            setIsButtonActive(false);
        }
    };

    const addEmoji = (emojiObject) => {
        setMessage(message + emojiObject.emoji);
    };

    const sendFile = () => {
        alert('File sent');
        setSelectedFile(null);
    }
    if (loading) { return <div>Loading...</div>; }

    return (
    <div className='flex flex-col content-box gap-2'>
        <div className="flex flex-01 gap-2 font-serif items-center w-full bg-gray-100 px-1 rounded-md box-shadow-2">
            <div className='text-3xl bg-gray-200 rounded-icon p-2 w-1/12 flex items-center justify-center'>
            <p>{chatName[0]}</p>
            </div>
            <div className='w-11/12 flex flex-col'>
            <p>{chatName}</p>
            <div className='text-xs'>{sender._id}</div>
            </div>
            <div className='flex gap-4 items-center'>
                <IconButton><VoiceCallButton/></IconButton>
                <IconButton><VideoCallButton/></IconButton>
                <IconButton><MoreButton/></IconButton>
            </div>
        </div>
        <div className="flex flex-col flex-1 gap-4 font-serif w-full bg-gray-200 px-2 p-2 rounded-md overflow-y-auto scrolling-auto box-shadow-2">
        {Array.isArray(messageList) ? (
            messageList.map((message, index) => (
            message.sender === sender._id ? (
                <MessageSelf key={index} message={message}/>
            ) : (
                <MessageOther key={index} message={message}/>
            )
            ))
        ) : (
            <p>No messages</p>
        )}
        </div>
        <div className="flex-01 flex gap-4 font-serif items-center w-full bg-gray-100 px-1 rounded-md box-shadow-2">
        <div className="flex-005">
          <IconButton onClick={handleAttachmentClick}>
            <AttachmentButton />
          </IconButton>
          {showFileTypeDialog && (
            <div className="file-type-dialog grid grid-cols-3">
              <button onClick={() => handleFileTypeChange('pdf')} className="flex flex-col items-center" ><svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 17v-5h1.5a1.5 1.5 0 1 1 0 3H5m12 2v-5h2m-2 3h2M5 10V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1v6M5 19v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-1M10 3v4a1 1 0 0 1-1 1H5m6 4v5h1.375A1.627 1.627 0 0 0 14 15.375v-1.75A1.627 1.627 0 0 0 12.375 12H11Z"/></svg><span className='text-sm'>PDF</span></button>
              
              <button onClick={() => handleFileTypeChange('image')} className="flex flex-col items-center"><svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m3 16 5-7 6 6.5m6.5 2.5L16 13l-4.286 6M14 10h.01M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"/></svg><span className='text-sm'>Image</span></button>
              
              <button onClick={() => handleFileTypeChange('contact')} className="flex flex-col items-center"><svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 9h3m-3 3h3m-3 3h3m-6 1c-.306-.613-.933-1-1.618-1H7.618c-.685 0-1.312.387-1.618 1M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm7 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"/></svg><span className='text-sm'>Contact</span></button>
              
              <button onClick={() => handleFileTypeChange('image')} className="flex flex-col items-center"><svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M4.5 17H4a1 1 0 0 1-1-1 3 3 0 0 1 3-3h1m0-3.05A2.5 2.5 0 1 1 9 5.5M19.5 17h.5a1 1 0 0 0 1-1 3 3 0 0 0-3-3h-1m0-3.05a2.5 2.5 0 1 0-2-4.45m.5 13.5h-7a1 1 0 0 1-1-1 3 3 0 0 1 3-3h3a3 3 0 0 1 3 3 1 1 0 0 1-1 1Zm-1-9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"/></svg><span className='text-sm'>Poll</span></button>
              
              <button onClick={() => handleFileTypeChange('camera')} className="flex flex-col items-center"><svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M4 18V8a1 1 0 0 1 1-1h1.5l1.707-1.707A1 1 0 0 1 8.914 5h6.172a1 1 0 0 1 .707.293L17.5 7H19a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z"/><path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/></svg><span className='text-sm'>Camera</span></button>
              
              <button onClick={() => handleFileTypeChange('pdf')} className="flex flex-col items-center"><svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.127.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z"/></svg><span className='text-sm'>Maps</span></button>
            </div>
          )}
        <div className="overlay-container">
            <div className="overlay" style={{ display: 'none' }}>
                {selectedFileType === 'camera' && (
                    <div className="camera-overlay">
                    <p>Camera is on!</p>
                    <video id="camera-video" width="640" height="480"></video>
                </div>
                )}
                <input type="file" id="file-input" accept={selectedFileType === 'pdf' ? '.pdf' : selectedFileType === 'image' ? 'image/*' : ''} onChange={handleFileChange} hidden/>
                {selectedFile && (
                    <div className="file-overlay">
                    <p>File selected: {selectedFile.name}</p>
                    <button className='p-2 bg-blue-500 rounded-md' onClick={sendFile}>Send</button>
                    </div>
                )}
            </div>
        </div>
        </div>
            <div className='flex flex-08'>
                <input type="text" placeholder='Type a message' className='px-2 py-1 border-hidden border-bottom outline-none rounded-md font-serif w-full bg-transparent' value ={message} onChange = {handleInputChange}/> 
            </div>
            <div className='flex flex-01 gap-4'>
                <IconButton onClick={() => setShowEmojiPicker(!showEmojiPicker)}><EmojiButton/></IconButton>
                {showEmojiPicker && (<div className="emoji-picker-overlay"
                    style={{
                    position: 'absolute',
                    top: '55%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 'auto',
                    height: 'auto',
                    backgroundColor: 'white',
                    borderRadius: '10px',
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
                    padding: '10px',
                    zIndex: 1,
                    }}> <EmojiPicker onEmojiClick={(emojiObject) => addEmoji(emojiObject)} /> </div>)}
                <IconButton><MicButton/></IconButton>
                <IconButton disabled={!isButtonActive} onClick={handleSendClick}><SendButton/></IconButton>
            </div>
        </div>
    </div>
  )
}

export default Workarea