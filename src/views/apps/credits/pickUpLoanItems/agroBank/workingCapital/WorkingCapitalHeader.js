import { Box, Typography } from '@mui/material'
import React from 'react'

export default function WorkingCapitalHeader() {
  return (
    <div>
    <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant='h5'>Agrobank</Typography>
    </Box>
    </div>
  )
}
