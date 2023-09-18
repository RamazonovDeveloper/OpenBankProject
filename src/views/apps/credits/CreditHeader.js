import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

const CreditHeader = () => {
  return (
    <>
      <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant='h5'>Кредиты</Typography>
        {/* <Button variant='contained'>Новый депозит</Button> */}
      </Box>
    </>
  )
}

export default CreditHeader
