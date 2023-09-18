import React, { useRef, useState } from 'react'
import Box from '@mui/material/Box'
import {
  Autocomplete,
  Card,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Tab,
  TextField,
  Tooltip,
  Typography
} from '@mui/material'
import usePayment from 'src/hooks/usePayment'
import useAccount from 'src/hooks/useAccount'
import addDays from 'date-fns/addDays'
import DatePicker from 'react-datepicker'

import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Controller, useForm } from 'react-hook-form'
import useStorage from 'src/hooks/useStorage'
import SuccesMessage from 'src/views/alerts/SuccesMessage'
import FormDialog from 'src/views/components/FormDialog'
import PaymentRepository from 'src/repositories/PaymentRepository'
import { useRouter } from 'next/router'
import { parseSinglePaymentBalance } from 'src/utils/sumWithPenny'
import TransactionTabContext from '../../home/TransactionTabContext/TransactionTabContext'
import TransactionAddItemTabContext from '../../home/TransactionTabContext/TransactionAddItemTabContext'
import ModalComponent from 'src/views/components/Modal/ModalComponent'
import useMfo from 'src/hooks/useMfo'
import SearchIcon from '@mui/icons-material/Search'

let defaultValues = {
  doc_type: '',
  account_id: '',
  doc_account: '',
  receiver_inn: '',
  receiver_mfo: '',
  receiver_name: '',
  receiver_account: '',
  receiver_name: '',
  amount: '',
  purpose: '',
  purpose_code: '',
  doc_num: '2',
  bank_co: '',
  sender_inn: ''
}

function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return [year, month, day].join('-')
}

