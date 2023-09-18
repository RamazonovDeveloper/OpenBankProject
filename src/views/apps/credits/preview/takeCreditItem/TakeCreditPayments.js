import { colorKeywords } from '@iconify/utils'
import React from 'react'
import TableBasic from 'src/views/table/TableBasic'
import Modal from '@mui/material/Modal'
import { useState } from 'react'
import { Box, Button, Typography } from '@mui/material'

import Styles from './Project.module.css'

import LogoIcon from './favicon.png'

function TakeCreditPayments() {
  const columns = [
    {
      id: 'date',
      title: 'Дата',
      align: '',
      minWidth: 50
    },
    {
      id: 'amount',
      title: 'Стоитмост',
      align: '',
      minWidth: 50
    }
  ]

  const rows = [
    {
      date: '25.02.2023',
      amount: '100 000.00 UZS'
    },
    {
      date: '25.02.2023',
      amount: '100 000.00 UZS'
    },
    {
      date: '25.02.2023',
      amount: '100 000.00 UZS'
    },
    {
      date: '25.02.2023',
      amount: '100 000.00 UZS'
    }
  ]

  // modall
  const [open, setOpen] = useState(false)

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
  }

  function handleClose() {
    setOpen(false)

    // setModalMass([])
  }

  function handleOpen() {
    // alert("Modal opened")
    setOpen(true)

    // modalMass.push(item)
  }

  return (
    <>
      <TableBasic rows={rows} columns={columns} handleClick={handleOpen} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            ДАТА
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            25.02.2023
          </Typography>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            СТОИТМОСТ
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            100 000.00 UZS
          </Typography>
        </Box>
      </Modal>
    </>
  )
}

export default TakeCreditPayments
