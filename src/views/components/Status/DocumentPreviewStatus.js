import React from 'react'
import StatusSign from './StatusSign'

export default function DocumentPreviewStatus({ status }) {
  const documentStatus = [
    {
      isDocumentSigned: true,
      color: '#4E0F8A',
      statusMessage: 'Подписан'
    },
    {
      isDocumentSigned: false,
      color: '#D23232',
      statusMessage: ' На рассмотрении'
    }
  ]

  const currentStatus = documentStatus.find(item => item.isDocumentSigned == status)

  return (
    <>
      <StatusSign data={currentStatus} /> {currentStatus ? currentStatus.statusMessage : 'Статус не определен'}
    </>
  )
}
