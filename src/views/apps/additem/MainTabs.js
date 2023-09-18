import React, { forwardRef, useState, useEffect } from 'react' // ** React Imports
import SuccesMessage from 'src/views/alerts/SuccesMessage'
import MessageDialog from 'src/views/alerts/MessageDialog'
import { useRouter } from 'next/router'

// ** MUI Imports
import Tab from '@mui/material/Tab'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TabContext from '@mui/lab/TabContext'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import Select from '@mui/material/Select'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import SelectBasic from 'src/views/forms/form-elements/select/SelectBasic'

import PaymentRepository from 'src/repositories/PaymentRepository'
import useAccount from 'src/hooks/useAccount'
import useStorage from 'src/hooks/useStorage'
import useTemplate from 'src/hooks/useTemplate'
import Counterparty from 'src/views/apps/additem/components/Counterparty'
import Treasury from 'src/views/apps/additem/components/Treasury'
import Salary from 'src/views/apps/additem/components/Salary'
import Budget from 'src/views/apps/additem/components/Budget'
import Template from 'src/views/apps/additem/components/Template'

let defaultValues = {
  doc_type: '',
  doc_inn: '',
  doc_account: '',
  receiver_inn: '',
  receiver_account: '',
  receiver_mfo: '',
  receiver_name: '',
  amount: '',
  purpose: '',
  purpose_code: '',
  account_id: 1,
  created_at: '',
  account_balance: '',
  account_mfo: '',
  account_id: '',
  company_name: '', // for ui
  account_sum: '' // for ui
}

const MainTabs = () => {
  // ** States
  const [value, setValue] = useState('1')
  const [itemCreated, setItemCreated] = useState(false)
  const [statusMessage, setStatusMessage] = useState(false)
  const router = useRouter()
  const { accountItems, getAccountsList } = useAccount()
  const templateProps = useTemplate()

  console.log(templateProps)

  const [company] = useStorage('companyInfo', '', localStorage)

  console.log('company ', company)

  const {
    control,

    // setError,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({ defaultValues })

  useEffect(() => {
    getAccountsList()
  }, [])

  async function addPayment(data) {
    let paymentsList = await PaymentRepository.addPayment(data)

    console.log('paymentsList', paymentsList)
    if (!paymentsList?.success) {
      setStatusMessage(<SuccesMessage message={paymentsList.message} />)

      // setError(paymentsList.message)
    }

    if (paymentsList?.success) {
      setItemCreated(true)

      setTimeout(() => {
        router.push(`/${company.slug}/payments`)
      }, 1500)
    }
  }

  const handleTabsChange = (event, newValue) => {
    setValue(newValue)
    reset({})
  }

  const handleAccount = data => {
    let account_data = accountItems.find(item => {
      return item.account === data
    })
    console.log('account_data', account_data)
    reset({
      doc_account: account_data.account,
      account_id: account_data.id,
      account_balance: account_data.balance,
      account_mfo: account_data.mfo,
      doc_inn: company?.inn,
      company_name: company?.name
    })
  }

  const onSubmit = data => {
    console.log('submited', data)
    if (value === '5' && !templateProps.templateData) {
      console.log(data)
      setStatusMessage(<SuccesMessage message='Новый шаблон создан.' />)
      templateProps.addTemplate(data)

      setTimeout(() => {
        router.push(`/${company.slug}/additem`)
      }, 1500)
    } else {
      data.doc_type = value
      addPayment(data)
    }
  }

  return (
    <>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <TabContext value={value}>
            <TabList
              variant='scrollable'
              scrollButtons={false}
              onChange={handleTabsChange}
              sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
            >
              <Tab value='1' label='Платёж контрагенту' />
              <Tab value='5' label='Платеж по шаблону' />
              <Tab value='2' label='Платеж казначейству' />
              <Tab value='3' label='Выплата по зарплатному проекту' />
              <Tab value='4' label='Платеж в бюджет' />
              <Tab value='auto' label='Автоплатеж' />
            </TabList>
            <CardContent sx={{}}>
              <TabPanel value='1'>
                <Counterparty
                  handleAccount={handleAccount}
                  control={control}
                  errors={errors}
                  accountItems={accountItems}
                />
              </TabPanel>

              <TabPanel value='5'>
                <Template
                  {...templateProps}
                  reset={reset}
                  handleAccount={handleAccount}
                  control={control}
                  errors={errors}
                  accountItems={accountItems}
                />
              </TabPanel>

              <TabPanel value='2'>
                <Treasury handleAccount={handleAccount} control={control} errors={errors} accountItems={accountItems} />
              </TabPanel>

              <TabPanel value='3'>
                <Salary handleAccount={handleAccount} control={control} errors={errors} accountItems={accountItems} />
              </TabPanel>

              <TabPanel value='4'>
                <Budget handleAccount={handleAccount} control={control} errors={errors} accountItems={accountItems} />
              </TabPanel>
            </CardContent>
            <Divider sx={{ m: '0 !important' }} />
            <CardActions>
              <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
                {value == '5' && !templateProps.templateData ? 'Создать шаблон' : 'Создать'}
              </Button>
              <Button type='reset' size='large' variant='outlined' color='secondary'>
                Отмена
              </Button>
            </CardActions>
          </TabContext>
        </Card>
      </form>
      {itemCreated && <SuccesMessage />}
      {statusMessage}
    </>
  )
}

export default MainTabs