function TransactionAddTab1Components(props) {
  const router = useRouter()
  const paymentProps = usePayment()
  const { accountItems, getAccountsList } = useAccount()

  const {
    mfoList,
    paymentCodeReference,
    setPaymentCode,
    setMfo,
    paymentCode,
    mfo,
    treasuryReferences,
    treasury,
    setTreasury,
    budgetReferences,
    budget,
    setBudget
  } = useMfo()

  console.log('mfoList => ', mfoList)
  console.log('paymentCodeReference => ', paymentCodeReference)
  console.log('mfo => ', mfo)

  const userInnRef = useRef()
  const userCallingRef = useRef()
  const balanceRef = useRef()
  const mfoRef = useRef()
  const passwordRef = useRef()
  const paymentNameRef = useRef()

  const [docType, setDocType] = React.useState(2)
  const [date, setDate] = React.useState(null)

  const [statusMessage, setStatusMessage] = useState(null)

  const [company] = useStorage('companyInfo', '', localStorage)

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
    resetField,
    getValues
  } = useForm({ defaultValues })

  const onSubmit = data => {
    data.doc_type = docType
    data.amount = data.amount.replace(/[.,]/g, '')

    console.log('submited', data)

    addPayment(data)
  }

  console.log('getValues ', getValues())

  async function addPayment(data) {
    let paymentsList = await PaymentRepository.addPayment(data)

    console.log('paymentsList', paymentsList)

    paymentsList &&
      setStatusMessage(
        <ModalComponent
          {...paymentsList}
          closeDialog={() => {
            setStatusMessage(null)
            router.push(`/transaction`)
          }}
        />
      )
  }

  const handleAccount = data => {
    let account_data = accountItems.find(item => {
      return item.account === data
    })
    console.log('account_data', account_data)
    reset({
      ...getValues(),
      doc_account: account_data.account,
      account_id: account_data.id,
      bank_co: account_data.mfo
    })
  }

  return (
    <Box sx={{}}>
      <Card>
        <Box
          sx={{
            padding: '20px',
            paddingTop: '0px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            columnGap: '35px',
            marginTop: '20px'
          }}
        >
          <Box>
            <Typography sx={{ mb: '8px', fontSize: '17px' }}>Создать платеж</Typography>
            <FormControl sx={{ minWidth: 120, width: '100%' }}>
              <Select
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                sx={{ backgroundColor: '#EEEEEE', height: '55px' }}
                value={docType}
                onChange={value => {
                  setDocType(value.target.value)
                }}
              >
                <MenuItem value={2}>Платеж контрагенту</MenuItem>
                <MenuItem value={1}>Платеж казначейству</MenuItem>
                <MenuItem value={3}>Платеж в бюджет</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Box className=''>
            <Box
              sx={{
                padding: '20px',
                paddingTop: '0px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                columnGap: '35px',
                marginTop: '20px'
              }}
            >
              <Box>
                <Typography sx={{ mb: '8px', fontSize: '17px' }}>Счет oтправителя</Typography>
                <FormControl sx={{ minWidth: 120, width: '100%' }}>
                  <Controller
                    name='doc_account'
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        id='outlined-error'
                        error={errors.doc_account}
                        {...field}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        sx={{ backgroundColor: '#EEEEEE', height: '55px' }}
                        onChange={e => handleAccount(e.target.value)}
                      >
                        {accountItems &&
                          accountItems.map((item, index) => {
                            return (
                              <MenuItem key={index} value={item.account}>
                                {item.account}
                              </MenuItem>
                            )
                          })}
                      </Select>
                    )}
                  />
                </FormControl>
              </Box>
              <Box>
                <Typography sx={{ mb: '8px', fontSize: '17px' }}>Сумма платежа (UZS)</Typography>
                <Controller
                  name='amount'
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      className='input_dark'
                      id='outlined-error'
                      onInput={val => {
                        let parsedToNumber = val.target.value
                          .split('.')
                          .join('')
                          .split(',')
                          .join('')
                          .replace(/[^\d]/, '')
                        console.log(parsedToNumber)

                        // resetField('amount', { keepTouched: true })

                        reset({ ...getValues(), amount: parseSinglePaymentBalance(parsedToNumber) })
                      }}
                      placeholder='00.00'
                      error={errors.amount}
                      {...field}
                      style={{ width: '100%', height: '55px' }}
                    />
                  )}
                />
              </Box>
              <Box>
                <Typography sx={{ mb: '8px', fontSize: '17px' }}>Дата платежа</Typography>

                <div className='myFilterInputWrapper'>
                  <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <svg width='24' height='25' viewBox='0 0 24 25' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <g clip-path='url(#clip0_1215_3437)'>
                        <path
                          d='M5.75996 0.5C5.23496 0.5 4.79996 0.935 4.79996 1.46V2.42H1.91996C1.66871 2.42 1.41371 2.51187 1.23371 2.69375C1.05184 2.87375 0.959961 3.12875 0.959961 3.38V22.58C0.959961 22.8313 1.05184 23.0863 1.23371 23.2681C1.41371 23.4481 1.66871 23.54 1.91996 23.54H22.08C22.3312 23.54 22.5862 23.4481 22.7681 23.2681C22.9481 23.0863 23.04 22.8313 23.04 22.58V3.38C23.04 3.12875 22.9481 2.87375 22.7681 2.69375C22.5862 2.51187 22.3312 2.42 22.08 2.42H19.2V1.46C19.2 0.935 18.765 0.5 18.24 0.5H17.28C16.755 0.5 16.32 0.935 16.32 1.46V2.42H7.67996V1.46C7.67996 0.935 7.24496 0.5 6.71996 0.5H5.75996ZM5.75996 1.46H6.71996V4.34H5.75996V1.46ZM17.28 1.46H18.24V4.34H17.28V1.46ZM1.91996 3.38H4.79996V4.34C4.79996 4.865 5.23496 5.3 5.75996 5.3H6.71996C7.24496 5.3 7.67996 4.865 7.67996 4.34V3.38H16.32V4.34C16.32 4.865 16.755 5.3 17.28 5.3H18.24C18.765 5.3 19.2 4.865 19.2 4.34V3.38H22.08V6.74H1.91996V3.38ZM1.91996 7.7H22.08V22.58H1.91996V7.7ZM4.79996 9.62V20.66H19.2V9.62H4.79996ZM5.75996 10.58H8.15996V12.98H5.75996V10.58ZM9.11996 10.58H11.52V12.98H9.11996V10.58ZM12.48 10.58H14.88V12.98H12.48V10.58ZM15.84 10.58H18.24V12.98H15.84V10.58ZM5.75996 13.94H8.15996V16.34H5.75996V13.94ZM9.11996 13.94H11.52V16.34H9.11996V13.94ZM15.84 13.94H18.24V16.34H15.84V13.94ZM5.75996 17.3H8.15996V19.7H5.75996V17.3ZM9.11996 17.3H11.52V19.7H9.11996V17.3ZM12.48 17.3H14.88V19.7H12.48V17.3ZM15.84 17.3H18.24V19.7H15.84V17.3Z'
                          fill='#342C2C'
                        />
                      </g>
                      <defs>
                        <clipPath id='clip0_1215_3437'>
                          <rect width='24' height='24' fill='white' transform='translate(0 0.5)' />
                        </clipPath>
                      </defs>
                    </svg>

                    <DatePicker
                      format='DD/MM/YYYY'
                      id='min-date'
                      showTimeSelect={false}
                      size='small'
                      placeholderText='дд-мм-гггг'
                      value={date}
                      maxDate={addDays(new Date(), -1)}
                      onChange={date => setDate(formatDate(date))}
                      customInput={<input className='myFilterInput' autocomplete='off' placeholder='ssss' />}
                    />
                  </label>
                </div>
              </Box>
            </Box>
            <Box
              sx={{
                padding: '20px',
                paddingTop: '8px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                columnGap: '35px',
                rowGap: '5px'
              }}
            >
              <Box>
                <Typography sx={{ mb: '8px', fontSize: '17px' }}>ИНН получателя</Typography>

                <Controller
                  name='receiver_inn'
                  control={control}
                  rules={{ required: true, pattern: /^[0-9]{9}$/ }}
                  render={({ field }) => (
                    <TextField
                      className='input_dark'
                      id='outlined-error'
                      error={errors.receiver_inn}
                      {...field}
                      inputProps={{
                        maxLength: 9
                      }}
                      style={{ width: '100%', height: '55px' }}
                    />
                  )}
                />
              </Box>
              <Box>
                <Typography sx={{ mb: '8px', fontSize: '17px' }}>Наименование получателя</Typography>

                <Controller
                  name='receiver_name'
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      className='input_dark'
                      id='outlined-error'
                      error={errors.receiver_name}
                      {...field}
                      inputProps={{
                        maxLength: 50
                      }}
                      style={{ width: '100%', height: '55px' }}
                    />
                  )}
                />
              </Box>
              <Box>
                <Typography sx={{ mb: '8px', fontSize: '17px' }}>МФО банка</Typography>
                <Tooltip title={mfoList.find(item => item.branch_code === mfo)?.branch_name} placement='top-start'>
                  <Autocomplete
                    className='search_input'
                    options={mfoList.map(option => option.branch_code)}
                    freeSolo
                    disableClearable
                    value={mfo}
                    onChange={(_, newValue) => {
                      setMfo(newValue)
                    }}
                    onInputChange={(_, newValue) => {
                      setMfo(newValue)
                    }}
                    renderInput={params => (
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <TextField {...register('receiver_mfo')} {...params} placeholder='Начните вводить номер' />

                        <span className='serach_input_icon'>
                          <svg
                            width='24'
                            height='25'
                            viewBox='0 0 24 25'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M10.0799 1.94C5.57805 1.94 1.91992 5.59813 1.91992 10.1C1.91992 14.6019 5.57805 18.26 10.0799 18.26C11.8612 18.26 13.5074 17.6863 14.8499 16.715L21.1649 23.015L22.5149 21.665L16.2749 15.41C17.5012 13.9813 18.2399 12.1269 18.2399 10.1C18.2399 5.59813 14.5818 1.94 10.0799 1.94ZM10.0799 2.9C14.0624 2.9 17.2799 6.1175 17.2799 10.1C17.2799 14.0825 14.0624 17.3 10.0799 17.3C6.09742 17.3 2.87992 14.0825 2.87992 10.1C2.87992 6.1175 6.09742 2.9 10.0799 2.9Z'
                              fill='#342C2C'
                            />
                          </svg>
                        </span>
                      </Box>
                    )}
                  />
                </Tooltip>

                {/* {mfo && <span className=''>{mfoList.find(item => item.branch_code === mfo)?.branch_name}</span>} */}
                {errors.receiver_mfo && <span className='inputError'>Поле введено неправильно</span>}
              </Box>
              <Box sx={{ marginTop: '20px' }}>
                <Typography sx={{ mb: '8px', fontSize: '17px' }}>Счет получателя</Typography>
                <Controller
                  name='receiver_account'
                  control={control}
                  rules={{ required: true, pattern: /^[0-9]{20}$/ }}
                  render={({ field }) => (
                    <TextField
                      className='input_dark'
                      id='outlined-error'
                      error={errors.receiver_account}
                      {...field}
                      inputProps={{
                        maxLength: 20
                      }}
                      style={{ width: '100%', height: '55px' }}
                    />
                  )}
                />
              </Box>
              <Box sx={{ marginTop: '20px' }}>
                <Typography sx={{ mb: '8px', fontSize: '17px' }}>Код назначения</Typography>
                <Tooltip
                  title={paymentCodeReference.find(item => item.payment_code === paymentCode)?.tranche_name}
                  placement='top-start'
                >
                  <Autocomplete
                    className='search_input'
                    options={paymentCodeReference.map(option => option.payment_code)}
                    freeSolo
                    disableClearable
                    value={paymentCode}
                    onChange={(_, newValue) => {
                      setPaymentCode(newValue)
                    }}
                    onInputChange={(_, newValue) => {
                      setPaymentCode(newValue)
                    }}
                    renderInput={params => (
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <TextField {...register('purpose_code')} {...params} placeholder='Начните вводить номер' />
                        <span className='serach_input_icon'>
                          <svg
                            width='24'
                            height='25'
                            viewBox='0 0 24 25'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M10.0799 1.94C5.57805 1.94 1.91992 5.59813 1.91992 10.1C1.91992 14.6019 5.57805 18.26 10.0799 18.26C11.8612 18.26 13.5074 17.6863 14.8499 16.715L21.1649 23.015L22.5149 21.665L16.2749 15.41C17.5012 13.9813 18.2399 12.1269 18.2399 10.1C18.2399 5.59813 14.5818 1.94 10.0799 1.94ZM10.0799 2.9C14.0624 2.9 17.2799 6.1175 17.2799 10.1C17.2799 14.0825 14.0624 17.3 10.0799 17.3C6.09742 17.3 2.87992 14.0825 2.87992 10.1C2.87992 6.1175 6.09742 2.9 10.0799 2.9Z'
                              fill='#342C2C'
                            />
                          </svg>
                        </span>
                      </Box>
                    )}
                  />
                </Tooltip>
                {/* {paymentCode && (
                  <span>{paymentCodeReference.find(item => item.payment_code === paymentCode)?.tranche_name}</span>
                )} */}
              </Box>
              <Box sx={{ marginTop: '20px' }}>
                <Typography sx={{ mb: '8px', fontSize: '17px' }}>Назначение платежа</Typography>

                <Controller
                  name='purpose'
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => <input {...field} className='myInput' style={{ width: '100%' }} type='text' />}
                />
                {errors.purpose && <span>{errors.purpose.message}</span>}
              </Box>
            </Box>

            {docType == 1 && (
              <Box
                sx={{
                  padding: '20px',
                  paddingTop: '8px',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  columnGap: '35px',
                  rowGap: '5px'
                }}
              >
                <Box>
                  <Typography sx={{ mb: '8px', fontSize: '17px' }}>Счет казначейства</Typography>
                  <Tooltip
                    title={treasuryReferences.find(item => item.account === treasury)?.name}
                    placement='top-start'
                  >
                    <Autocomplete
                      className='search_input'
                      options={treasuryReferences.map(option => option.account)}
                      freeSolo
                      disableClearable
                      value={treasury}
                      onChange={(_, newValue) => {
                        setTreasury(newValue)
                      }}
                      onInputChange={(_, newValue) => {
                        setTreasury(newValue)
                      }}
                      renderInput={params => (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <TextField {...register('sender_inn')} {...params} placeholder='Начните вводить номер' />
                          <span className='serach_input_icon'>
                            <svg
                              width='24'
                              height='25'
                              viewBox='0 0 24 25'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                d='M10.0799 1.94C5.57805 1.94 1.91992 5.59813 1.91992 10.1C1.91992 14.6019 5.57805 18.26 10.0799 18.26C11.8612 18.26 13.5074 17.6863 14.8499 16.715L21.1649 23.015L22.5149 21.665L16.2749 15.41C17.5012 13.9813 18.2399 12.1269 18.2399 10.1C18.2399 5.59813 14.5818 1.94 10.0799 1.94ZM10.0799 2.9C14.0624 2.9 17.2799 6.1175 17.2799 10.1C17.2799 14.0825 14.0624 17.3 10.0799 17.3C6.09742 17.3 2.87992 14.0825 2.87992 10.1C2.87992 6.1175 6.09742 2.9 10.0799 2.9Z'
                                fill='#342C2C'
                              />
                            </svg>
                          </span>
                        </Box>
                      )}
                    />
                  </Tooltip>

                  {/* {treasury && (
                    <span className=''>{treasuryReferences.find(item => item.account === treasury)?.name}</span>
                  )} */}
                  {/* {errors.receiver_mfo && <span className='inputError'>Поле введено неправильно</span>} */}
                </Box>
              </Box>
            )}

            {docType == 3 && (
              <Box
                sx={{
                  padding: '20px',
                  paddingTop: '8px',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  columnGap: '35px',
                  rowGap: '5px'
                }}
              >
                <Box>
                  <Typography sx={{ mb: '8px', fontSize: '17px' }}>Счет в бюджет</Typography>
                  <Tooltip title={budgetReferences.find(item => item.account === budget)?.name} placement='top-start'>
                    <Autocomplete
                      className='search_input'
                      options={budgetReferences.map(option => option.account)}
                      freeSolo
                      disableClearable
                      value={budget}
                      onChange={(_, newValue) => {
                        setBudget(newValue)
                      }}
                      onInputChange={(_, newValue) => {
                        setBudget(newValue)
                      }}
                      renderInput={params => (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <TextField {...params} placeholder='Начните вводить номер' />
                          <span className='serach_input_icon'>
                            <svg
                              width='24'
                              height='25'
                              viewBox='0 0 24 25'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                d='M10.0799 1.94C5.57805 1.94 1.91992 5.59813 1.91992 10.1C1.91992 14.6019 5.57805 18.26 10.0799 18.26C11.8612 18.26 13.5074 17.6863 14.8499 16.715L21.1649 23.015L22.5149 21.665L16.2749 15.41C17.5012 13.9813 18.2399 12.1269 18.2399 10.1C18.2399 5.59813 14.5818 1.94 10.0799 1.94ZM10.0799 2.9C14.0624 2.9 17.2799 6.1175 17.2799 10.1C17.2799 14.0825 14.0624 17.3 10.0799 17.3C6.09742 17.3 2.87992 14.0825 2.87992 10.1C2.87992 6.1175 6.09742 2.9 10.0799 2.9Z'
                                fill='#342C2C'
                              />
                            </svg>
                          </span>
                        </Box>
                      )}
                    />
                  </Tooltip>

                  {/* {budget && (
                    <span className=''>{budgetReferences.find(item => item.account === budget)?.name}</span>
                  )} */}
                  {/* {errors.receiver_mfo && <span className='inputError'>Поле введено неправильно</span>} */}
                </Box>
              </Box>
            )}

            <Box sx={{ display: 'flex', padding: '20px', justifyContent: 'flex-end' }}>
              <button className='main_form_btn gray_btn'>
                Сохранить шаблон
                <svg
                  style={{ marginLeft: '15px' }}
                  width='25'
                  height='24'
                  viewBox='0 0 25 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M6.64983 0.960022C6.42108 1.00315 6.25608 1.20565 6.25983 1.44002V22.56C6.25795 22.7325 6.34983 22.8919 6.49795 22.9781C6.64608 23.0663 6.82983 23.0663 6.97983 22.98L12.4998 19.755L18.0198 22.98C18.1698 23.0663 18.3536 23.0663 18.5017 22.9781C18.6498 22.8919 18.7417 22.7325 18.7398 22.56V1.44002C18.7398 1.17565 18.5242 0.960022 18.2598 0.960022H6.73983C6.72483 0.960022 6.70983 0.960022 6.69483 0.960022C6.67983 0.960022 6.66483 0.960022 6.64983 0.960022ZM7.21983 1.92002H17.7798V21.72L12.7398 18.78C12.5917 18.6938 12.408 18.6938 12.2598 18.78L7.21983 21.72V1.92002Z'
                    fill='#342C2C'
                  />
                </svg>
              </button>
              <Box sx={{ display: 'flex', marginLeft: '20px' }}>
                <button className='main_form_btn' type='submit'>
                  Далее
                </button>
              </Box>
            </Box>
          </Box>
        </form>
      </Card>
      {/* <Box sx={{ width: '504px', typography: 'body1' }}>
        <Card sx={{ padding: '20px' }}>
          <TransactionAddItemTabContext {...paymentProps} />
        </Card>
      </Box> */}

      {statusMessage}
    </Box>
  )
}

