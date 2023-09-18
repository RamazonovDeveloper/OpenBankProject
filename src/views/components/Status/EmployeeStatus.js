import React from 'react'
import StatusSign from './StatusSign'

export default function EmployeeStatus({ status }) {
  console.log('status -> ', status)

  const employeeStatus = [
    {
      isEmployeeSigned: 2,
      color: 'rgba(78, 15, 138, 1)',
      statusMessage: 'Активен'
    },
    {
      isEmployeeSigned: 1,
      color: 'rgba(254, 88, 88, 1)',
      statusMessage: 'Заблокирован'
    }
  ]

  const currentStatus = employeeStatus.find(item => item.isEmployeeSigned == status)

  return (
    <>
      <StatusSign data={currentStatus} /> {currentStatus ? currentStatus.statusMessage : 'Статус не определен'}
    </>
  )
}
