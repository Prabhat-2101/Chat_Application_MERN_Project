import React from 'react'
import DoneButton from '@mui/icons-material/CheckCircleOutlineOutlined';
import { IconButton } from '@mui/material';
function CreateGroup() {
  return (
    <div className='flex flex-065 justify-center items-center'>
        <input type="text" placeholder='enter group name' className='w-3/5 h-12 p-2 rounded-md font-serif outline-none'/>
        <IconButton><DoneButton/></IconButton>
    </div>
  )
}

export default CreateGroup