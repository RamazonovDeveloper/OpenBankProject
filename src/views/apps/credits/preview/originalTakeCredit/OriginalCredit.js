import { Card, CardMedia, Button, CardHeader, Modal, Box, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

// import AgroLogo from'./img/AgroLogo.png'
// import IpakLogo from'./img/IpakLogo.png'
// import IpotekaLogo from'./img/IpotekaLogo.png'
// import KapitalbankLogo from'./img/KapitalbankLogo.png'
// import TBCLogo from'./img/TBCLogo.png'
// import XalqLogo from'./img/XalqLogo.png'
// import calc from'./img/calc.svg'

function OriginalCredit() {
  const router = useRouter()
  const companyInfo = JSON.parse(localStorage.getItem('companyInfo'))

  const handleClick = route => {
    router.push(`/${companyInfo.slug}/credits/pickUpLoan/${route}`)
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
  }

  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr' }}>
      <Button
        onClick={() => handleClick('calculator')}
        style={{ backgroundColor: '#fff', color: '#000', display: 'flex' }}
        variant='contained'
      >
        <div>
          <img src='/images/calc.svg' alt='' />
        </div>
        <div style={{ color: '#000', display: 'flex', textAlign: 'left', flexDirection: 'column', marginLeft: '15px' }}>
          <p style={{ margin: '0' }}>Кредитный калькулятор</p>
          <p style={{ margin: '0' }}>Рассчитать ежемесячный платеж</p>
        </div>
      </Button>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        <Button
          onClick={() => handleClick('agroBank')}
          style={{ backgroundColor: '#fff', minHeight: '70px', marginTop: '5px', marginRight: '5px' }}
          variant='contained'
        >
          <img src='/images/credits/AgroLogo.png' alt='AgroLogo' />
        </Button>
        <Button
          style={{ backgroundColor: '#fff', minHeight: '70px', marginTop: '5px', marginRight: '5px' }}
          variant='contained'
        >
          <img src='/images/credits/IpotekaLogo.png' alt='ipotekaLogo' />
        </Button>
        <Button
          style={{ backgroundColor: '#fff', minHeight: '70px', marginTop: '5px', marginRight: '5px' }}
          variant='contained'
        >
          <img src='/images/credits/IpakLogo.png' alt='IpakLogo' />
        </Button>
        <Button
          style={{ backgroundColor: '#fff', minHeight: '70px', marginTop: '5px', marginRight: '5px' }}
          variant='contained'
        >
          <img src='/images/credits/KapitalbankLogo.png' alt='KapitalbankLogo' />
        </Button>
        <Button
          style={{ backgroundColor: '#fff', minHeight: '70px', marginTop: '5px', marginRight: '5px' }}
          variant='contained'
        >
          <img src='/images/credits/TBCLogo.png' alt='TBCLogo' />
        </Button>
        <Button
          style={{ backgroundColor: '#fff', minHeight: '70px', marginTop: '5px', marginRight: '5px' }}
          variant='contained'
        >
          <img src='/images/credits/XalqLogo.png' alt='XalqLogo' />
        </Button>
      </div>

      {/* <Card variant='outlined'>
        <CardMedia
          component="img"
          height="194"
          image={youtube}
          alt="Paella dish"
        />
      </Card> */}

      {/* <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>  
      </Modal> */}

      {/* <Card sx={{ maxWidth: 345 }}>
        <img src={AgroLogo} alt="Agro Bank Logo" />
      </Card>
      <Card sx={{ maxWidth: 345 }}>
        <img src={IpakLogo} alt="Agro Bank Logo" />
      </Card>
      <Card sx={{ maxWidth: 345 }}>
        <img src={TBCLogo} alt="Agro Bank Logo" />
      </Card> */}
    </div>
  )
}

export default OriginalCredit
