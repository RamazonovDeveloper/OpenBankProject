import React from 'react'
import StatusSign from './StatusSign'

export default function TransStatus({ status }) {
  const transStatus = [
    {
      number: 1,
      statusMessage: 'Введен'
    },
    {
      number: 2,
      statusMessage: 'На утверждении'
    },
    {
      number: 3,
      statusMessage: 'Утвержден'
    },
    {
      number: 4,
      statusMessage: 'Отправлен в банк'
    },
    {
      number: 5,
      statusMessage: 'Отправлен в ЦБ'
    },
    {
      number: 6,
      statusMessage: 'Отклонен ЦБ'
    },
    {
      number: 10,
      statusMessage: 'Исполнен'
    },
    {
      number: 21,
      statusMessage: 'Отклонен директором'
    },
    {
      number: 22,
      statusMessage: 'Отклонен банком'
    }
  ]

  const currentStatus = transStatus.find(item => item.number == status)

  return (
    <>
      <StatusSign /> {currentStatus ? currentStatus.statusMessage : 'Статус не определен'}
    </>
  )
}
