import { useEffect, useState } from 'react'

// import Preview from 'src/views/apps/payments/preview/Preview'
// import { useCompany } from 'src/hooks/useCompany'
// import PaymentRepository, { baseUrl } from 'src/repositories/PaymentRepository'
// import usePayment from 'src/hooks/usePayment'
// import useEimzo from 'src/hooks/useEimzo'
// import EIMZO from 'src/lib/Eimzo'
import Box from '@mui/material/Box'
import PaymentRepository, { baseUrl } from 'src/repositories/PaymentRepository'

// import { useRouter } from 'next/router'
import {
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Tab,
  Tabs,
  Typography
} from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import MyTable from 'src/views/table/MyTable'
import TransactionEditCard from 'src/views/apps/transaction/edit/TransactionEditCard'

// import MyTable from 'src/views/table/MyTable'

const columns = [
  { field: 'thisIsVector', headerName: 'Название шаблона', minWidth: 20 },
  { field: 'thisIsVector', headerName: 'Контрагент', minWidth: 20 },
  { field: 'thisIsVector', headerName: 'Сумма', minWidth: 20 },
  { field: 'thisIsVector', headerName: 'Назначение платежа', minWidth: 20 },
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
  }
]

const TransactionEditPage = props => {
  const { paymentId } = props
  const [data, setData] = useState(null)
  console.log('15 15 15 15 15 Payment id inside of the payment by id js', props)

  async function getInfo(params) {
    let res = await PaymentRepository.getPaymentById(paymentId)
    console.log('single payment => ', res)
    res && setData(res.data)
  }

  useEffect(() => {
    getInfo()
  }, [])

  const [value, setValue] = useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const [age, setAge] = useState('')

  const handleSelectChange = event => {
    setAge(event.target.value)
  }

  const [secondValue, setSecondValue] = useState('1')

  const handleSecondChange = (event, newValue) => {
    setSecondValue(newValue)
  }

  return data ? (
    <>
      <Grid>
        <Grid item sx={{ width: '100%' }} xs={12}>
          <Box>
            <TransactionEditCard editableData={data} />
          </Box>
        </Grid>
      </Grid>
    </>
  ) : (
    <Box sx={{ display: 'flex', width: '100%', height: '70vh', alignItems: 'center', justifyContent: 'center' }}>
      <CircularProgress />
    </Box>
  )
}

export async function getServerSideProps(context) {
  const paymentId = context.query.id

  // const {company, token} = useCompany()
  // let data = await PaymentRepository.getPaymentById(paymentId)

  return {
    props: {
      paymentId: context.query.id

      // paymentData: data
    } // will be passed to the page component as props
  }
}

export default TransactionEditPage
