import { useEffect, useState } from 'react'

// import Preview from 'src/views/apps/payments/preview/Preview'
// import { useCompany } from 'src/hooks/useCompany'
// import PaymentRepository, { baseUrl } from 'src/repositories/PaymentRepository'
// import usePayment from 'src/hooks/usePayment'
// import useEimzo from 'src/hooks/useEimzo'
// import EIMZO from 'src/lib/Eimzo'
import Box from '@mui/material/Box'

// import { useRouter } from 'next/router'
import { Card, CardContent, FormControl, Grid, MenuItem, Select, Tab, Tabs, Typography } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import MyTable from 'src/views/table/MyTable'
import TransactionAddTab1Components from 'src/views/apps/transaction/addItem/Tab1Components'

// import MyTable from 'src/views/table/MyTable'

const columns = [
  { field: 'thisIsVector', headerName: 'Название шаблона', minWidth: 20 },
  { field: 'thisIsVector', headerName: 'Контрагент', minWidth: 20 },
  { field: 'thisIsVector', headerName: 'Сумма', minWidth: 20 },
  { field: 'thisIsVector', headerName: 'Назначение платежа', minWidth: 20 },
  {
    field: 'sent_date',
    headerName: 'Дата',
    minWidth: 140,
    renderCell: params => {
      return (
        <Box>
          <Typography variant='body2' gutterBottom>
            {params.row.sent_date.slice(0, 10)}
          </Typography>
        </Box>
      )
    }
  }
]

