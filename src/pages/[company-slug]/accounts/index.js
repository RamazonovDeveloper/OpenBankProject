import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

// ** MUI Imports
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import useAccount from 'src/hooks/useAccount'
import AccountRepository from 'src/repositories/AccountRepository'

import Icon from 'src/@core/components/icon'

import IconButton from '@mui/material/IconButton'
import MyTable from 'src/views/table/MyTable'
import useStorage from 'src/hooks/useStorage'
import MyRedesignedTabPanel from 'src/views/components/MyRedesignedTabPanel'

const columns = [
  {
    flex: 0.1,
    field: 'account',
    headerName: '№ Счета',
    align: 'left',
    minWidth: 200
  },
  {
    flex: 0.1,
    field: 'balance',
    headerName: 'Остаток на счете',
    align: 'left',
    minWidth: 120,
    renderCell: params => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography sx={{ mr: 4 }} variant='body2' gutterBottom>
            {params.row.balance}
          </Typography>
          <IconButton color='inherit' sx={{ ml: -2.75 }}>
            <Icon icon='ep:refresh' />
          </IconButton>
        </Box>
      )
    }
  },

  {
    flex: 0.1,
    field: 'type',
    headerName: 'Тип счета',
    align: 'left',
    minWidth: 120
  },
  {
    flex: 0.1,
    field: 'state',
    headerName: 'Состояние',
    align: 'left',
    minWidth: 170,
    renderCell: params => {
      return (
        <Box>
          {params.row.state === 3 && (
            <Typography variant='body2' gutterBottom>
              ЗАКРЫТО
            </Typography>
          )}
          {params.row.state === 2 && (
            <Typography variant='body2' gutterBottom>
              ОТКРЫТО
            </Typography>
          )}
        </Box>
      )
    }
  },
  {
    flex: 0.1,
    field: 'bank_name',
    headerName: 'Банк',
    align: 'left',
    minWidth: 170
  }
]

const Payments = () => {
  const router = useRouter()

  const [companyInfo] = useStorage('companyInfo')

  const handleClick = props => {
    console.log('handle Click worked trying to push prewiev ....', props)
    router.push({
      pathname: `/${companyInfo.slug}/accounts/preview`,
      query: { id: props.id }
    })
  }

  // const handleClick = e => {
  //   console.log("Id before clicking Payment js", e);
  //   const { id } = e
  //   id &&
  //     router.push({
  //       pathname: `/${companyInfo.slug}/payments/preview`,
  //       query: { id: id }
  //     })
  // }

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const [value, setValue] = useState('2')

  const {
    getAccountsList,
    loadingSingleAsync,
    accountSync,
    accountItems,
    accountItemById,
    sum,
    accountsSync,
    loadingAsync
  } = useAccount()

  useEffect(() => {
    getAccountsList()

    console.log('table row s from accout js  ..........', accountItems)
  }, [])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const addNewItem = async e => {
    setLoading(true)

    const ress = await AccountRepository.accountsFromBanks()
    getAccountsList()
    console.log('bank accounts ', ress)
    setOpen(!open)
    setLoading(false)

    // getAccountsList
    // router.push(`/accounts/add`)
  }

  const reloadAccount = e => {
    console.log('e', e)
    accountSync(e.id)
    setTimeout(() => {
      getAccountsList()
    }, 2000)
  }

  const tabProps = {
    defaultIndex: 0,
    tabNames: [
      { 1: 'Все' }

      // , { 2: 'Суммовы' }, { 3: 'Долларовые' }
    ],
    tabItems: [
      {
        1: (
          <Box>
            <MyTable rows={accountItems} columns={columns} handleClick={handleClick} />
          </Box>
        )
      }

      // {
      //   2: (
      //     <Box>
      //       <Typography>Нет данных</Typography>
      //     </Box>
      //   )
      // },
      // {
      //   3: (
      //     <Box
      //       styles={{ width: '100%', height: '70vh', alignItems: 'center', justifyContent: 'center', display: 'flex' }}
      //     >
      //       <Typography>Нет данных</Typography>
      //     </Box>
      //   )
      // }
    ]
  }

  const buttonProps = (
    <>
      <Box className='my_tab_list_tabcontext'>
        <button className='main_btn'>
          Открыть счет{' '}
          <span>
            <svg width='17' height='16' viewBox='0 0 17 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M8.01982 0.320007V7.52001H0.819824V8.48001H8.01982V15.68H8.97982V8.48001H16.1798V7.52001H8.97982V0.320007H8.01982Z'
                fill='white'
              />
            </svg>
          </span>
        </button>
      </Box>
    </>
  )

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <MyRedesignedTabPanel
          type={1}
          setType={() => alert('Backeng API is needed')}
          tabProps={tabProps}
          buttonProps={buttonProps}
        />
      </Grid>
    </Grid>
  )
}

export default Payments