const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
  { title: 'The Good, the Bad and the Ugly', year: 1966 },
  { title: 'Fight Club', year: 1999 },
  { title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
  { title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
  { title: 'Forrest Gump', year: 1994 },
  { title: 'Inception', year: 2010 },
  { title: 'The Lord of the Rings: The Two Towers', year: 2002 },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: 'Goodfellas', year: 1990 },
  { title: 'The Matrix', year: 1999 },
  { title: 'Seven Samurai', year: 1954 },
  { title: 'Star Wars: Episode IV - A New Hope', year: 1977 },
  { title: 'City of God', year: 2002 },
  { title: 'Se7en', year: 1995 },
  { title: 'The Silence of the Lambs', year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: 'Life Is Beautiful', year: 1997 },
  { title: 'The Usual Suspects', year: 1995 },
  { title: 'Léon: The Professional', year: 1994 },
  { title: 'Spirited Away', year: 2001 },
  { title: 'Saving Private Ryan', year: 1998 },
  { title: 'Once Upon a Time in the West', year: 1968 },
  { title: 'American History X', year: 1998 },
  { title: 'Interstellar', year: 2014 },
  { title: 'Casablanca', year: 1942 },
  { title: 'City Lights', year: 1931 },
  { title: 'Psycho', year: 1960 },
  { title: 'The Green Mile', year: 1999 },
  { title: 'The Intouchables', year: 2011 },
  { title: 'Modern Times', year: 1936 },
  { title: 'Raiders of the Lost Ark', year: 1981 },
  { title: 'Rear Window', year: 1954 },
  { title: 'The Pianist', year: 2002 },
  { title: 'The Departed', year: 2006 },
  { title: 'Terminator 2: Judgment Day', year: 1991 },
  { title: 'Back to the Future', year: 1985 },
  { title: 'Whiplash', year: 2014 },
  { title: 'Gladiator', year: 2000 },
  { title: 'Memento', year: 2000 },
  { title: 'The Prestige', year: 2006 },
  { title: 'The Lion King', year: 1994 },
  { title: 'Apocalypse Now', year: 1979 },
  { title: 'Alien', year: 1979 },
  { title: 'Sunset Boulevard', year: 1950 },
  {
    title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
    year: 1964
  },
  { title: 'The Great Dictator', year: 1940 },
  { title: 'Cinema Paradiso', year: 1988 },
  { title: 'The Lives of Others', year: 2006 },
  { title: 'Grave of the Fireflies', year: 1988 },
  { title: 'Paths of Glory', year: 1957 },
  { title: 'Django Unchained', year: 2012 },
  { title: 'The Shining', year: 1980 },
  { title: 'WALL·E', year: 2008 },
  { title: 'American Beauty', year: 1999 },
  { title: 'The Dark Knight Rises', year: 2012 },
  { title: 'Princess Mononoke', year: 1997 },
  { title: 'Aliens', year: 1986 },
  { title: 'Oldboy', year: 2003 },
  { title: 'Once Upon a Time in America', year: 1984 },
  { title: 'Witness for the Prosecution', year: 1957 },
  { title: 'Das Boot', year: 1981 },
  { title: 'Citizen Kane', year: 1941 },
  { title: 'North by Northwest', year: 1959 },
  { title: 'Vertigo', year: 1958 },
  { title: 'Star Wars: Episode VI - Return of the Jedi', year: 1983 },
  { title: 'Reservoir Dogs', year: 1992 },
  { title: 'Braveheart', year: 1995 },
  { title: 'M', year: 1931 },
  { title: 'Requiem for a Dream', year: 2000 },
  { title: 'Amélie', year: 2001 },
  { title: 'A Clockwork Orange', year: 1971 },
  { title: 'Like Stars on Earth', year: 2007 },
  { title: 'Taxi Driver', year: 1976 },
  { title: 'Lawrence of Arabia', year: 1962 },
  { title: 'Double Indemnity', year: 1944 },
  { title: 'Eternal Sunshine of the Spotless Mind', year: 2004 },
  { title: 'Amadeus', year: 1984 },
  { title: 'To Kill a Mockingbird', year: 1962 },
  { title: 'Toy Story 3', year: 2010 },
  { title: 'Logan', year: 2017 },
  { title: 'Full Metal Jacket', year: 1987 },
  { title: 'Dangal', year: 2016 },
  { title: 'The Sting', year: 1973 },
  { title: '2001: A Space Odyssey', year: 1968 },
  { title: "Singin' in the Rain", year: 1952 },
  { title: 'Toy Story', year: 1995 },
  { title: 'Bicycle Thieves', year: 1948 },
  { title: 'The Kid', year: 1921 },
  { title: 'Inglourious Basterds', year: 2009 },
  { title: 'Snatch', year: 2000 },
  { title: '3 Idiots', year: 2009 },
  { title: 'Monty Python and the Holy Grail', year: 1975 }
]

export default TransactionAddTab1Components
