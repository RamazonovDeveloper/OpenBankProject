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
import addDays from 'date-fns/addDays'
import DatePicker from 'react-datepicker'
import { Controller, useForm } from 'react-hook-form'


function TransactionAddTab3Components() {

  const [account, setAccount] = useState('0')

  const handleSelectChange = props => {
    setAccount(props.target.value)
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
            <Typography sx={{ mb: '8px', fontSize: '17px' }}>Название шаблона</Typography>
            <FormControl sx={{ minWidth: 120, width: '100%' }}>
              <Select
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                sx={{ backgroundColor: '#EEEEEE', height: '55px' }}
                // onChange={value => {
                //   setDocType(value.target.value)
                // }}
              >
                <MenuItem value={2}>Платеж контрагенту</MenuItem>
                <MenuItem value={1}>Платеж казначейству</MenuItem>
                <MenuItem value={3}>Платеж в бюджет</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box>
            <Typography sx={{ mb: '8px', fontSize: '17px' }}>Валюта</Typography>
            <FormControl sx={{ minWidth: 120, width: '100%' }}>
              <Select
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                sx={{ backgroundColor: '#EEEEEE', height: '55px' }}
                // onChange={value => {
                //   setDocType(value.target.value)
                // }}
              >
                <MenuItem value={2}>Платеж контрагенту</MenuItem>
                <MenuItem value={1}>Платеж казначейству</MenuItem>
                <MenuItem value={3}>Платеж в бюджет</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
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
            <Typography sx={{ mb: '8px', fontSize: '17px' }}>Счет</Typography>
            <FormControl sx={{ minWidth: 120, width: '100%' }}>
            <Select
              value={account}
              onChange={handleSelectChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              sx={{ backgroundColor: '#EEEEEE', width: '100%',  paddingTop: '0!important', paddingBottom: '0!important' }}
              className='my_menu_select'
            >
              <MenuItem className='myMenuItem' sx={{ paddingTop: '0', paddingBottom: '0' }} value='0'>
                <div>
                  <p style={{ margin: '0', color: 'black' }}>АКБ “Agrobank”</p>
                  <p style={{ margin: '0', color: 'black' }}>20208000305118352202</p>
                </div>
              </MenuItem>
              <MenuItem className='myMenuItem' value={10}>
                <div>
                  <p style={{ margin: '0', color: 'black' }}>АКБ “Agrobank”</p>
                  <p style={{ margin: '0', color: 'black' }}>20208000305118352992</p>
                </div>
              </MenuItem>
              <MenuItem className='myMenuItem' value={20}>
                <div>
                  <p style={{ margin: '0', color: 'black' }}>АКБ “Agrobank”</p>
                  <p style={{ margin: '0', color: 'black' }}>20208000305118352002</p>
                </div>
              </MenuItem>
            </Select>
            </FormControl>
          </Box>

          <Box>
            <Typography sx={{ mb: '8px', fontSize: '17px' }}>Сумма платежа</Typography>
            <FormControl sx={{ minWidth: 120, width: '100%' }}>
              <Select
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                sx={{ backgroundColor: '#EEEEEE', height: '55px' }}
                // onChange={value => {
                //   setDocType(value.target.value)
                // }}
                defaultValue={1}
              >
                <MenuItem value={2}>Платеж контрагенту</MenuItem>
                <MenuItem value={1}>Платеж казначейству</MenuItem>
                <MenuItem value={3}>Платеж в бюджет</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        <Typography sx={{marginLeft:'20px', fontSize: '22px', color:'#342C2C', fontWeight:'500'}}>Информация о получателе </Typography>

          
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
            <Typography sx={{ mb: '8px', fontSize: '17px' }}>ИНН получателя</Typography>
            <input type="text" className='myInput' style={{width: '100%'}} />

          </Box>

          <Box>
            <Typography sx={{ mb: '8px', fontSize: '17px' }}>Наименование получателя</Typography>
            <input type="text" className='myInput' style={{width: '100%'}} />
          </Box>
        </Box>

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
            <Typography sx={{ mb: '8px', fontSize: '17px' }}>Счет получателя</Typography>
            <input type="text" className='myInput' style={{width: '100%'}} />
          </Box>

          <Box>
            <Typography sx={{ mb: '8px', fontSize: '17px' }}>МФО банка</Typography>
            <Box sx={{position: 'relative'}}>
              <input name='mfo' type="text" className='myInput' style={{width: '100%'}} />
              <label htmlFor='mfo' style={{position: 'absolute', top: '30%', right: '20px', cursor: 'pointer'}}>
                <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.07992 0.939941C4.57805 0.939941 0.919922 4.59807 0.919922 9.09994C0.919922 13.6018 4.57805 17.2599 9.07992 17.2599C10.8612 17.2599 12.5074 16.6862 13.8499 15.7149L20.1649 22.0149L21.5149 20.6649L15.2749 14.4099C16.5012 12.9812 17.2399 11.1268 17.2399 9.09994C17.2399 4.59807 13.5818 0.939941 9.07992 0.939941ZM9.07992 1.89994C13.0624 1.89994 16.2799 5.11744 16.2799 9.09994C16.2799 13.0824 13.0624 16.2999 9.07992 16.2999C5.09742 16.2999 1.87992 13.0824 1.87992 9.09994C1.87992 5.11744 5.09742 1.89994 9.07992 1.89994Z" fill="#342C2C"/>
                </svg>
              </label>

            </Box>
            {/* <FormControl sx={{ minWidth: 120, width: '100%' }}>
              <Select
                value={account}
                onChange={handleSelectChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                sx={{ backgroundColor: '#EEEEEE', width: '100%',  paddingTop: '0!important', paddingBottom: '0!important' }}
                className='my_menu_select'
              >
                <MenuItem className='myMenuItem' sx={{ paddingTop: '0', paddingBottom: '0' }} value='0'>
                  <div>
                    <p style={{ margin: '0', color: 'black' }}>00060</p>
                    <p style={{ margin: '0', color: '#777373' }}>ТОШКЕНТ Ш., МАРКАЗИЙ БАНКНИНГ ТОШКЕ...</p>
                  </div>
                </MenuItem>
                <MenuItem className='myMenuItem' value={10}>
                  <div>
                    <p style={{ margin: '0', color: 'black' }}>АКБ “Agrobank”</p>
                    <p style={{ margin: '0', color: 'black' }}>20208000305118352992</p>
                  </div>
                </MenuItem>
                <MenuItem className='myMenuItem' value={20}>
                  <div>
                    <p style={{ margin: '0', color: 'black' }}>АКБ “Agrobank”</p>
                    <p style={{ margin: '0', color: 'black' }}>20208000305118352002</p>
                  </div>
                </MenuItem>
              </Select>
            </FormControl> */}

          </Box>
          

        </Box>

        <Typography sx={{marginLeft:'20px', fontSize: '22px', color:'#342C2C', fontWeight:'500'}}> Детали платежа </Typography>


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
            <Typography sx={{ mb: '8px', fontSize: '17px' }}>Код назначения</Typography>
            <Box sx={{position: 'relative'}}>
              <input name='mfo' type="text" className='myInput' style={{width: '100%'}} />
              <label htmlFor='mfo' style={{position: 'absolute', top: '30%', right: '20px', cursor: 'pointer'}}>
                <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.07992 0.939941C4.57805 0.939941 0.919922 4.59807 0.919922 9.09994C0.919922 13.6018 4.57805 17.2599 9.07992 17.2599C10.8612 17.2599 12.5074 16.6862 13.8499 15.7149L20.1649 22.0149L21.5149 20.6649L15.2749 14.4099C16.5012 12.9812 17.2399 11.1268 17.2399 9.09994C17.2399 4.59807 13.5818 0.939941 9.07992 0.939941ZM9.07992 1.89994C13.0624 1.89994 16.2799 5.11744 16.2799 9.09994C16.2799 13.0824 13.0624 16.2999 9.07992 16.2999C5.09742 16.2999 1.87992 13.0824 1.87992 9.09994C1.87992 5.11744 5.09742 1.89994 9.07992 1.89994Z" fill="#342C2C"/>
                </svg>
              </label>
            </Box>
          </Box>

          <Box>
            <Typography sx={{ mb: '8px', fontSize: '17px' }}>Назначение платежа</Typography>
            <input type="text" className='myInput' style={{width: '100%'}} />
          </Box>
        </Box>

        <Box sx={{ width:'100%', marginTop: '50px', marginBottom: '30px', display: 'grid', gridTemplateColumns: '2fr 1fr'}}>
          <Box sx={{display:'flex', marginLeft: 'auto', marginRight:'20px'}}>
            <button style={{display: 'flex', alignItems: 'center'}} className='main_btn gray_btn'>
              <p style={{margin: '0', marginLeft: '10px'}}>Удалить шаблон </p>
            <svg width="30" height="33" viewBox="0 0 30 33" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_506_5263)" filter="url(#filter0_d_506_5263)">
            <path d="M13.0795 0.5C12.2901 0.5 11.6395 1.15063 11.6395 1.94V2.42H7.64945C7.06258 2.42 6.66883 2.84937 6.46445 3.38H6.40445C5.32445 3.38 4.43945 4.27625 4.43945 5.39V5.78C4.43945 6.04437 4.65508 6.26 4.91945 6.26H5.45945L7.90445 22.94C8.03383 23.8456 8.81945 24.5 9.71945 24.5H20.2795C21.1795 24.5 21.9107 23.8306 22.0945 22.97C22.0945 22.9606 22.0945 22.9494 22.0945 22.94L24.5395 6.26H25.0795C25.3438 6.26 25.5595 6.04437 25.5595 5.78V5.39C25.5595 4.27625 24.6745 3.38 23.5945 3.38H23.5345C23.3301 2.84937 22.9363 2.42 22.3495 2.42H18.3595V1.94C18.3595 1.15063 17.7088 0.5 16.9195 0.5H13.0795ZM13.0795 1.46H16.9195C17.1857 1.46 17.3995 1.67375 17.3995 1.94V2.42H12.5995V1.94C12.5995 1.67375 12.8132 1.46 13.0795 1.46ZM7.64945 3.38H22.3495C22.5407 3.38 22.7695 3.59375 22.7695 3.86C22.7695 4.12437 22.9851 4.34 23.2495 4.34H23.5945C24.1138 4.34 24.5207 4.74125 24.5695 5.3H5.42945C5.4782 4.74125 5.88508 4.34 6.40445 4.34H6.74945C7.01383 4.34 7.22945 4.12437 7.22945 3.86C7.22945 3.59375 7.4582 3.38 7.64945 3.38ZM6.43445 6.26H23.5645L21.1495 22.76C21.0463 23.2419 20.722 23.54 20.2795 23.54H9.71945C9.27695 23.54 8.91133 23.2419 8.84945 22.805L6.43445 6.26ZM8.87945 8.315C8.75195 8.33375 8.6357 8.40312 8.5607 8.50625C8.48383 8.61125 8.45383 8.7425 8.47445 8.87L10.0645 20.825C10.0701 21.0087 10.1807 21.1719 10.3495 21.2469C10.5182 21.3219 10.7132 21.2937 10.8538 21.1756C10.9945 21.0556 11.0545 20.8681 11.0095 20.69L9.43445 8.735C9.41945 8.60375 9.35195 8.48562 9.24695 8.405C9.14195 8.32625 9.00883 8.29437 8.87945 8.315ZM12.9145 8.315C12.667 8.3525 12.4907 8.57562 12.5095 8.825L13.0345 20.78C13.0476 21.0444 13.2726 21.2506 13.537 21.2375C13.8013 21.2244 14.0076 20.9994 13.9945 20.735L13.4695 8.78C13.4657 8.65063 13.4095 8.52687 13.3138 8.43875C13.2163 8.3525 13.0888 8.3075 12.9595 8.315C12.9445 8.315 12.9295 8.315 12.9145 8.315ZM16.9345 8.315C16.7038 8.35063 16.5332 8.5475 16.5295 8.78L16.0045 20.735C15.9913 20.9994 16.1976 21.2244 16.462 21.2375C16.7263 21.2506 16.9513 21.0444 16.9645 20.78L17.4895 8.825C17.4988 8.68812 17.4482 8.55312 17.3507 8.45375C17.2513 8.35625 17.1163 8.30562 16.9795 8.315C16.9645 8.315 16.9495 8.315 16.9345 8.315ZM20.9695 8.315C20.7557 8.34687 20.5888 8.51937 20.5645 8.735L18.9895 20.69C18.9445 20.8681 19.0045 21.0556 19.1451 21.1756C19.2857 21.2937 19.4807 21.3219 19.6495 21.2469C19.8182 21.1719 19.9288 21.0087 19.9345 20.825L21.5245 8.87C21.547 8.72563 21.5038 8.5775 21.4045 8.46875C21.3051 8.36 21.1607 8.30375 21.0145 8.315C20.9995 8.315 20.9845 8.315 20.9695 8.315Z" fill="#342C2C"/>
            </g>
            <defs>
            <filter id="filter0_d_506_5263" x="-1" y="0.5" width="32" height="32" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="4"/>
            <feGaussianBlur stdDeviation="2"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_506_5263"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_506_5263" result="shape"/>
            </filter>
            <clipPath id="clip0_506_5263">
            <rect width="24" height="24" fill="white" transform="translate(3 0.5)"/>
            </clipPath>
            </defs>
            </svg>

            </button>
            <button className='main_btn'>Сохранить изменения</button>
          </Box>
        </Box>

      </Card>
      {/* <Box sx={{ width: '504px', typography: 'body1' }}>
        <Card sx={{ padding: '20px' }}>
          <TransactionAddItemTabContext {...paymentProps} />
        </Card>
      </Box> */}

      {/* {statusMessage} */}
    </Box>
  )
}

export default TransactionAddTab3Components
