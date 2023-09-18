import React from 'react'
import TabContext from '@mui/lab/TabContext'
import Tab from '@mui/material/Tab'
import TabPanel from '@mui/lab/TabPanel'
import Box from '@mui/material/Box'
import TabList from '@mui/lab/TabList'
import TransactionTabPanelComponent from './TransactionTabPanelComponent'
import { Typography } from '@mui/material'
import { useState, useEffect } from 'react'
import { getFirstDayOfMonth, getFirstDayOfWeek, getLastDayOfCurrentWeek, getLastDayOfMonth } from 'src/utils/common'

export default function TransactionTabContext(props) {
  const { rowItems, handleClick } = props

  const TransTabPanelItem = () => {
    return (
      <Box
        sx={{
          px: '10px',
          height: '680px',
          width: '100%',
          overflowY: 'scroll',
          marginBottom: '20px'
        }}
        className='tabBody'
      >
        {rowItems.length > 0 ? (
          <TransactionTabPanelComponent rowItems={rowItems} handleClick={handleClick} />
        ) : (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '627px'
            }}
          >
            <Typography>Нет данных</Typography>
          </Box>
        )}
      </Box>
    )
  }

  return (
    <Box>
      <Box className='tabHeader'>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            fontSize: '22px',
            fontWeight: '600',
            color: '#342C2C',
            mb: '20px'
          }}
        >
          Транзакции
        </Box>
      </Box>
      <TransTabPanelItem />
    </Box>
  )
}
