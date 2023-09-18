import React, { useState } from 'react'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Tab } from '@mui/material'
import EmployeeTable from 'src/views/apps/my_employees/employees/EmployeeTable'
import EmployeeForm from 'src/views/apps/my_employees/employees/EmployeeForm'
import AddEmployeeForm from 'src/views/apps/my_employees/addEmployee/AddEmployeeForm'

function MyEmployees() {
  const [value, setValue] = useState('1')
  const [editable, setEditable] = useState(false)
  console.log('editable => ', editable)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Grid item xs={12}>
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
                <Tab className={value == 1 ? 'active_tab tab_item' : 'tab_item'} label='Сотрудники' value='1' />
                <Tab
                  className={value == 2 ? 'active_tab tab_item' : 'tab_item'}
                  label='Добавить сотрудника'
                  value='2'
                />
              </TabList>
            </Card>
            <Box className='my_tab_list_tabcontext'></Box>
          </Box>

          <TabPanel className='transaction_tab_panel' value='1'>
            <Box sx={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
              <EmployeeTable setEditable={setEditable} />
              {editable && <EmployeeForm setEditable={setEditable} editable={editable} />}
            </Box>
          </TabPanel>
          <TabPanel className='account_tab_panel' sx={{ width: '80%' }} value='2'>
            <Box sx={{ width: '50%' }}>
              <AddEmployeeForm />
            </Box>
          </TabPanel>
        </TabContext>
      </Box>
    </Grid>
  )
}

export default MyEmployees
