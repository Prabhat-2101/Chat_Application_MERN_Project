import React, { useState, useEffect } from 'react';
import '../App.css';
import SearchButton from '@mui/icons-material/SearchOutlined';
import { IconButton } from '@mui/material';
import UserItem from './UserItem';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Contact() {
    const navigate = useNavigate();
    const [conversations, setConversations] = useState([]);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('userData')));

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user, navigate]);

    useEffect(() => {
        if (user) {
            const username = user.email;
            const config = { headers: { "Content-Type": "application/json" } };

            const fetchUsers = async () => {
                try {
                    const response = await axios.get(`http://localhost:8000/user/${username}`, config);
                    const data = response.data;
                    const status = response.status;
                    if (status === 200 && data.length > 0) {
                        setConversations(data);
                    } else if (status === 200) {
                        console.error('No Contact Found', response);
                    } else {
                        console.error('Error fetching users:', response);
                    }
                } catch (error) {
                    console.error('Error fetching users:', error);
                }
            };
            fetchUsers();
        }
    }, [user]);

    return (
        <div className='contact-box flex flex-col items-center gap-2 rounded'>
            <div className='flex gap-2 bg-gray-100 p-1 rounded search-area w-full box-shadow-2'>
                <IconButton><SearchButton /></IconButton>
                <input type="text" placeholder='Search' className='px-2 py-1 border-hidden border-bottom outline-none borde rounded-md font-serif w-11/12 bg-transparent' />
            </div>
            <div className='flex flex-col flex-1 w-full bg-gray-100 p-3 gap-5 rounded overflow-y-auto box-shadow-2'>
                {conversations.map((conversation) => {
                    return <UserItem props={conversation}  key={Math.random()}/>
                })}
            </div>
        </div>
    )
}

export default Contact;