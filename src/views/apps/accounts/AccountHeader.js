import React from 'react'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Icon from 'src/@core/components/icon'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import CircularProgress from '@mui/material/CircularProgress'

const AccountHeader = ({ addNewItem, sum, loading, accountsSync, loadingAsync }) => {
  return (
    <>
      <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant='h5' sx={{ mr: 1.75 }}>
            Счета
          </Typography>
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Button variant='outlined' sx={{ mr: 4, width: '300px' }} onClick={() => accountsSync()}>
            {loadingAsync ? (
              <CircularProgress />
            ) : (
              <>
                <IconButton size='small' color='inherit'>
                  <Icon icon='ep:refresh' />
                </IconButton>
                Обновить счёт
              </>
            )}
          </Button>
          <Button disabled={loading} onClick={() => addNewItem()} variant='contained'>
            Новый счёт
          </Button>
        </Box>
      </Box>

      <Card sx={{ mt: 5 }}>
        <Box sx={{ my: 5, display: 'flex' }}>
          <Box sx={{ mx: 6 }}>
            <Typography variant='h5' gutterBottom>
              {sum} UZS
            </Typography>
            <Typography variant='body2' gutterBottom>
              Всего средств на суммовом счету
            </Typography>
          </Box>
          <Box sx={{ mx: 6 }}>
            <Typography variant='h5' gutterBottom>
              0 USD
            </Typography>
            <Typography variant='body2' gutterBottom>
              Всего средств на долларовом счету
            </Typography>
          </Box>
        </Box>
      </Card>
    </>
  )
}

export default AccountHeader
