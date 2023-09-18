import React from 'react'
import Alert from '@mui/material/Alert'
import Icon from 'src/@core/components/icon'
import IconButton from '@mui/material/IconButton'

export default function SuccesMessage({ onClose, message }) {
  return (
    <div style={{ position: 'fixed', right: 20, top: 100, backgroundColor: '#fff', borderRadius: 10, zIndex: 1 }}>
      {message ? <Alert>{message}</Alert> : <Alert>Платеж успешно создан.</Alert>}
    </div>
  )
}
