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

function TransactionEditCard({ editableData }) {
  let defaultValues = editableData
  console.log('defaultValues ', defaultValues)
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
    data.amount = typeof data.amount == 'string' && data.amount.replace(/[.,]/g, '')

    console.log('submited', data)

    editPayment(data)
  }

  console.log('getValues ', getValues())

  async function editPayment(data) {
    let paymentsList = await PaymentRepository.editPayment(data)

    console.log('edit Payment ', paymentsList)

    paymentsList &&
      setStatusMessage(
        <ModalComponent
          {...paymentsList}
          closeDialog={() => {
            setStatusMessage(null)
            paymentsList.success && router.push(`/transaction`)
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

                <input className='myInput' style={{ width: '100%', height: '55px' }} type='date' />
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
                  Сохранить изменения
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

export default TransactionEditCard
