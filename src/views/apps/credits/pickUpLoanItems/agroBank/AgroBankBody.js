import { Button } from '@mui/material'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/router'
import React from 'react'

function AgroBankBody() {
  const router = useRouter()
  const companyInfo = JSON.parse(localStorage.getItem('companyInfo'))

  const handleClick = route => {
    router.push(`/${companyInfo.slug}/credits/pickUpLoan/agroBank/${route}`)
  }

  return (
    <div>
      <p>Подберите кредит</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        <Button
          onClick={() => handleClick('workingCapital')}
          style={{
            backgroundColor: '#fff',
            minHeight: '70px',
            marginTop: '5px',
            marginRight: '5px',
            color: '#000',
            display: 'flex',
            flexDirection: 'column'
          }}
          variant='contained'
        >
          <p style={{ marginBottom: '0', marginBottom: '10px' }}>Пополнение оборортных средств</p>
          <p style={{ marginTop: '0', fontSize: '12px' }}>Кредит на развитие бизнеса</p>
        </Button>
        <Button
          style={{
            backgroundColor: '#fff',
            minHeight: '70px',
            marginTop: '5px',
            marginRight: '5px',
            color: '#000',
            display: 'flex',
            flexDirection: 'column'
          }}
          variant='contained'
        >
          <p style={{ marginBottom: '0', marginBottom: '10px' }}>Лизинг</p>
          <p style={{ marginTop: '0', fontSize: '12px' }}>Кредит на покупку основных средств</p>
        </Button>
        <Button
          style={{
            backgroundColor: '#fff',
            minHeight: '70px',
            marginTop: '5px',
            marginRight: '5px',
            color: '#000',
            display: 'flex',
            flexDirection: 'column'
          }}
          variant='contained'
        >
          <p style={{ marginBottom: '0', marginBottom: '10px' }}>Коммерческая ипотека</p>
          <p style={{ marginTop: '0', fontSize: '12px' }}>Кредит на покупку нежилых помещений</p>
        </Button>
        <Button
          style={{
            backgroundColor: '#fff',
            minHeight: '70px',
            marginTop: '5px',
            marginRight: '5px',
            color: '#000',
            display: 'flex',
            flexDirection: 'column'
          }}
          variant='contained'
        >
          <p style={{ marginBottom: '0', marginBottom: '10px' }}>Инвестиционный кредит</p>
          <p style={{ marginTop: '0', fontSize: '12px' }}>Кредит под инвестиционную программу</p>
        </Button>
      </div>
    </div>
  )
}

export default AgroBankBody
