import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Card, Grid, Tab, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import useDocumentsFilter from 'src/hooks/useDocuments'
import useStorage from 'src/hooks/useStorage'
import HorizontalLinearStepper from 'src/views/components/stepper/HorizontalLinearStepper'
import MyTable from 'src/views/table/MyTable'

const columns = [
  {
    field: 'date',
    headerName: 'Дата',
    minWidth: 20
  },
  {
    field: 'name',
    headerName: 'Документ',
    minWidth: 20
  },
  {
    field: 'sender',
    headerName: 'Организация',
    minWidth: 20
  },
  {
    field: 'employee',
    headerName: 'Инициатор',
    minWidth: 20
  },
  {
    field: 'sign_status',
    headerName: 'Статус',
    minWidth: 20,
    renderCell: params => {
      console.log('COLUMNS Статус RENDERCELL PARAMS IS ......', params)

      return <Box>{/* <HorizontalLinearStepper signers={['salom', 'salom']} /> */}</Box>
    }
  }
]

const Documents = () => {
  const router = useRouter()
  const [companyInfo] = useStorage('companyInfo')

  const handleClick = props => {
    router.push({
      pathname: `/${companyInfo.slug}/documents/preview`,
      query: { id: props.uuid_code }
    })
  }

  const handleClick2 = props => {
    // console.log("hello everybody");
    router.push({
      pathname: `/${companyInfo.slug}/documents/${'paymentDocuments'}`,
      query: { id: props.uuid_code }
    })
  }

  const handleClick3 = props => {
    console.log('162 162 handleClick3 props', props)
    router.push({
      pathname: `/${companyInfo.slug}/documents/insuranceContracts`,
      query: { id: props.uuid_code }
    })
  }

  const [value, setValue] = useState('1')

  const { loading, documentsList, getDocumentsByItsId, getDocumentsList } = useDocumentsFilter()

  console.log('documentsList -> ', documentsList)

  useEffect(() => {
    getDocumentsList()
    getDocumentsByItsId()
  }, [])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Grid>
      <Box>
        <TabContext value={value}>
          <Box className='my_tab_list_tabcontext'>
            <Card className='my_tab_list_accounts_page'>
              <TabList
                className='my_tab_list_accounts_page_list'
                onChange={handleChange}
                aria-label='lab API tabs example'
                textColor='secondary'
                indicatorColor='transparent'
              >
                <Tab
                  className={value == 1 ? 'active_tab tab_item' : 'tab_item'}
                  label='Кредитные документы'
                  value='1'
                />
                {/* <Tab
                  className={value == 2 ? 'active_tab tab_item' : 'tab_item'}
                  label='Договоры страхования'
                  value='2'
                /> */}
                {/* <Tab
                  className={value == 3 ? 'active_tab tab_item' : 'tab_item'}
                  label='Платежные документы'
                  value='3'
                /> */}
              </TabList>
            </Card>
          </Box>

          <TabPanel className='account_tab_panel' value='1'>
            <Box>
              <Card sx={{ minHeight: '60vh', borderRadius: 'unset' }}>
                {documentsList && (
                  <MyTable rows={documentsList} columns={columns} handleClick={handleClick} loading={loading} />
                )}
              </Card>
            </Box>
          </TabPanel>
          <TabPanel className='account_tab_panel' value='2'>
            <Box>
              <Card sx={{ minHeight: '60vh', borderRadius: 'unset' }}>
                {documentsList && (
                  <MyTable rows={documentsList} columns={columns} handleClick={handleClick2} loading={loading} />
                )}
              </Card>
            </Box>
          </TabPanel>
          <TabPanel className='account_tab_panel' value='3'>
            <Box>
              <Box sx={{ p: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr 2fr 2fr 2fr', gap: '30px' }}>
                <Box>
                  <Typography sx={{ mb: '8px' }}>Дата начала</Typography>
                  <input style={{ width: '100%' }} className='myInput' type='date' />
                </Box>
                <Box>
                  <Typography sx={{ mb: '8px' }}>Дата окончания</Typography>
                  <input style={{ width: '100%' }} className='myInput' type='date' />
                </Box>
                <Box>
                  <Typography sx={{ mb: '8px' }}>Валюта</Typography>
                  <select style={{ width: '100%' }} className='myInput' name='' id=''>
                    <option value='all'>Все</option>
                  </select>
                </Box>
                <Box>
                  <Typography sx={{ mb: '8px' }}>Счет</Typography>
                  <select style={{ width: '100%' }} className='myInput' name='' id=''>
                    <option value='all'>Все</option>
                  </select>
                </Box>
                <Box>
                  <Typography sx={{ mb: '8px' }}>Контрагент</Typography>
                  <select style={{ width: '100%' }} className='myInput' name='' id=''>
                    <option value='all'>Все</option>
                  </select>
                </Box>
              </Box>
            </Box>
            {/* {documentsList && <MyTable rows={documentsList} columns={columns} handleClick={handleClick3} />} */}
          </TabPanel>
        </TabContext>
      </Box>
    </Grid>
  )
}

export default Documents
