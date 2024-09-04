import React from 'react'

function MessageOther() {
  const messages = [
    { name: "Alice", msg: "Hello, how are you?", time: "10:30 AM" },
    { name: "Bob", msg: "I'm good, thanks!", time: "10:32 AM" },
    { name: "Charlie", msg: "What's up?", time: "10:35 AM" }
  ];
  return (
    <div className='flex gap-2 font-serif items-center p-1 w-2/6 bg-blue-400 text-white rounded-md'>
        <div className='text-md bg-blue-600 rounded-icon p-1 w-1/12 flex items-center justify-center'>
        <p>{messages[0].name[0]}</p>
        </div>
        <div className='w-11/12 flex flex-col'>
        <p>{messages[0].name}</p>
        <div className='flex p-1 text-xs justify-between'>
        {/* <span className='inline-block w-4 h-4 mr-1'>{icon}  </span>  */} {/* double tick */}
        <p>{messages[0].msg}</p>
        <p>{messages[0].time}</p>
        </div>
        </div>
    </div>
  )
}

export default MessageOther