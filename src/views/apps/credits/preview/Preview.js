// ** React Imports
import { useState, useEffect } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'

// ** Third Party Components

// ** Demo Components Imports
import PreviewCard from 'src/views/apps/credits/preview/PreviewCard'
import TakeCreditItemTabList from './TakeCreditItemTabList'

const InvoicePreview = ({ id }) => {
  // ** State
  const [error, setError] = useState(false)
  const [data, setData] = useState(null)
  const [addPaymentOpen, setAddPaymentOpen] = useState(false)
  const [sendInvoiceOpen, setSendInvoiceOpen] = useState(false)

  const toggleSendInvoiceDrawer = () => setSendInvoiceOpen(!sendInvoiceOpen)
  const toggleAddPaymentDrawer = () => setAddPaymentOpen(!addPaymentOpen)
  if (data == null) {
    return (
      <>
        <Grid container spacing={6}>
          <Grid item xl={6} md={8} xs={12}>
            <PreviewCard data={data} />
          </Grid>
          <Grid item xl={12} md={12} xs={12}>
            <TakeCreditItemTabList/>
          </Grid>

          {/* <Grid item xl={3} md={4} xs={12}>
            <PreviewActions id={id} />
          </Grid> */}
        </Grid>
      </>
    )
  } else if (error) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Alert severity='error'>
            Счет с идентификатором: {id} не существует. Пожалуйста, проверьте список счетов-фактур:{' '}
            <Link href='/apps/invoice/list'>Список счетов</Link>
          </Alert>
        </Grid>
      </Grid>
    )
  } else {
    return null
  }
}

export default InvoicePreview
