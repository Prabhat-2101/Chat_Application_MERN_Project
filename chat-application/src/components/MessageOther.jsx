import React from 'react'

function MessageOther(props) {
  const msg = props.message;
  const sender = msg.sender;
  const content = msg.content;
  const createdAt = new Date(msg.createdAt);
  const formattedDate = createdAt.toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
  return (
    <div className='flex gap-2 font-serif items-center p-1 w-2/6 bg-blue-400 text-white rounded-md'>
        <div className='text-md bg-blue-600 rounded-icon p-1 w-1/12 flex items-center justify-center'>
        <p>{sender[0]}</p>
        </div>
        <div className='w-11/12 flex flex-col'>
        {/* <p className='text-sm'>{sender}</p> */}
        <div className='flex p-1 text-xs justify-between'>
        {/* <span className='inline-block w-4 h-4 mr-1'>{icon}  </span>  */} {/* double tick */}
        <p>{content}</p>
        <p>{formattedDate}</p>
        </div>
        </div>
    </div>
  )
}

export default MessageOther