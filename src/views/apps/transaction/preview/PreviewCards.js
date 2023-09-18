import React, { useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography
} from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'

import TransStatus from 'src/views/components/Status/TransStatus'
import { LoadingButton } from '@mui/lab'
import SendIcon from '@mui/icons-material/Send'

function PreviewCards({ data, confirmPaymentHandle, isPaymentSent, id, handleClose, open, paymentMessage }) {
  return (
    <Grid sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
      <Box>
        <Typography sx={{ color: '#342C2C', fontWeight: '500', fontSize: '20px', mb: '10px' }}>Плательщик</Typography>
        <Card className='transaction_card'>
          <CardContent>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: '20px'
              }}
            >
              <Typography variant={'body'}>Наименование организации </Typography>
              <Typography sx={{ color: '#342C2C' }} variant={'body'}>
                {data.sender_name}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: '20px'
              }}
            >
              <Typography variant={'body'}>МФО банка</Typography>
              <Typography sx={{ color: '#342C2C' }} variant={'body'}>
                {data.sender_mfo}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: '20px'
              }}
            >
              <Typography variant={'body'}>Банк</Typography>
              <Typography sx={{ color: '#342C2C' }} variant={'body'}></Typography>
            </Box>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: '20px'
              }}
            >
              <Typography variant={'body'}>Расчетный счет </Typography>
              <Typography sx={{ color: '#342C2C' }} variant={'body'}>
                {data.sender_account}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Typography variant={'body'}>ИНН</Typography>
              <Typography sx={{ color: '#342C2C' }} variant={'body'}>
                {data.sender_inn}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Box>
        <Typography sx={{ color: '#342C2C', fontWeight: '500', fontSize: '20px', mb: '10px' }}>Получатель</Typography>
        <Card className='transaction_card'>
          <CardContent>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: '20px'
              }}
            >
              <Typography variant={'body'}>Наименование организации </Typography>
              <Typography sx={{ color: '#342C2C' }} variant={'body'}>
                {data.receiver_name}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: '20px'
              }}
            >
              <Typography variant={'body'}>МФО банка</Typography>
              <Typography sx={{ color: '#342C2C' }} variant={'body'}>
                {data.receiver_mfo}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: '20px'
              }}
            >
              <Typography variant={'body'}>Банк</Typography>
              <Typography sx={{ color: '#342C2C' }} variant={'body'}></Typography>
            </Box>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: '20px'
              }}
            >
              <Typography variant={'body'}>Расчетный счет</Typography>
              <Typography sx={{ color: '#342C2C' }} variant={'body'}>
                {data.receiver_account}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Typography variant={'body'}>ИНН</Typography>
              <Typography sx={{ color: '#342C2C' }} variant={'body'}>
                {data.receiver_inn}
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {data.status === 2 && (
          <LoadingButton
            fullWidth
            sx={{ my: 3.5 }}
            style={{ backgroundColor: '#4E0F8A', fontSize: '17px', fontWeight: 600 }}
            color='success'
            variant='outlined'
            onClick={confirmPaymentHandle}
            loading={isPaymentSent}
            className='main_btn'
            disabled={data.status === 2 ? false : true}
            startIcon={<SendIcon />}
          >
            {data.status === 2 ? 'Подписать' : 'Подписан'}
          </LoadingButton>
        )}

        <Dialog open={open} keepMounted onClose={handleClose} aria-describedby='alert-dialog-slide-description'>
          <DialogTitle>
            <CheckCircleOutlineIcon sx={{ mr: 2, color: 'green' }} />
            {'Платеж успешно отправлен в банк.'}
          </DialogTitle>
          <DialogContent>Server: {paymentMessage}</DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Ok</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Grid>
  )
}

export default PreviewCards
