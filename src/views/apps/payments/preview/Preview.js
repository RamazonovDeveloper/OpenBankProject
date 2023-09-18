// ** React Imports
import { useState, useEffect } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'

// ** Third Party Components
import axios from 'axios'

// ** Demo Components Imports
import PreviewCard from 'src/views/apps/payments/preview/PreviewCard'
import PreviewActions from 'src/views/apps/payments/preview/PreviewActions'

import Typography from '@mui/material/Typography'
import Skeleton from '@mui/material/Skeleton'

const Preview = ({ data, confirmPaymentHandle, isPaymentSent }) => {
  console.log('Preview', data)

  if (data !== null) {
    return (
      <>
        <Grid container spacing={6}>
          <Grid item xl={9} md={8} xs={12}>
            <PreviewCard data={data} />
          </Grid>
          <Grid item xl={3} md={4} xs={12}>
            <PreviewActions
              id={data.id}
              confirmPaymentHandle={confirmPaymentHandle}
              isPaymentSent={isPaymentSent}
              data={data}
            />
          </Grid>
        </Grid>
      </>
    )
  } else {
    return (
      <Grid container spacing={8}>
        <Grid item xl={9} md={8} xs={12}>
          <Typography component='div' variant='h1'>
            <Skeleton variant='rectangular' height={100} />
          </Typography>
          <Typography component='div' variant='h1'>
            <Skeleton variant='rectangular' height={100} />
          </Typography>
          <Typography component='div' variant='h1'>
            <Skeleton variant='rectangular' height={100} />
          </Typography>
          <Typography component='div' variant='h1'>
            <Skeleton variant='rectangular' height={100} />
          </Typography>
          <Typography component='div' variant='h1'>
            <Skeleton variant='rectangular' height={100} />
          </Typography>
        </Grid>
        <Grid item xl={3} md={4} xs={12}>
          <Skeleton variant='rectangular' height={100} />
        </Grid>
      </Grid>
    )
  }
}

export default Preview
