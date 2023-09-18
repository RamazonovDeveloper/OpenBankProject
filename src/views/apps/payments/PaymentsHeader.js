import React from 'react'
import Button from '@mui/material/Button'
import Icon from 'src/@core/components/icon'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'

const PaymentsHeader = ({ addItem }) => {
  return (
    <>
      <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant='h5' sx={{ mr: 1.75 }}>
            Платежи
          </Typography>
        </Box>
        <Box sx={{ display: 'flex' }}>
          {/* <Button variant='outlined' sx={{ mr: 4 }}>
            Скачать выписку
          </Button>
          <Button variant='outlined' sx={{ mr: 4 }}>
            Импорт и экспорт
          </Button> */}
          <Button onClick={() => addItem()} variant='contained'>
            Новый платёж
          </Button>
        </Box>
      </Box>
    </>
  )
}

export default PaymentsHeader
