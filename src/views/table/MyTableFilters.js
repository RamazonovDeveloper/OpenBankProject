import { Box, FormControl, MenuItem, Select } from '@mui/material'
import React, { useState } from 'react'

// import Card from '@mui/material/Card'
// import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import DatePicker from 'react-datepicker'
import addDays from 'date-fns/addDays'
import CustomInput from '../../views/forms/form-elements/pickers/PickersCustomInput'

function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return [year, month, day].join('-')
}

function MyTableFilters(props) {
  const {
    accountItems,
    file,
    data,
    setAccount_id,
    setType,
    kontrOptions,
    accOptions,
    setDate_till,
    setDate_from,
    setExport_type,
    downloadFile
  } = props

  const [age, setAge] = useState('')

  const [accountNum, setAccountNum] = useState('0')

  const handleSelectChange = event => {
    setAge(event.target.value)
  }

  const handleKontChange = e => {
    console.log('handleKontChange =======> ', e.target.value)

    // props.setCurrentTabValue(e.target.value)
    setType(e.target.value)
  }

  const handleAccountChange = e => {
    console.log('IIIIIIIIIIIIIIIIIIIIIIII Account has been changed', e.target.value)
    setAccountNum(e.target.value)
    setAccount_id(e.target.value)
  }

  const btnClicked = (e, type) => {
    // e.preventDefault();
    setExport_type(type)
    downloadFile(file)
  }

  return (
    <Box sx={{ p: '20px', display: 'flex', justifyContent: 'space-between' }}>
      <Box sx={{ display: 'flex', gap: '20px' }}>
        <Box>
          <Typography sx={{ mb: '8px' }}>Дата начала</Typography>
          <div className='myFilterInputWrapper'>
            <label style={{display:"flex", width:'200px', justifyContent:"space-between", alignItems:"center"}}>
              <img src="/images/filters_date_icon.png" alt="" name="from"/>
                <DatePicker
                  dateFormat="dd/MM/yyyy"
                  id='min-date'
                  showTimeSelect={false}
                  size='small'
                  placeholderText='гггг-мм-дд'
                  value={data.date_from}
                  maxDate={addDays(new Date(), -1)}
                  onChange={date => setDate_from(formatDate(date))}
                  customInput={<input className='myFilterInput' autocomplete='off' placeholder='ssss' />}
                />
            </label>
          </div>
        </Box>
        <Box>
          <Typography sx={{ mb: '8px' }}>Дата окончания</Typography>
          {/* <DatePicker
            id='max-date'
            size='small'
            value={data.date_till}
            maxDate={addDays(new Date(), 0)}
            onChange={date => setDate_till(formatDate(date))}
            customInput={<input className='myInput' autocomplete='off' />}
          /> */}
          <div className='myFilterInputWrapper'>
            <label style={{display:"flex", width:'200px', justifyContent:"space-between", alignItems:"center"}}>
                <img src="/images/filters_date_icon.png" alt="" />
              
                <DatePicker
                dateFormat="dd/mm/yyyy"
                id='max-date'
                size='small'
                value={data.date_till}
                maxDate={addDays(new Date(), 0)}
                onChange={date => setDate_till(formatDate(date))}
                defaultValue={('2022-04-17')}
                placeholderText='гггг-мм-дд'
                // гггг-мм-дд
                // placeholderText='дд-мм-гггг'
                customInput={<input className='myFilterInput' defaultValue={"dd-mm-yyyy"} autocomplete='off' name='till'/>}
                />
            </label>
          </div>
        </Box>
        <Box>
          <Typography sx={{ mb: '8px' }}>Счет</Typography>
          <FormControl sx={{ minWidth: 120 }}>
            <Select
              value={age}
              onChange={handleSelectChange}
              displayEmpty 
              inputProps={{ 'aria-label': 'Without label' }}
              sx={{ backgroundColor: '#EEEEEE', paddingTop:'0!important', paddingBottom:'0!important'}}
              className='my_menu_select'
            >
              <MenuItem className='myMenuItem' sx={{paddingTop:'0', paddingBottom:'0'}} value=''>
                  <div>
                    <p style={{margin:'0', color:'black'}}>АКБ “Agrobank”</p>
                    <p style={{margin:'0', color:'black'}}>20208000305118352202</p>
                  </div>
              </MenuItem>
              <MenuItem className='myMenuItem' value={10}>
                <div>
                  <p style={{margin:'0', color:'black'}}>АКБ “Agrobank”</p>
                  <p style={{margin:'0', color:'black'}}>20208000305118352992</p>
                </div>
              </MenuItem>
              <MenuItem className='myMenuItem' value={20}>
                <div>
                  <p style={{margin:'0', color:'black'}}>АКБ “Agrobank”</p>
                  <p style={{margin:'0', color:'black'}}>20208000305118352002</p>
                </div>
              </MenuItem>
            </Select>
          </FormControl>
        </Box>

        {props?.needToAccounts && (
          <Box>
            <Typography sx={{ mb: '8px' }}>Счет</Typography>
            <FormControl sx={{ minWidth: 120 }}>
              <Select
                value={accountNum}
                onChange={handleAccountChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                sx={{ backgroundColor: '#EEEEEE' }}
              >
                {accOptions.map((item, index) => {
                  return (
                    <MenuItem value={item.value} key={index}>
                      {item.label}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </Box>
        )}
        <Box>
          <Typography sx={{ mb: '8px' }}>Контрагент</Typography>
          <FormControl sx={{ minWidth: 220 }}>
            <Select
              value={props.type}
              onChange={handleKontChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              sx={{ backgroundColor: '#EEEEEE' }}
            >
              {kontrOptions.map((item, index) => {
                return (
                  <MenuItem value={item.value} key={index}>
                    {item.label}
                  </MenuItem>
                )
              })}
              {/* <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem> */}
            </Select>
            {/* <FormHelperText>Without label</FormHelperText> */}
          </FormControl>
        </Box>
      </Box>
      <Box>
        <Typography sx={{ mb: '8px' }}>Получить выписку</Typography>
        <Box sx={{ display: 'flex' }}>
          <button
            onClick={() => btnClicked('pdf')}
            className='main_btn'
            style={{ textTransform: 'capitalize', textDecoration: 'none', paddingTop: '12px', paddingBottom: '12px' }}
          >
            PDF
            <span>
              <svg width='18' height='25' viewBox='0 0 18 25' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M8.95535 0.964998C8.93473 0.968748 8.9141 0.974373 8.89535 0.979998C8.67223 1.03062 8.51473 1.23125 8.52035 1.46V16.13L5.50535 13.115C5.3891 12.995 5.21848 12.9444 5.05535 12.98C4.87535 13.0119 4.73098 13.1431 4.68035 13.3175C4.62973 13.4937 4.68223 13.6812 4.81535 13.805L8.65535 17.645L9.00035 17.975L9.34535 17.645L13.1854 13.805C13.3766 13.6137 13.3766 13.3062 13.1854 13.115C12.9941 12.9237 12.6866 12.9237 12.4954 13.115L9.48035 16.13V1.46C9.48598 1.32125 9.42973 1.18812 9.33035 1.09437C9.2291 0.998748 9.09223 0.951873 8.95535 0.964998ZM0.360352 8.18V24.5H17.6404V8.18H12.8404C12.6679 8.17812 12.5066 8.26812 12.4185 8.41812C12.3322 8.56812 12.3322 8.75187 12.4185 8.90187C12.5066 9.05187 12.6679 9.14187 12.8404 9.14H16.6804V23.54H1.32035V9.14H5.16035C5.33285 9.14187 5.4941 9.05187 5.58223 8.90187C5.66848 8.75187 5.66848 8.56812 5.58223 8.41812C5.4941 8.26812 5.33285 8.17812 5.16035 8.18H0.360352Z'
                  fill='white'
                />
              </svg>
            </span>
          </button>
          <button
            onClick={() => btnClicked('excel')}
            className='main_btn'
            style={{
              textTransform: 'capitalize',
              textDecoration: 'none',
              marginLeft: '20px',
              paddingTop: '12px',
              paddingBottom: '12px'
            }}
          >
            Excel
            <span>
              <svg width='18' height='25' viewBox='0 0 18 25' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M8.95535 0.964998C8.93473 0.968748 8.9141 0.974373 8.89535 0.979998C8.67223 1.03062 8.51473 1.23125 8.52035 1.46V16.13L5.50535 13.115C5.3891 12.995 5.21848 12.9444 5.05535 12.98C4.87535 13.0119 4.73098 13.1431 4.68035 13.3175C4.62973 13.4937 4.68223 13.6812 4.81535 13.805L8.65535 17.645L9.00035 17.975L9.34535 17.645L13.1854 13.805C13.3766 13.6137 13.3766 13.3062 13.1854 13.115C12.9941 12.9237 12.6866 12.9237 12.4954 13.115L9.48035 16.13V1.46C9.48598 1.32125 9.42973 1.18812 9.33035 1.09437C9.2291 0.998748 9.09223 0.951873 8.95535 0.964998ZM0.360352 8.18V24.5H17.6404V8.18H12.8404C12.6679 8.17812 12.5066 8.26812 12.4185 8.41812C12.3322 8.56812 12.3322 8.75187 12.4185 8.90187C12.5066 9.05187 12.6679 9.14187 12.8404 9.14H16.6804V23.54H1.32035V9.14H5.16035C5.33285 9.14187 5.4941 9.05187 5.58223 8.90187C5.66848 8.75187 5.66848 8.56812 5.58223 8.41812C5.4941 8.26812 5.33285 8.17812 5.16035 8.18H0.360352Z'
                  fill='white'
                />
              </svg>
            </span>
          </button>
        </Box>
      </Box>
    </Box>
  )
}

export default MyTableFilters
