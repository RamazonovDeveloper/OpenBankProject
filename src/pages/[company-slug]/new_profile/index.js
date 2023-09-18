import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Tab } from '@mui/material'
import New_profileTab1 from 'src/views/apps/new_profile/New_profileTab1'
import New_profileTab2 from 'src/views/apps/new_profile/New_profileTab2'
import MyTable from 'src/views/table/MyTable'
import useProfile from 'src/hooks/useProfile'

function NewProfile() {
  const { viewProfile, profile, editProfile } = useProfile()

  const companyInfo = JSON.parse(localStorage.getItem('companyInfo'))
  const [imageFile, setImageFile] = useState(null)

  useEffect(() => {
    viewProfile()
  }, [])
  const [value, setValue] = useState('1')

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
                TabIndicatorProps={{ style: { background: 'transparent' } }}
              >
                <Tab
                  className={value == 1 ? 'active_tab tab_item' : 'tab_item'}
                  label='Персональные данные'
                  value='1'
                />
                <Tab className={value == 2 ? 'active_tab tab_item' : 'tab_item'} label='Настройки' value='2' />
                <Tab className={value == 3 ? 'active_tab tab_item' : 'tab_item'} label='Активные сеансы' value='3' />
              </TabList>
            </Card>
          </Box>

          <TabPanel className='account_tab_panel' sx={{ width: '80%' }} value='1'>
            <Box sx={{ width: '50%' }}>
              <New_profileTab1 profile={profile} editProfile={editProfile} />
            </Box>
          </TabPanel>

          <TabPanel className='account_tab_panel' sx={{ width: '80%' }} value='2'>
            <Box sx={{ width: '50%' }}>
              <New_profileTab2 />
            </Box>
          </TabPanel>

          <TabPanel className='account_tab_panel' sx={{ width: '80%' }} value='3'>
            <Box>
              This is a table
              {/* <MyTable /> */}
            </Box>
          </TabPanel>
        </TabContext>
      </Box>
    </Grid>
  )
}

export default NewProfile
