import Navbar from '../components/Navbar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {

  
  return (
    <div className="h-screen flex flex-col bg-zinc-900">
      
      <header className="z-40">
        <Navbar />
      </header>

      <main className="flex-1 overflow-y-auto zinc-scrollbar">
        <Outlet />
      </main>

    </div>
  )
}

export default AppLayout
