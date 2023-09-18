import React from 'react'

// mui components
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { Button } from '@mui/material'

function MainLayoutActions() {
  return (
    <Grid xs={12} md={12} sx={{ display: 'grid', gridTemplateColumns: '3.7fr 5fr 2fr', gap: '20px', mt: 3, mb: 3 }}>
      <Box sx={{ pl: '20px' }}>
        <Typography sx={{ fontSize: '22px', fontWeight: '600' }}>Добрый день, Анна</Typography>
        <Typography sx={{ fontSize: '16px', color: '#A5A1A1' }}>
          Посмотрите все финансовые действия по вашей компании
        </Typography>
      </Box>
      <Box>
        <Typography sx={{ fontSize: '22px', fontWeight: '600' }}>Общий баланс</Typography>
        <Box sx={{ display: 'flex', gap: '10px' }}>
          <Box sx={{ borderLeft: '2px solid #FF8888', pl: '8px' }}>
            <Typography>10 000 000 000,00 UZS</Typography>
            <Typography sx={{ color: '#A5A1A1' }}>Средств на UZS счетах</Typography>
          </Box>
          <Box sx={{ borderLeft: '2px solid #FFBC1F', pl: '8px' }}>
            <Typography>20 000 000,00 USD</Typography>
            <Typography>Средств на USD счетах</Typography>
          </Box>
        </Box>
        {/*  */}
      </Box>

      <button
        style={{
          border: 'none',
          color: 'white',
          height: 'fit-content',
          padding: '12px 0',
          fontSize: '18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '9px',
          backgroundColor: '#4E0F8A'
        }}
        sx={{ border: 'none', display: 'flex', alignItems: 'center', backgroundColor: '#4E0F8A' }}
        variant='contained'
      >
        Создать платеж
        <span style={{ fontSize: '30px', marginLeft: '15px', fontWeight: '300' }}>+</span>
      </button>
    </Grid>
  )
}

export default MainLayoutActions
