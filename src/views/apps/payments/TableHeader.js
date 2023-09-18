import React from 'react'
import Grid from '@mui/material/Grid'

import PickersMinMax from 'src/views/forms/form-elements/pickers/PickersMinMax'
import SelectBasic from 'src/views/forms/form-elements/select/SelectBasic'

const paymentsOptions = [
  {
    value: 'Все счета',
    label: 'Все счета'
  },
  {
    value: 'Рублёвые платежи',
    label: 'Рублёвые платежи'
  },
  {
    value: 'Валютные платежи',
    label: 'Валютные платежи'
  }
]

const paymentsDetails = [
  {
    value: 'Списания и поступления',
    label: 'Списания и поступления'
  },
  {
    value: 'Списания',
    label: 'Списания'
  },
  {
    value: 'Поступления',
    label: 'Поступления'
  }
]

const TableHeader = () => {
  return (
    <Grid container spacing={6} sx={{ alignItems: 'center', p: 3 }}>
      <Grid item xs={12} sm={6} md={3}>
        <SelectBasic options={paymentsOptions} label='Все счета' />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <SelectBasic options={paymentsDetails} label='Списания и поступления' />
      </Grid>
      <Grid item xs={12} sm={6} md={5}>
        <PickersMinMax />
      </Grid>
    </Grid>
  )
}

export default TableHeader
