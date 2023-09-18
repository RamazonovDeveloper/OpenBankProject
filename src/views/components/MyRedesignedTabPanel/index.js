import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Card, Tab, Typography } from '@mui/material'
import React, { useState } from 'react'

function MyRedesignedTabPanel(props) {
  const [value, setValue] = useState(props.tabProps.defaultIndex)

  const getKey = item => {
    return Object.keys(item)
  }

  const getValue = item => {
    return Object.values(item)
  }

  const handleChange = (event, newValue) => {
    props.setType(newValue)
  }

  return (
    <Box>
      <TabContext value={props.type}>
        {/* <Box className='my_tab_list_tabcontext'>
          <Card className='my_tab_list_accounts_page'>
            <TabList
              className=''
              onChange={handleChange}
              aria-label='lab API tabs example'
              textColor='secondary'
              indicatorColor='secondary'
              TabIndicatorProps={{ style: { background: 'transparent' } }}
            >
              {props.tabProps.tabNames?.map((item, index) => {
                return (
                  <Tab
                    key={index}
                    className={props.type == getKey(item) ? 'active_tab tab_item' : 'tab_item'}
                    label={getValue(item)}
                    value={parseInt(getKey(item))}
                  />
                )
              })}
            </TabList>
          </Card>
          <Box className='my_tab_list_tabcontext'>{props.buttonProps}</Box>
        </Box> */}

        {props.tabProps.tabItems?.map((item, index) => {
          return (
            <TabPanel key={index} className='account_tab_panel' value={parseInt(getKey(item))}>
              {getValue(item)}
            </TabPanel>
          )
        })}
      </TabContext>
    </Box>
  )
}

export default MyRedesignedTabPanel
