import React from 'react'

export default function AccountStateStatus({ status }) {
  const accountStateStatus = [
    {
      number: 1,
      statusMessage: 'Закрыто'
    },
    {
      number: 2,
      statusMessage: 'Открыт'
    }
  ]

  const currentStatus = accountStateStatus.find(item => item.number == status)

  return <>{currentStatus ? currentStatus.statusMessage : 'Статус не определен'}</>
}
