// ** MUI Imports
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Icon from 'src/@core/components/icon'

import MainTabs from 'src/views/apps/additem/MainTabs'
import AddItemHeader from 'src/views/apps/additem/AddItemHeader'

const AddItem = () => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <AddItemHeader />
      </Grid>
      <Grid item xs={12}>
        <MainTabs />
      </Grid>
    </Grid>
  )
}

export default AddItem
