import { Box, Typography } from '@mui/material'
import React from 'react'

function PreviewHeader() {
  return (
    <>
      <Box>
        <Typography variant='h5' sx={{ mr: 1.75, color: '#1E1E1E', fontWeight: '600' }}>
          Счет компании
        </Typography>
      </Box>
    </>
  )
}

export default PreviewHeader
