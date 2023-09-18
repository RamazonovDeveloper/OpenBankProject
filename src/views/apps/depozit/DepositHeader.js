import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

const DepositHeader = () => {
  const [age, setAge] = React.useState('')

  const handleChange = event => {
    setAge(event.target.value)
  }

  return (
    <>
      <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant='h5'>Депозит</Typography>
        <Button variant='contained'>Новый депозит</Button>
      </Box>
    </>
  )
}

export default DepositHeader
