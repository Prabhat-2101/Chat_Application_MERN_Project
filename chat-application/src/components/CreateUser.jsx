import React from 'react'
import DoneButton from '@mui/icons-material/CheckCircleOutlineOutlined';
import { IconButton } from '@mui/material';

function CreateUser() {
    return (
        <div className='flex flex-col gap-2 flex-065 justify-center items-center'>
            <input type="text" placeholder='enter contact name' className='w-3/5 h-12 p-2 rounded-md font-serif outline-none'/>
            <input type="text" placeholder='enter contact number' className='w-3/5 h-12 p-2 rounded-md font-serif outline-none'/>
            <IconButton><DoneButton/></IconButton>
        </div>
    )
}

export default CreateUser