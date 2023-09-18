import React from 'react' // ** React Imports

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Select from '@mui/material/Select'

// ** Third Party Imports
import { Controller } from 'react-hook-form'

const Counterparty = ({ handleAccount, control, errors, accountItems }) => {
  return (
    <>
      <Box style={{ fontWeight: 'bold' }}>Дебет</Box>
      <Divider sx={{ my: 6, m: 0, p: 0 }} />
      <Grid container spacing={5} sx={{ mt: 2, ml: 0 }}>
        <Grid xs={12} sm={12} sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
          <Typography sx={{ ml: 3, width: '70%' }} variant='subtitle1'>
            Счет отправителя:
          </Typography>

          <Controller
            label='Выберите аккаунт'
            name='doc_account'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                {...field}
                fullWidth
                size='small'
                id='demo-simple-select-outlined'
                labelId='demo-simple-select-outlined-label'
                onChange={e => handleAccount(e.target.value)}
              >
                <MenuItem disabled value=''>
                  Выберите аккаунт
                </MenuItem>
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
          {errors.doc_account && <span>required</span>}
        </Grid>
        <Grid xs={12} sm={12} sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
          <Typography sx={{ ml: 3, width: '70%' }} variant='subtitle1'>
            Банк отправителя:
          </Typography>
          <Controller
            name='account_mfo'
            control={control}
            rules={{ required: true }}
            render={({ field }) => <TextField {...field} size='small' fullWidth />}
          />
          {errors.account_mfo && <span>required</span>}
        </Grid>
        <Grid xs={12} sm={12} sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
          <Typography sx={{ ml: 3, width: '70%' }} variant='subtitle1'>
            Наименование отправителя:
          </Typography>

          <Controller
            name='company_name'
            control={control}
            rules={{ required: true }}
            render={({ field }) => <TextField className='borderBalance' disabled {...field} size='small' fullWidth />}
          />
        </Grid>
        <Grid xs={12} sm={12} sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
          <Typography sx={{ ml: 3, width: '70%' }} variant='subtitle1'>
            ИНН отправителя:
          </Typography>
          <Controller
            name='doc_inn'
            control={control}
            rules={{ required: true }}
            render={({ field }) => <TextField {...field} size='small' fullWidth />}
          />
          {errors.doc_inn && <span>required</span>}
        </Grid>
        <Grid xs={12} sm={12} sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
          <Grid container spacing={5} sx={{ mt: 2, mx: 0, justifyContent: 'space-between' }}>
            <Grid xs={4} sm={4} sx={{ display: 'flex', alignItems: 'center', my: 1, ml: 3 }}>
              <Typography sx={{ width: '70%' }} variant='subtitle1'>
                Oстаток на счете
              </Typography>
            </Grid>
            <Grid xs={3} sm={3}>
              <Typography sx={{ width: '70%' }} variant='subtitle1'>
                Непроведенное сальдс
              </Typography>
              <Controller
                name='account_balance'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField className='borderBalance' disabled {...field} size='small' fullWidth />
                )}
              />
            </Grid>
            <Grid xs={3} sm={3}>
              <Typography sx={{ width: '70%' }} variant='subtitle1'>
                Сальдо по счету
              </Typography>
              <Controller
                name='account_balance'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField className='borderBalance' disabled {...field} size='small' fullWidth />
                )}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Divider />

      <Box style={{ fontWeight: 'bold' }}>Кредит</Box>
      <Grid container spacing={5} sx={{ mb: 5 }}>
        <Grid item xs={12} sm={12} sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography sx={{ ml: 3, width: '70%' }} variant='subtitle1'>
            Счет получателя:{' '}
          </Typography>
          <Controller
            name='receiver_account'
            control={control}
            rules={{ required: true }}
            render={({ field }) => <TextField type='number' {...field} size='small' fullWidth />}
          />
          {errors.receiver_account && <span>required</span>}
        </Grid>
        <Grid item xs={12} sm={12} sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography sx={{ ml: 3, width: '70%' }} variant='subtitle1'>
            Банк получателя
          </Typography>
          <Controller
            name='receiver_mfo'
            control={control}
            rules={{ required: true }}
            render={({ field }) => <TextField {...field} size='small' fullWidth />}
          />
          {errors.receiver_mfo && <span>required</span>}
        </Grid>
        <Grid item xs={12} sm={12} sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography sx={{ ml: 3, width: '70%' }} variant='subtitle1'>
            Наименование получателя:{' '}
          </Typography>
          <Controller
            name='receiver_name'
            control={control}
            rules={{ required: true }}
            render={({ field }) => <TextField {...field} size='small' fullWidth />}
          />
          {errors.receiver_name && <span>required</span>}
        </Grid>
        <Grid item xs={12} sm={12} sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography sx={{ ml: 3, width: '70%' }} variant='subtitle1'>
            ИНН получателя
          </Typography>
          <Controller
            name='receiver_inn'
            control={control}
            rules={{ required: true }}
            render={({ field }) => <TextField {...field} size='small' fullWidth />}
          />
          {errors.receiver_inn && <span>required</span>}
        </Grid>
      </Grid>

      <Divider />

      <Box style={{ fontWeight: 'bold' }}>Проче:</Box>
      <Grid container spacing={5} sx={{ mb: 5 }}>
        <Grid item xs={12} sm={12} sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography sx={{ ml: 3, width: '70%' }} variant='subtitle1'>
            Сумма:{' '}
          </Typography>
          <Controller
            name='amount'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField {...field} size='small' fullWidth label='0.00 UZS' placeholder='0.00 UZS' />
            )}
          />
          {errors.amount && <span>required</span>}
        </Grid>
        <Grid item xs={12} sm={12} sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography sx={{ ml: 3, width: '70%' }} variant='subtitle1'>
            Код назначения:{' '}
          </Typography>
          <Controller
            name='purpose_code'
            control={control}
            rules={{ required: true }}
            render={({ field }) => <TextField {...field} size='small' fullWidth />}
          />
          {errors.purpose_code && <span>required</span>}
        </Grid>

        <Grid item xs={12} sm={12} sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography sx={{ ml: 3, width: '70%' }} variant='subtitle1'>
            Назначение платежа:{' '}
          </Typography>
          <Controller
            name='purpose'
            control={control}
            rules={{ required: true }}
            render={({ field }) => <TextField {...field} size='small' fullWidth />}
          />
          {errors.purpose && <span>{errors.purpose.message}</span>}
        </Grid>
        {/* <Grid item xs={12} sm={12} sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography sx={{ ml: 3, width: '70%' }} variant='subtitle1'>
            Дата отправки:{' '}
          </Typography>
          <Controller
            name='created_at'
            control={control}
            rules={{ required: true }}
            render={({ field }) => <TextField type='date' {...field} size='small' fullWidth />}
          />
          {errors.created_at && <span>required</span>}
        </Grid> */}
      </Grid>
    </>
  )
}

export default Counterparty
