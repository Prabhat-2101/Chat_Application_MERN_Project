import React from 'react'

function MessageSelf(props) {
  const msg = props.message;
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
    <div className='flex justify-end'>
        <div className='flex p-2 bg-gray-100 text-xs  justify-between w-2/6'>
          <p>{content}</p>
          <p>{formattedDate}</p>
        </div>
    </div>
  )
}

export default MessageSelf