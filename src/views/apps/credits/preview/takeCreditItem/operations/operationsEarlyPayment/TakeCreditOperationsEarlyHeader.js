import { Box, Typography } from '@mui/material'
import React from 'react'

function TakeCreditOperationsEarlyHeader() {
  return (
    <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
      <Typography variant='h5'>Погашение по графику</Typography>
    </Box>
  )
}

export default TakeCreditOperationsEarlyHeader
