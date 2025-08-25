import React from 'react'
import SummaryCard from '../../utils/SummaryCard'
import { useAuth } from '../../context/authContext'
import { FaUser } from 'react-icons/fa'

const EmployeeSummary = () => {
    const {user} = useAuth()
  return (
    <div className='p-6'>
      <SummaryCard icon={<FaUser />} text="Welcome Back" content={user.name} color="bg-teal-600" />
    </div>
  )
}

export default EmployeeSummary
