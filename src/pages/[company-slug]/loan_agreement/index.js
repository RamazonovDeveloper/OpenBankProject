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
import useLoanAgreementFilter from 'src/hooks/useLoanAgreement'
import TableBasic from 'src/views/table/TableBasic'
import useKartoteka from 'src/hooks/useKartoteka'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'

const columns = [
  { field: 'id', headerName: 'ID', minWidth: 20 },
  {
    field: 'sent_date',
    headerName: 'Дата',
    minWidth: 120,
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
    minWidth: 320,
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
    minWidth: 200,
    renderCell: params => {
      return (
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ mr: 4 }} variant='body2' gutterBottom>
              {params.row.amount} UZS
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
    headerName: 'Статус',
    minWidth: 110,
    renderCell: params => {
      return (
        <Box>
          {params.row.status === 1 && (
            <Typography variant='body2' gutterBottom>
              Поступления
            </Typography>
          )}
          {params.row.status === 2 && (
            <Typography variant='body2' gutterBottom>
              Списания
            </Typography>
          )}
        </Box>
      )
    }
  },
  {
    field: 'payments',
    headerName: 'Счёт',
    minWidth: 210,
    renderCell: params => {
      return (
        <Box>
          <Typography variant='body2' gutterBottom>
            {params.row.doc_inn}
          </Typography>
        </Box>
      )
    }
  },
  {
    field: 'bank',
    headerName: 'Банк',
    minWidth: 130
  },
  {
    field: 'bank',
    headerName: 'Статус',
    minWidth: 210,
    renderCell: params => {
      return (
        <Box>
          <Stack direction='row' spacing={1}>
            <Chip label='Kutish' color='primary' variant='outlined' />
          </Stack>
        </Box>
      )
    }
  }
]

const columns2 = [
  {
    id: 'id',
    title: 'ИД',
    align: '',
    minWidth: 120
  },
  {
    id: 'date',
    title: 'Дата',
    align: '',
    minWidth: 120
  },
  {
    id: 'sender',
    title: 'Организация',
    align: '',
    minWidth: 120
  },
  {
    id: 'type',
    title: 'Тип документа',
    align: '',
    minWidth: 120
  },
  {
    field: 'status',
    title: 'Статус',
    minWidth: 210
  }

  // {
  //   id: 'organisation',
  //   title: 'Организация',
  //   align: '',
  //   minWidth: 120
  // },
]

const rows2 = [
  {
    date: '21',
    organisation: 'wigk',
    document_type: 'e'
  }
]

const LoanAgreement = () => {
  const router = useRouter()
  const [companyInfo] = useStorage('companyInfo')

  const aplicationDataRows = [
    {
      date: '25.04.2023',
      product: 'Бизнес ипотека АКБ“Капиталбанк”',
      rate: '4%',
      credit_amount: '100 000 000.00 UZS',
      deadline: '5 лет',
      status: 'На рассмотрении'
    },
    {
      date: '25.04.2023',
      product: 'Лизинг АКБ“Капиталбанк”',
      rate: '4%',
      credit_amount: '100 000 000.00 UZS',
      deadline: '5 лет',
      status: 'Отказано'
    },
    {
      date: '25.04.2023',
      product: 'Оборотные средства АКБ“Капиталбанк”',
      rate: '4%',
      credit_amount: '100 000 000.00 UZS',
      deadline: '5 лет',
      status: 'Одобрено'
    }
  ]

  const aplicationDataColumns = [
    {
      id: 'date',
      title: 'Дата',
      align: '',
      minWidth: 120
    },
    {
      id: 'product',
      title: 'Продукт',
      align: '',
      minWidth: 200
    },
    {
      id: 'rate',
      title: 'Ставка',
      align: '',
      minWidth: 80
    },
    {
      id: 'credit_amount',
      title: 'Сумма кредита',
      align: '',
      minWidth: 200
    },
    {
      id: 'deadline',
      title: 'Срок кредита',
      align: '',
      minWidth: 200
    },
    {
      id: 'status',
      title: 'Статус',
      align: '',
      minWidth: 200
    }
  ]

  // const handleClick = e => {

  //   console.log(e);

  //   const { id } = e
  //   id &&
  //     router.push({
  //       pathname: `/${companyInfo.slug}/loan_agreement/preview`,
  //       // query: { id: id }
  //     })
  // }

  // const companyInfo = JSON.parse(localStorage.getItem('companyInfo'))

  const { loanItems, getLoanItems } = useLoanAgreementFilter()
  console.log('AAAAAA', loanItems)
  console.log('AAAAAA', loanItems)
  console.log('AAAAAA', loanItems)

  useEffect(() => {
    getLoanItems({
      perPage: 10,
      page: 1
    })
  }, [])

  // const handleClick = (e) => {

  //   console.log("CLICKED ITEM uuid_code IS ");
  //   const { uuid_code } = e
  //   console.log(e);
  //   console.log(uuid_code);

  //   router.push({
  //     pathname: `/${companyInfo.slug}/loan_agreement/preview`,
  //     query: { id: 1 }
  //   })
  // }

  const handleClick = code => {
    router.push({
      pathname: `/${companyInfo.slug}/loan_agreement/preview`,
      query: { id: code }
    })
  }

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Card>
          {/* <TableHeader /> */}
          {/* <TableBasic rows={loanItems} columns={columns2} handleClick={handleClick}/> */}

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  {columns2.map((col, index) => (
                    <TableCell key={index}>{col.title}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {loanItems.map(row => (
                  <TableRow
                    hover
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    onClick={() => handleClick(row.uuid_code)}
                  >
                    <TableCell>{row.id}</TableCell>
                    <TableCell component='th' scope='row'>
                      {row.date}
                    </TableCell>
                    <TableCell>{row.sender}</TableCell>
                    <TableCell>{row.type}</TableCell>
                    <TableCell>
                      {row.sign_status ? (
                        <Stack direction='row' spacing={1}>
                          <Chip label='Подписан' color='success' variant='outlined' />
                        </Stack>
                      ) : (
                        <Stack direction='row' spacing={1}>
                          <Chip label='Ожидают вашей подписи' color='warning' variant='outlined' />
                        </Stack>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Grid>
    </Grid>
  )
}

export default LoanAgreement
