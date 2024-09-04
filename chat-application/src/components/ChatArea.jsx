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
    
    useEffect(() => {
        if (!location.state) {
        navigate('/app/welcome');
        } else {
            const fetchMessages = async () => {
                try {
                setConversations(location.state.conversation);
                setReciever(location.state.conversation.userList[0]);
                console.log(sender._id,reciever);
              const response = await axios.get(`http://localhost:8000/user/chats/${sender._id}/${reciever}`);
              setMessageList(response.data);
              console.log(messageList);
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
            console.log(data);
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

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
    <div className='flex flex-col content-box gap-2'>
        <div className="flex flex-01 gap-2 font-serif items-center w-full bg-gray-100 px-1 rounded-md box-shadow-2">
            <div className='text-3xl bg-gray-200 rounded-icon p-2 w-1/12 flex items-center justify-center'>
            <p>{conversation.chatName[0]}</p>
            </div>
            <div className='w-11/12 flex flex-col'>
            <p>{reciever}</p>
            <div className='text-xs'>{sender._id}</div>
            </div>
            <div className='flex gap-4 items-center'>
                <IconButton><VoiceCallButton/></IconButton>
                <IconButton><VideoCallButton/></IconButton>
                <IconButton><MoreButton/></IconButton>
            </div>
        </div>
        <div className="flex flex-col flex-1 gap-4 font-serif w-full bg-gray-200 px-2 p-2 rounded-md overflow-y-auto scrolling-auto box-shadow-2">
            {/* {messages.map((message,index)=>(message.sender === sender ? (<MessageSelf />) : (<MessageOther/>)))} */}
        </div>
        <div className="flex-01 flex gap-4 font-serif items-center w-full bg-gray-100 px-1 rounded-md box-shadow-2">
            <div className='flex-005'><IconButton><AttachmentButton/></IconButton></div>
            <div className='flex flex-08'>
                <input type="text" placeholder='Type a message' className='px-2 py-1 border-hidden border-bottom outline-none rounded-md font-serif w-full bg-transparent' value ={message} onChange = {handleInputChange}/> 
                <IconButton><EmojiButton/></IconButton>
            </div>
            <div className='flex flex-01 gap-4'>
                <IconButton><MicButton/></IconButton>
                <IconButton disabled={!isButtonActive} onClick={handleSendClick}><SendButton/></IconButton>
            </div>
        </div>
    </div>
  )
}

export default Workarea