import React from 'react'
import Box from '@mui/material/Box'
import { Typography } from '@mui/material'

const modalStyle = {
  background: 'rgba(29, 21, 21, 0.35)',
  position: 'absolute',

  bottom: -70,
  top: 0,
  right: 0,
  left: 0,
  zIndex: 1100,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}

const modalCardStyle = {
  background: 'rgba(255, 255, 255, 1)',
  width: '725px',
  height: '320px'
}

const modalCardHeader = {
  display: 'flex',
  justifyContent: 'space-between',
  background: 'rgba(238, 238, 238, 1)',
  padding: '20px 30px'
}

const modalCardHeaderTitle = {
  fontSize: '20px',
  color: 'rgba(29, 21, 21, 1)',
  fontFamily: 'Manrope',
  fontWeight: '400'
}

const modalCardHeaderCloseBtn = {
  cursor: 'pointer'
}

const modalCardBody = {
  margin: '35px 0px',
  textAlign: 'center'
}

const modalCardBodyContent = {
  marginTop: '15px',
  fontSize: '20px',
  fontFamily: 'Manrope',
  color: 'rgba(52, 44, 44, 1)',
  fontWeight: '600'
}

const modalCardAction = {
  background: 'rgba(238, 238, 238, 1)',
  padding: '10px 30px',
  display: 'flex',
  justifyContent: 'flex-end'
}

const modalCardActionButton = {
  marginLeft: 'auto',
  background: 'rgba(78, 15, 138, 1)',
  padding: '10px 74px',
  border: 0,
  color: 'rgba(255, 255, 255, 1)',
  fontSize: '17px',
  fontWeight: 600,
  fontFamily: 'Manrope',
  cursor: 'pointer'
}

export default function ModalComponent(props) {
  const { message, success, closeDialog } = props

  return (
    <Box sx={modalStyle}>
      <Box sx={modalCardStyle}>
        <Box sx={modalCardHeader}>
          <Typography sx={modalCardHeaderTitle}>Уведомление о платеже</Typography>
          <span style={modalCardHeaderCloseBtn} onClick={closeDialog}>
            <svg width='25' height='25' viewBox='0 0 25 25' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M4.20562 3.51501L3.51562 4.20501L11.8106 12.5L3.51562 20.795L4.20562 21.485L12.5006 13.19L20.7956 21.485L21.4856 20.795L13.1906 12.5L21.4856 4.20501L20.7956 3.51501L12.5006 11.81L4.20562 3.51501Z'
                fill='black'
              />
            </svg>
          </span>
        </Box>
        <Box sx={modalCardBody}>
          {success ? (
            <svg width='80' height='80' viewBox='0 0 80 80' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <circle cx='40' cy='40' r='39.5' stroke='#4E0F8A' />
              <circle cx='40.0017' cy='40' r='28.2927' fill='#EDE7F3' />
              <path
                d='M30.8945 40L37.3986 46.5041L50.4067 33.4959'
                stroke='#4E0F8A'
                stroke-width='2'
                stroke-linecap='round'
                stroke-linejoin='round'
              />
            </svg>
          ) : (
            <svg width='80' height='80' viewBox='0 0 80 80' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <circle cx='40' cy='40' r='39.5' stroke='#D2D0D0' />
              <path
                d='M51.0358 28.9655L28.9668 51.0344'
                stroke='#D23232'
                stroke-width='2'
                stroke-linecap='round'
                stroke-linejoin='round'
              />
              <path
                d='M28.9668 28.9655L51.0358 51.0344'
                stroke='#D23232'
                stroke-width='2'
                stroke-linecap='round'
                stroke-linejoin='round'
              />
            </svg>
          )}
          <Typography sx={modalCardBodyContent}>{message}</Typography>
        </Box>
        <Box sx={modalCardAction}>
          <button onClick={closeDialog} style={modalCardActionButton}>
            {success ? 'OK' : 'Повторить'}
          </button>
        </Box>
      </Box>
    </Box>
  )
}
