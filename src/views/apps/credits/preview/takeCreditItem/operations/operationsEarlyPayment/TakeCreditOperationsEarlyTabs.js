import React from 'react'


import { TabContext, TabList, TabPanel } from '@mui/lab'
import { CardContent, Tab } from '@mui/material'
import TableBasic from 'src/views/table/TableBasic'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/router'
import { useState } from 'react'
import EarlyCard from './EarlyCard'


function TakeCreditOperationsEarlyTabs() {
  
  const [value, setValue] = useState('1')
  
  const handleTabsChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <>
    <TabContext value={value}>
      <Typography variant='subtitle1'>Вид погашения</Typography>
          <TabList
            variant='scrollable'
            scrollButtons={false}
            onChange={handleTabsChange}
            sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
          >
            <Tab value='1' label='Частичное' />
            <Tab value='2' label='Полное' />
          </TabList>
          <CardContent>
            <TabPanel value='1'>
              <Typography variant='subtitle1'><EarlyCard/></Typography>
            </TabPanel>

            <TabPanel value='2'>
              <Typography variant='subtitle1'><EarlyCard/></Typography>
            </TabPanel>

          </CardContent>
    </TabContext>
    </>
  )
}

export default TakeCreditOperationsEarlyTabs
