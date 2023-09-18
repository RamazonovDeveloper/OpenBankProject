// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import { GridToolbarExport } from '@mui/x-data-grid'
import PickersMinMax from 'src/views/forms/form-elements/pickers/PickersMinMax'

import SelectBasic from 'src/views/forms/form-elements/select/SelectBasic'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const paymentTypeOtions = [
  { value: 0, label: 'Все' },
  {
    value: 1,
    label: 'Поступления'
  },
  {
    value: 2,
    label: 'Списания'
  }
]

function accountOptions(data) {
  let options = data.map(option => {
    return {
      ...option,
      value: option.id,
      label: option.account
    }
  })

  options.unshift({ value: 0, label: 'Все платежи' })

  return options
}

const ServerSideToolbar = props => {
  console.log('ServerSideToolbarp', props)
  const { accountItems, setAccount_id, setType } = props
  const options = accountItems && accountOptions(accountItems)
  const router = useRouter()

  return (
    <Grid container spacing={0} sx={{ justifyContent: 'space-between', alignItems: 'center', p: 3 }}>
      <Grid item xs={6} sm={4} md={2}>
        <TextField
          onChange={e =>
            (e.target.value.length == 9 || e.target.value.length == 0) && props.setReceiver_inn(e.target.value)
          }
          inputProps={{ maxLength: 9 }}
          size='small'
          type='search'
          label='ИНН получателя'
        />
      </Grid>
      <Grid item xs={6} sm={4} md={2}>
        <SelectBasic {...props} options={options} setOption={value => setAccount_id(value)} label='Выберите аккаунт' />
      </Grid>
      <Grid item xs={12} sm={5} md={3}>
        <PickersMinMax {...props} />
      </Grid>
      <Grid item xs={6} sm={4} md={2}>
        <SelectBasic {...props} options={paymentTypeOtions} setOption={value => setType(value)} label='Тип оплаты' />
      </Grid>
      <Grid item xs={6} sm={3} md={2}>
        <GridToolbarExport />
      </Grid>
    </Grid>
  )
}

export default ServerSideToolbar
