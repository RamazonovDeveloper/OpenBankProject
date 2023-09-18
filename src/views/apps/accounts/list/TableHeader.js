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
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import CustomInput from '../../../forms/form-elements/pickers/PickersCustomInput'
import "react-datepicker/dist/react-datepicker.css";
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'

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
          <FormControl sx={{ mb: 2, mr: 3, width: 300 }}>
            <InputLabel id='plan-select'>Все счета</InputLabel>
            <Select
              size='medium'
              value={plan}
              id='select-plan'
              label='Все счета'
              labelId='plan-select'
              onChange={handlePlanChange}
              autoWidth
              inputProps={{ placeholder: 'Все счета' }}
            >
              <MenuItem value=''>Все счета</MenuItem>
              <MenuItem value='Рублёвые платежи'>Рублёвые платежи</MenuItem>
              <MenuItem value='Валютные платежи'>Валютные платежи</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ mb: 2, mr: 3, width: 150 }}>
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
          <FormControl sx={{ mb: 2, mr: 3, width: 150 }}>
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
        <Box>
          <FormControl>
            <Input
              id="input-with-icon-adornment"
              startAdornment={
                <IconButton color='inherit' sx={{ ml: -2.75 }} >
                  <Icon icon='ic:baseline-search' />
                </IconButton>
              }
            />
          </FormControl>
        </Box>
    </Box>
  )
}

export default TableHeader
