// ** React Imports
import { useEffect } from 'react'
import { useRouter } from 'next/router'

import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import PaymentsHeader from 'src/views/apps/payments/PaymentsHeader'
import TableFilter from 'src/views/table/data-grid/TableFilter'
import usePayment from 'src/hooks/usePayment'
import useStorage from 'src/hooks/useStorage'
import Icon from 'src/@core/components/icon'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'

const columns = [
  // { field: 'id', headerName: 'ID', minWidth: 20 },
  {
    field: 'sent_date',
    headerName: 'Дата',
    minWidth: 140,
    renderCell: params => {
      return (
        <Box>
          <Typography variant='body2' gutterBottom>
            {params.row.sent_date.slice(0, 10)}
          </Typography>
        </Box>
      )
    }
  },
  {
    field: 'contragent',
    headerName: 'Контрагент',
    minWidth: 340,
    renderCell: params => {
      return (
        <Box>
          <Typography variant='body1' gutterBottom>
            {params.row.doc_account}
          </Typography>
          <Typography variant='body2' gutterBottom>
            {params.row.doc_inn}
          </Typography>
          {params.row.doc_type === 1 && (
            <Typography variant='caption' display='block' gutterBottom>
              Платёж контрагенту
            </Typography>
          )}
          {params.row.doc_type === 2 && (
            <Typography variant='caption' display='block' gutterBottom>
              Платеж казначейству
            </Typography>
          )}
          {params.row.doc_type === 3 && (
            <Typography variant='caption' display='block' gutterBottom>
              Выплата по зарплатному проекту
            </Typography>
          )}
          {params.row.doc_type === 4 && (
            <Typography variant='caption' display='block' gutterBottom>
              Платеж в бюджет
            </Typography>
          )}
        </Box>
      )
    }
  },
  {
    field: 'amount',
    headerName: 'Сумма',
    minWidth: 230,
    renderCell: params => {
      return (
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ mr: 4 }} variant='body2' gutterBottom>
              {params.row.amount}
            </Typography>
            <IconButton color='inherit' sx={{ ml: -2.75 }}>
              <Icon icon='ep:refresh' />
            </IconButton>
          </Box>
        </Box>
      )
    }
  },
  {
    field: 'status',
    headerName: 'СТАТУС',
    minWidth: 210,
    renderCell: params => {
      return (
        <Box>
          <Stack direction='row' spacing={1}>
            {(params.row.status === 1 || params.row.status === 2) && (
              <Chip label='Создан' color='warning' variant='outlined' />
            )}
          </Stack>

          {params.row.status === 3 && <Chip label='Отправлен в банк' color='success' variant='outlined' />}
        </Box>
      )
    }
  },

  // {
  //   field: 'payments',
  //   headerName: 'Счёт',
  //   minWidth: 210,
  //   renderCell: params => {
  //     return (
  //       <Box>
  //         <Typography variant='body2' gutterBottom>
  //           {params.row.doc_inn}
  //         </Typography>
  //       </Box>
  //     )
  //   }
  // },
  {
    field: 'bank',
    headerName: 'Банк',
    minWidth: 180,
    renderCell: params => {
      return <Box>agrobank</Box>
    }
  }
]

const Payments = () => {
  const router = useRouter()
  const [companyInfo] = useStorage('companyInfo')

  // const companyInfo = JSON.parse(localStorage.getItem('companyInfo'))

  const {
    data,
    getPaymentsList,
    getAccountsList,
    rowItems,
    accountItems,
    setAccount_id,
    setType,
    setDate_from,
    setDate_till,
    setReceiver_inn
  } = usePayment()

  console.log('AAAAAA', rowItems)

  useEffect(() => {
    getPaymentsList()
    getAccountsList()
  }, [data.account_id, data.type, data.date_from, data.date_till, data.receiver_inn])

  const handleClick = e => {
    const { id } = e
    id &&
      router.push({
        pathname: `/${companyInfo.slug}/payments/preview`,
        query: { id: id }
      })
  }

  const addItem = e => {
    router.push(`/${companyInfo.slug}/additem`)
  }

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <PaymentsHeader addItem={addItem} />
      </Grid>

      <Grid item xs={12}>
        <Card>
          {/* <TableHeader /> */}
          <TableFilter
            accountItems={accountItems}
            setAccount_id={setAccount_id}
            setType={setType}
            setDate_from={setDate_from}
            setDate_till={setDate_till}
            setReceiver_inn={setReceiver_inn}
            data={data}
            rows={rowItems}
            columns={columns}
            handleClick={handleClick}
          />
        </Card>
      </Grid>
    </Grid>
  )
}

export default Payments
