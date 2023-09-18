import React from 'react'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

const AddItemHeader = () => {
  return (
    <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
      <Typography variant='h5' sx={{ mr: 1.75 }}>
        Создать платёж
      </Typography>
      {/* <Button variant='contained' sx={{ mr: 4 }}>
        Создать заявку
      </Button> */}
    </Box>
  )
}

export default AddItemHeader
