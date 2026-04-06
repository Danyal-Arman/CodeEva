import React from 'react'

import { Files, FileClock } from 'lucide-react'

const Sidebar = ({onFileClick, setIsVersionSidebarOpen,isVersionSidebarOpen, setIsFileSidbarOpen}) => {



  return (
    
    <div className='min-w-12 bg-zinc-800 dark:bg-zinc-900 border-r  dark:border-gray-500 py-5 z-10'>
     <div className='flex flex-col gap-10'>

     <button type='button' aria-label='Files' onClick={()=>{onFileClick?.(); setIsVersionSidebarOpen(false)}}>
        <Files className='w-10 h-10 mx-1 text-gray-400'></Files>
      </button>
      <button type='button' aria-label='Files versions' onClick={()=>{setIsVersionSidebarOpen(!isVersionSidebarOpen); setIsFileSidbarOpen(false)}}>
        <FileClock className='w-9 h-9 mx-1.5  text-gray-400'/>
      </button>
     </div>
    </div>
  
  )
}

export default Sidebar
