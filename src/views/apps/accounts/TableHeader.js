import React from 'react'
import Grid from '@mui/material/Grid'

import PickersMinMax from 'src/views/forms/form-elements/pickers/PickersMinMax'
import SelectBasic from 'src/views/forms/form-elements/select/SelectBasic'
import InputIconButtonOutLined from 'src/views/forms/form-elements/input/InputIconButtonOutLined'

const accountOptions = [
  {
    value: 'Все счета',
    label: 'Все счета'
  },
  {
    value: 'Суммовые платежи',
    label: 'Суммовые платежи'
  },
  {
    value: 'Суммовые поступления',
    label: 'Суммовые поступления'
  },
  {
    value: 'Валютные платежи',
    label: 'Валютные платежи'
  },
  {
    value: 'Валютные поступления',
    label: 'Валютные поступления'
  }
]

const TableHeader = () => {
  return (
    <Grid container spacing={6} sx={{ justifyContent: 'space-between', alignItems: 'center', p: 3 }}>
      <Grid item xs={12} sm={6} md={3}>
        <SelectBasic options={accountOptions} label='Все счета' />
      </Grid>
      <Grid item xs={12} sm={6} md={5}>
        <PickersMinMax />
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <InputIconButtonOutLined />
      </Grid>
    </Grid>
  )
}

export default TableHeader
