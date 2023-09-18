import React from 'react'
import Alert from '@mui/material/Alert'
import Icon from 'src/@core/components/icon'
import IconButton from '@mui/material/IconButton'

export default function MessageStatus(props) {
  return (
    <div style={{ position: 'fixed', right: 20, top: 100, backgroundColor: '#fff', borderRadius: 10 }}>
      {props.message ? <Alert>{props.message}</Alert> : <Alert>Платеж успешно создан.</Alert>}
    </div>
  )
}
