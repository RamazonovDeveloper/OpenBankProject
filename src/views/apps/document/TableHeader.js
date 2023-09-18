import React from 'react'
import Grid from '@mui/material/Grid'

import PickersMinMax from 'src/views/forms/form-elements/pickers/PickersMinMax'
import SelectBasic from 'src/views/forms/form-elements/select/SelectBasic'

const documentOptions = [
  {
    value: 'Все Документы',
    label: 'Все Документы'
  }
]

const documentDetails = [
  {
    value: 'Списания и Документы',
    label: 'Списания и Документы'
  }
]

const TableHeader = () => {
  return (
    <Grid container spacing={6} sx={{ alignItems: 'center', p: 3 }}>
      <Grid item xs={12} sm={6} md={3}>
        <SelectBasic options={documentOptions} label='Все счета' />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <SelectBasic options={documentDetails} label='Списания и поступления' />
      </Grid>
      <Grid item xs={12} sm={6} md={5}>
        <PickersMinMax />
      </Grid>
    </Grid>
  )
}

export default TableHeader
