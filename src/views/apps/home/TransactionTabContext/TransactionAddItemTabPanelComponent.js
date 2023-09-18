import { Box, Typography } from '@mui/material'
import React from 'react'
import TransStatus from 'src/views/components/Status/TransStatus'

export default function TransactionAddItemTabPanelComponent(props) {
  const { rowItems } = props

  return (
    <Box sx={{ width: '100%', height: '627px', overflowY: 'scroll' }}>
      {rowItems.map((item, index) => {
        return (
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',

              mb: '16px',
              alignItems: 'center',
              borderBottom: '1px solid #F4F3F3'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'start', width: '100%' }}>
              <Box sx={{ width: '100%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: '5px', width: '100%' }}>
                  <Typography>{item.sent_date}</Typography>
                  <Typography>Сумма</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: '5px', width: '100%' }}>
                  <Typography>Прочие поступления</Typography>
                  <Typography sx={{ color: '#342C2C' }}>{item.amount} UZS</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: '5px', width: '100%' }}>
                  <Typography sx={{ color: '#342C2C', fontWeight: '600' }}>{item.receiver_name}</Typography>
                </Box>
                {item.type === 1 && (
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: '5px', width: '100%' }}>
                    <Typography>Статус</Typography>
                    <Box>
                      <TransStatus status={item.status} />
                    </Box>
                  </Box>
                )}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: '5px', width: '100%' }}></Box>
              </Box>
            </Box>
          </Box>
        )
      })}
    </Box>
  )
}
