import React from 'react'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/material'


function AgroBankHeader() {
  return (
    <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant='h5'>Agrobank</Typography>
        {/* <Button variant='contained'>Новый депозит</Button> */}
      </Box>
  )
}

export default AgroBankHeader
