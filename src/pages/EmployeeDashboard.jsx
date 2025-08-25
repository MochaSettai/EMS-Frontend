import React from 'react'
import { useAuth } from '../context/authContext'
import EmployeeSidebar from '../components/empDashboard/EmployeeSidebar'
import Navbar from '../components/adminDashboard/Navbar'
import { Outlet } from 'react-router-dom'

const EmployeeDashboard = () => {
  const {user} = useAuth()

  return (
    <div className='flex'>
      <EmployeeSidebar />
      <div className='flex-1 ml-64 bg-gray-100 h-screen'>
        <Navbar />
        <Outlet />
      </div>
    </div>
  )
}

export default EmployeeDashboard
