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
import Add from 'src/views/apps/payments/add/Add'
import AddActions from 'src/views/apps/payments/add/AddActions'

const AddPreview = ({ id }) => {
  // ** State
  const [error, setError] = useState(false)
  const [data, setData] = useState(null)
  const [addPaymentOpen, setAddPaymentOpen] = useState(false)
  const [sendInvoiceOpen, setSendInvoiceOpen] = useState(false)

  // useEffect(() => {
  //   axios
  //     .get('/apps/invoice/single-invoice', { params: { id } })
  //     .then(res => {
  //       setData(res.data)
  //       setError(false)
  //     })
  //     .catch(() => {
  //       setData(null)
  //       setError(true)
  //     })
  // }, [id])
  const toggleSendInvoiceDrawer = () => setSendInvoiceOpen(!sendInvoiceOpen)
  const toggleAddPaymentDrawer = () => setAddPaymentOpen(!addPaymentOpen)
  if (data == null) {
    return (
      <>
        <Grid container spacing={6}>
          <Grid item xl={9} md={8} xs={12}>
            <Add data={data} />
          </Grid>
          <Grid item xl={3} md={4} xs={12}>
            <AddActions id={id} />
          </Grid>
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

export default AddPreview
