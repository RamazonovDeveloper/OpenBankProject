import React from 'react'
import { Card, Grid, Button } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'

function TakeCreditOperations() {
  const router = useRouter()
  const companyInfo = JSON.parse(localStorage.getItem('companyInfo'))

  const navigateToCreditGrafic = () => {
    router.push(`/${companyInfo.slug}/credits/preview/grafic`)
  }

  const navigateToCreditEarly = () => {
    router.push(`/${companyInfo.slug}/credits/preview/early`)
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '1rem' }}>
      <Button
        style={{
          backgroundColor: 'white',
          color: 'black',
          minHeight: '50px'
        }}
        onClick={() => navigateToCreditGrafic()}
        variant='contained'
      >
        {' '}
        Погашение по графику{' '}
      </Button>
      <Button
        style={{
          backgroundColor: 'white',
          color: 'black'
        }}
        onClick={() => navigateToCreditEarly()}
        variant='contained'
      >
        Досрочное погашение
      </Button>

      {/* 
      <Grid md={4} sm={6} xs={12}>
        <Card sx={{p:2}} variant="outlined">Погашение по графику</Card>
      </Grid>

      <Grid md={4} sm={6} xs={12}>
        <Card sx={{p:2}} variant="outlined">Досрочное погашение</Card>
      </Grid>

      <Grid md={4} sm={6} xs={12}>
        <Card sx={{p:2}} variant="outlined">Досрочное погашение</Card>
      </Grid> */}
    </div>
  )
}

export default TakeCreditOperations
