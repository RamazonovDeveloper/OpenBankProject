// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import DatePicker from 'react-datepicker'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import CustomInput from '../../../forms/form-elements/pickers/PickersCustomInput'
import "react-datepicker/dist/react-datepicker.css";

const TableHeader = props => {
  // ** Props
  const { plan, handlePlanChange, handleFilter, value } = props
  const [minDate, setMinDate] = useState(new Date())
  const [maxDate, setMaxDate] = useState(new Date())
  const [date, setDate] = useState(new Date())
  const [startDate, setStartDate] = useState(new Date());


  return (
    <Box sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <FormControl size='medium' sx={{ mb: 2, mr: 3 }}>
          <InputLabel id='plan-select'>Все</InputLabel>
          <Select
            value={plan}
            id='select-plan'
            label='Все'
            labelId='plan-select'
            onChange={handlePlanChange}
            autoWidth
            inputProps={{ placeholder: 'Все' }}
          >
            <MenuItem value=''>Все</MenuItem>
            <MenuItem value='Рублёвые платежи'>Рублёвые платежи</MenuItem>
            <MenuItem value='Валютные платежи'>Валютные платежи</MenuItem>
          </Select>
        </FormControl>
        <FormControl size='medium' sx={{ mb: 2, mr: 3, width: 250 }}>
          <InputLabel id='plan-select'>Списания и поступления</InputLabel>
          <Select
            value={plan}
            id='select-plan'
            label='Списания и поступления'
            labelId='plan-select'
            onChange={handlePlanChange}
            inputProps={{ placeholder: 'Списания и поступления' }}
          >
            <MenuItem value=''>Списания и поступления</MenuItem>
            <MenuItem value='Списания'>Списания</MenuItem>
            <MenuItem value='Поступления'>Поступления</MenuItem>
          </Select>
        </FormControl>
        <FormControl size='small' sx={{ mb: 2, mr: 3, width: 150 }}>
          <DatePicker
              selected={date}
              id='basic-input'
              size='small'

              // popperPlacement={popperPlacement}
              onChange={date => setDate(date)}
              placeholderText='Click to select a date'
              customInput={<CustomInput label='дд.мм.гггг' />}
            />
        </FormControl>
        <FormControl size='small' sx={{ mb: 2, mr: 3, width: 150 }}>
          <DatePicker
              selected={date}
              id='basic-input'
              size='small'

              // popperPlacement={popperPlacement}
              onChange={date => setDate(date)}
              placeholderText='Click to select a date'
              customInput={<CustomInput label='дд.мм.гггг' />}
            />
        </FormControl>
      </Box>
    </Box>
  )
}

export default TableHeader
