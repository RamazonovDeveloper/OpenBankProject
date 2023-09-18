// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'

// ** Third Party Imports
import subDays from 'date-fns/subDays'
import addDays from 'date-fns/addDays'
import DatePicker from 'react-datepicker'

// ** Custom Component Imports
import CustomInput from './PickersCustomInput'

import 'react-datepicker/dist/react-datepicker.css'

function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return [year, month, day].join('-')
}

const PickersMinMax = props => {
  const { setDate_from, setDate_till, data } = props

  // ** States
  const [minDate, setMinDate] = useState(new Date())
  const [maxDate, setMaxDate] = useState(new Date())

  return (
    <Box sx={{ display: 'flex', mb: 4 }} className='demo-space-x'>
      <DatePicker
        id='min-date'
        size='small'
        value={data.date_from}
        maxDate={addDays(new Date(), -1)}
        onChange={date => setDate_from(formatDate(date))}
        customInput={<CustomInput fullWidth size='small' label='От' />}
      />
      <DatePicker
        id='max-date'
        size='small'
        value={data.date_till}
        maxDate={addDays(new Date(), 0)}
        onChange={date => setDate_till(formatDate(date))}
        customInput={<CustomInput fullWidth size='small' label='До' />}
      />
    </Box>
  )
}

export default PickersMinMax
