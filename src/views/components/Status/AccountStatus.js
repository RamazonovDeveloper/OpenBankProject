import React from 'react'

export default function AccountStatus({ status }) {
  const accountStatus = [
    {
      number: 0,
      statusMessage: 'Расчетный'
    },
    {
      number: 1,
      statusMessage: 'не определен (1)'
    }
  ]

  const currentStatus = accountStatus.find(item => item.number == status)

  return <>{currentStatus ? currentStatus.statusMessage : 'Статус не определен'}</>
}