const InvoiceAddItem = () => {
  const [value, setValue] = useState('2')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const [age, setAge] = useState('')

  const handleSelectChange = event => {
    setAge(event.target.value)
  }

  const [secondValue, setSecondValue] = useState('1')

  const handleSecondChange = (event, newValue) => {
    setSecondValue(newValue)
  }

  return (
    <>
      <Grid>
        <Grid item sx={{ width: '100%' }} xs={12}>
          <Box>
            <TabContext value={value}>
              <Box className='my_tab_list_tabcontext'>
                <Card className='my_tab_list_accounts_page'>
                  <TabList
                    className=''
                    onChange={handleChange}
                    aria-label='lab API tabs example'
                    textColor='secondary'
                    indicatorColor='secondary'
                  >
                    <Tab
                      className={value == 1 ? 'active_tab tab_item' : 'tab_item'}
                      label='Платеж контрагенту'
                      value='1'
                    />
                    <Tab
                      className={value == 2 ? 'active_tab tab_item' : 'tab_item'}
                      label='Платеж казначейству'
                      value='2'
                    />
                    <Tab className={value == 3 ? 'active_tab tab_item' : 'tab_item'} label='Шаблоны' value='3' />
                  </TabList>
                </Card>
              </Box>

              <TabPanel className='transaction_tab_panel' value='1'>
                <TransactionAddTab1Components />
                {/* <Box sx={{display:"grid", gridTemplateColumns:"2fr 1fr", gap:"20px", backgroundColor:"transparent"}}>
                                <Card>
                                    <Box className=''>
                                        <Box sx={{padding:'20px', display:"grid", gridTemplateColumns:"1fr 1fr", columnGap:"20px", rowGap:"5px"}}>
                                            <Box>
                                                <Typography sx={{mb:'8px', fontSize:"17px"}}>
                                                    Валюта
                                                </Typography>
                                                <FormControl sx={{ minWidth: 120, width:"100%" }}>
                                                    <Select
                                                        value={age}
                                                        onChange={handleSelectChange}
                                                        displayEmpty
                                                        inputProps={{ 'aria-label': 'Without label' }}
                                                        sx={{ backgroundColor:"#EEEEEE", height:"55px"}}
                                                    >
                                                        <MenuItem value="">UZS</MenuItem>
                                                        <MenuItem value={10}>USD</MenuItem>
                                                        <MenuItem value={20}>RUB</MenuItem>
                                                        <MenuItem value={30}>EURO</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Box>
                                            <Box>
                                                <Typography sx={{mb:'8px', fontSize:"17px"}}>
                                                Счет
                                                </Typography>
                                                <FormControl sx={{ minWidth: 120, width:"100%" }}>
                                                <Select
                                                    value={age}
                                                    onChange={handleSelectChange}
                                                    displayEmpty
                                                    inputProps={{ 'aria-label': 'Without label' }}
                                                    sx={{ backgroundColor:"#EEEEEE", height:"55px" }}
                                                >
                                                    <MenuItem value="">
                                                    <em>None</em>
                                                    </MenuItem>
                                                    <MenuItem value={10}>Ten</MenuItem>
                                                    <MenuItem value={20}>Twenty</MenuItem>
                                                    <MenuItem value={30}>Thirty</MenuItem>
                                                </Select>
                                                </FormControl>
                                            </Box>
                                            <Box>
                                                <Typography sx={{mb:'8px', fontSize:"17px"}}>
                                                Сумма платежа
                                                </Typography>
                                                <Box className='myInput' sx={{display:"flex", justifyContent:"space-between", height:"55px"}}>
                                                    <input type="text" className='' style={{border:"none", background:"transparent", padding:"0px"}} defaultValue={'00.00'}/>
                                                    <Typography>UZS</Typography>
                                                </Box>
                                            </Box>
                                            <Box>
                                                <Typography sx={{mb:'8px', fontSize:"17px"}}>
                                                Дата платежа
                                                </Typography>
                                                <input className='myInput' style={{width:"100%", height:"55px"}} type='date'/>
                                            </Box>
                                        </Box>
                                        <Typography sx={{marginLeft:"20px", color:"#342C2C", fontWeight:'600', fontSize:'17px'}}>Информация о получателе</Typography>
                                        <Box sx={{padding:'20px',paddingTop:"8px",  display:"grid", gridTemplateColumns:"1fr 1fr", columnGap:"20px", rowGap:"5px"}}>
                                            <Box>
                                                <Typography sx={{mb:'8px', fontSize:"17px"}}>
                                                ИНН получателя
                                                </Typography>
                                                <input className='myInput' style={{width:"100%", height:"55px"}} type='text'/>
                                            </Box>
                                            <Box>
                                                <Typography sx={{mb:'8px', fontSize:"17px"}}>
                                                Наименование получателя
                                                </Typography>
                                                <input className='myInput' style={{width:"100%", height:"55px"}} type='text'/>
                                            </Box>
                                            <Box>
                                                <Typography sx={{mb:'8px', fontSize:"17px"}}>
                                                Счет получателя
                                                </Typography>
                                                <input className='myInput' style={{width:"100%", height:"55px"}} type='text'/>
                                            </Box>
                                            <Box>
                                                <Typography sx={{mb:'8px', fontSize:"17px"}}>
                                                МФО банка
                                                </Typography>
                                                <Box className='myInput' sx={{display:"flex", justifyContent:"space-between", height:"55px"}}>
                                                    <input type="text" className='' style={{border:"none", background:"transparent", padding:"0px"}} placeholder='Начните вводить номер'/>
                                                    <img src="/images/Vector.png" alt="" />
                                                </Box>
                                            </Box>
                                        </Box>
                                        <Typography sx={{marginLeft:"20px", color:"#342C2C", fontWeight:'600', fontSize:'17px'}}>Детали платежа</Typography>
                                        <Box sx={{padding:'20px',paddingTop:"8px",  display:"grid", gridTemplateColumns:"1fr 1fr", columnGap:"20px", rowGap:"5px"}}>
                                            <Box>
                                                <Typography sx={{mb:'8px', fontSize:"17px"}}>
                                                Код назначения
                                                </Typography>
                                                <Box className='myInput' sx={{display:"flex", justifyContent:"space-between", height:"55px"}}>
                                                    <input type="text" className='' style={{border:"none", background:"transparent", padding:"0px"}} placeholder='Начните вводить код'/>
                                                    <img src="/images/Vector.png" alt="" />
                                                </Box>
                                            </Box>
                                            <Box>
                                                <Typography sx={{mb:'8px', fontSize:"17px"}}>
                                                Назначение платежа
                                                </Typography>
                                                <input className='myInput' style={{width:"100%"}} type='text'/>
                                            </Box>
                                        </Box>

                                        <Box sx={{display:'flex', padding:"20px", justifyContent:"space-between"}}>
                                            <button className='main_btn gray_btn' style={{margin:"0"}}>
                                                Сохранить шаблон
                                                    <img style={{marginLeft:"15px"}} src="/images/document.png" alt="" />
                                            </button>
                                            <Box sx={{display:"flex"}}>
                                                <button className='main_btn gray_btn' style={{marginRight:"20px"}}>
                                                    Смотреть документ
                                                <img style={{marginLeft:"15px"}} src="/images/shablon.png" alt="" />
                                                </button>
                                                <button className='main_btn'>
                                                    Смотреть документ
                                                </button>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Card>
                                <Box sx={{ width: '100%', typography: 'body1'}}>
                                    <Card sx={{padding:"20px"}}>
                                        <TabContext value={secondValue}>
                                            <Box sx={{display:'flex', justifyContent:"space-between"}}>
                                                <Typography sx={{color:"#342C2C", fontSize:"22px",fontWeight:"600", height:"fit-content", mt:"auto", mb:"auto"}}>
                                                    Платежи
                                                </Typography>
                                                <TabList onChange={handleSecondChange} aria-label="lab API tabs example">
                                                    
                                                    <Tab className={secondValue == 1 ? 'tab_without_border_active tab_without_border' : "tab_without_border"}  label="Сегодня" value="1" />
                                                    <Tab className={secondValue == 2 ? 'tab_without_border_active tab_without_border' : "tab_without_border"} label="Неделя" value="2" />
                                                    <Tab className={secondValue == 3 ? 'tab_without_border_active tab_without_border' : "tab_without_border"} label="Месяц" value="3" />
                                                </TabList>
                                            </Box>
                                            <TabPanel sx={{padding:"0"}} value="1">
                                                <Typography className='header_title' sx={{mt:'20px', mb:'12px'}}>
                                                    14 июня, ср
                                                </Typography>

                                                <Box sx={{borderBottom:"2px solid #F4F3F3", mb:"12px", pb:"10px"}}>
                                                    <Box sx={{display:"flex", justifyContent:"space-between", alignItems:"center", mb:"5px"}}>
                                                        <Typography>15:38</Typography>
                                                        <Typography>Сумма</Typography>
                                                    </Box>
                                                    <Box sx={{display:"flex", justifyContent:"space-between", alignItems:"center", mb:"5px"}}>
                                                        <Typography>Прочие списания</Typography>
                                                        <Typography>10 000 000 000,00 UZS</Typography>
                                                    </Box>
                                                    <Box sx={{display:"flex", justifyContent:"space-between", alignItems:"center", mb:"5px"}}>
                                                        <Typography>Отправитель (наименование компании)</Typography>
                                                    </Box>
                                                    <Box sx={{display:"flex", justifyContent:"space-between", alignItems:"center", mb:"5px"}}>
                                                        <Typography>Статус</Typography>
                                                        <Typography><span style={{display:"inline-block",borderRadius:"50%",  width:"10px", height:"10px", backgroundColor:"#1AB759", }}></span> Проведен</Typography>
                                                    </Box>
                                                </Box>
                                                <Box sx={{borderBottom:"2px solid #F4F3F3", mb:"12px", pb:"10px"}}>
                                                    <Box sx={{display:"flex", justifyContent:"space-between", alignItems:"center", mb:"5px"}}>
                                                        <Typography>15:38</Typography>
                                                        <Typography>Сумма</Typography>
                                                    </Box>
                                                    <Box sx={{display:"flex", justifyContent:"space-between", alignItems:"center", mb:"5px"}}>
                                                        <Typography>Прочие списания</Typography>
                                                        <Typography>10 000 000 000,00 UZS</Typography>
                                                    </Box>
                                                    <Box sx={{display:"flex", justifyContent:"space-between", alignItems:"center", mb:"5px"}}>
                                                        <Typography>Отправитель (наименование компании)</Typography>
                                                    </Box>
                                                    <Box sx={{display:"flex", justifyContent:"space-between", alignItems:"center", mb:"5px"}}>
                                                        <Typography>Статус</Typography>
                                                        <Typography><span style={{display:"inline-block",borderRadius:"50%",  width:"10px", height:"10px", backgroundColor:"#1AB759", }}></span> Проведен</Typography>
                                                    </Box>
                                                </Box>
                                            </TabPanel>
                                            <TabPanel value="2">Item Two</TabPanel>
                                            <TabPanel value="3">Item Three</TabPanel>
                                        </TabContext>
                                    </Card>
                                </Box>
                            </Box> */}
              </TabPanel>

              <TabPanel className='transaction_tab_panel' value='2'>
                <TransactionAddTab1Components />
              </TabPanel>

              <TabPanel className='account_tab_panel' value='3'>
                <Box sx={{ padding: '20px' }}>
                  <Box
                    className='myInput'
                    sx={{ display: 'flex', justifyContent: 'space-between', height: '55px', width: '30%' }}
                  >
                    <input
                      type='text'
                      className=''
                      style={{ border: 'none', background: 'transparent', padding: '0px' }}
                      placeholder='Поиск шаблона'
                    />
                    <img src='/images/Vector.png' alt='' />
                  </Box>
                  <Box>{/* <MyTable /> */}</Box>
                </Box>
              </TabPanel>
            </TabContext>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default InvoiceAddItem
