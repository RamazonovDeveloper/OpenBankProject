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
import LoanAgreementCard from 'src/views/apps/loan_agreement/preview/LoanAgreementCard'
import LoanAgreementActions from 'src/views/apps/loan_agreement/preview/LoanAgreementActions'

import Typography from '@mui/material/Typography'
import Skeleton from '@mui/material/Skeleton'

const LoanAgreement = ({ data, getInfo }) => {
  console.log('LoanAgreement Data is', data)

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xl={6} md={6} xs={12}>
          <LoanAgreementCard data={data} />

          <LoanAgreementActions data={data} id={12} getInfo={getInfo} />
        </Grid>

        <Grid item xl={6} md={6} xs={12}>
          <object data={data.link && data.link} type='application/pdf' width='100%' height='850px'>
            <p>
              Alternative text - include a link <a href={data.link && data.link}>to the PDF!</a>
            </p>
          </object>
        </Grid>
      </Grid>
    </>
  )
}

export default LoanAgreement
