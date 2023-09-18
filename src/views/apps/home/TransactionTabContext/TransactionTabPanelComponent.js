import { Box, Typography } from '@mui/material'
import React from 'react'
import TransStatus from 'src/views/components/Status/TransStatus'

export default function TransactionTabPanelComponent(props) {
  const { rowItems, handleClick } = props

  return (
    <Box sx={{ width: '100%' }}>
      {rowItems.map((item, index) => {
        return (
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '0px 10px 0px 0px',
              marginBottom: '10px',
              alignItems: 'center',
              borderBottom: '1px solid #F4F3F3'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'start', width: '100%' }} onClick={() => handleClick(item)}>
              {item.type === 1 ? (
                <svg width='43' height='43' viewBox='0 0 43 43' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <rect width='43' height='43' rx='21.5' fill='#F4F3F3' />
                  <path
                    d='M16.25 16.25H21.75M16.25 16.25V21.75M16.25 16.25L26.75 26.75'
                    stroke='#D23232'
                    stroke-width='1.5'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                </svg>
              ) : (
                <svg width='43' height='44' viewBox='0 0 43 44' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <rect y='0.00238037' width='43' height='43' rx='21.5' fill='#F4F3F3' />
                  <path
                    d='M26.75 26.7524H21.25M26.75 26.7524V21.2524M26.75 26.7524L16.25 16.2524'
                    stroke='#2DC28D'
                    stroke-width='1.5'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                </svg>
              )}
              <Box sx={{ ml: '20px', width: '100%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: '5px', width: '100%' }}>
                  <Typography>{item.sent_date}</Typography>
                  {/* <Typography>Сумма</Typography> */}
                  <Box>
                    <TransStatus status={item.status} />
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: '5px', width: '100%' }}>
                  <Typography sx={{ width: '70%' }}>{item.purpose}</Typography>
                  <Typography sx={{ color: '#342C2C' }}>{item.amount} UZS</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: '5px', width: '100%' }}>
                  <Typography sx={{ color: '#342C2C', fontWeight: '600' }}>{item.receiver_name}</Typography>
                </Box>
                {/* {item.type === 1 && (
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: '5px', width: '100%' }}>
                    <Typography>Статус</Typography>
                    <Box>
                      <TransStatus status={item.status} />
                    </Box>
                  </Box>
                )} */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: '5px', width: '100%' }}></Box>
              </Box>
            </Box>
          </Box>
        )
      })}
    </Box>
  )
}
