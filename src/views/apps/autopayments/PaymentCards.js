import React from 'react'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'

const PaymentCards = () => {
  return (
    <Box sx={{ display: 'flex', width: '100%', alignItems: 'center' }}>
      <Card sx={{ p: 5, width: 240, height: 200, my: 4, mr: 4 }}>
        <Typography variant='body1' sx={{ mr: 1.75 }}>
          Шаблоны
        </Typography>
        <Divider sx={{ mt: 5 }} />
        <Typography variant='body2' sx={{ mr: 1.75 }}>
          Отлично подходят для регулярных платежей контрагентам с ручным подтверждением операций
        </Typography>
      </Card>
      <Card sx={{ p: 5, width: 240, height: 200, my: 4, mr: 4 }}>
        <Typography variant='body1' sx={{ mr: 1.75 }}>
          Заранее данные акцепты
        </Typography>
        <Divider sx={{ mt: 5 }} />
        <Typography variant='body2' sx={{ mr: 1.75 }}>
          Автоматический акцепт входящих платёжных требований
        </Typography>
      </Card>
    </Box>
  )
}

export default PaymentCards
