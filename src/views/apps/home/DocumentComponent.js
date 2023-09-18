import React from 'react'

import { Box, Typography } from '@mui/material'
import DocumentStatus from 'src/views/components/Status/DocumentStatus'

export default function DocumentComponent(data) {
  console.log('====> ', data)
  const { handleClick } = data

  const renderItems = data.loanItems.map((item, index) => {
    return (
      <Box
        key={index}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mt: '16px',
          pb: '16px',

          // p: '10px',
          alignItems: 'center',
          borderBottom: '1px solid #F4F3F3',
          cursor: 'pointer'
        }}
      >
        <Box
          sx={{
            width: '100%'
          }}
          onClick={() => handleClick(item)}
        >
          <Typography>{item.sender}</Typography>
          <Typography sx={{ mb: '5px' }}>{item.name}</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <Typography sx={{ width: 108 }}>{item.date}</Typography>
            <Box>
              <DocumentStatus status={item.sign_status} />
            </Box>
          </Box>
        </Box>
      </Box>
    )
  })

  return (
    <Box
      sx={
        {
          // width: '534px'
          // overflowY: 'scroll'
        }
      }
    >
      {renderItems}
    </Box>
  )
}
