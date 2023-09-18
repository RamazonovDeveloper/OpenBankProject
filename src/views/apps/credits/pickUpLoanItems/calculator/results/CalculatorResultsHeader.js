import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export default function CalculatorResultsHeader() {
  return (
    <>
      <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant='h5'>Результаты расчета</Typography>
      </Box>
    </>
  )
}
