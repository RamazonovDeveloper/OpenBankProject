import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const PaymentsHeader = () => {
  return (
    <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
      <Typography variant='h5' sx={{ mr: 1.75 }}>
        Шаблоны и регулярные платежи
      </Typography>
    </Box>
  )
}

export default PaymentsHeader
