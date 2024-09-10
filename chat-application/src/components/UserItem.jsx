import React,{useState} from 'react'
import SentIcon from '@mui/icons-material/CheckOutlined';
import SeenIcon from '@mui/icons-material/DoneAllOutlined';
import { useNavigate } from 'react-router-dom';
import '../App.css'

function UserItem({props}) {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('userData')));
    const status = 'seen';
    let icon = null;
    if(status==="seen") icon = <SeenIcon id="seenIcon"/>;
    else if(status === "sent") icon = <SentIcon id="sentIcon"/>;
    else icon = <SeenIcon id="sentIcon"/>;
    const handleClick = () => {
      console.log(props)
      navigate('chat', { state: { conversation: props } });
    };
    return (
    <div className='flex font-serif items-center w-full hover:bg-gray-300 p-1 gap-2 rounded hover-pointer ' onClick={handleClick}>
        <div className='text-3xl bg-gray-200 rounded-icon p-2 w-1/12 flex items-center justify-center'>
        <p>{props.chatName[0]}</p>
        </div>
        <div className='w-11/12 flex flex-col'>
        <p>{props.chatName}</p>
        <div className='flex justify-between items-center p-1 text-xs'>
        <p><span className='inline-block w-4 h-4 mr-1'>{icon}  </span> {props.lastMsg}
        </p>
        <p> Today</p>
        </div>
        </div>
    </div>
  )
}

export default UserItem