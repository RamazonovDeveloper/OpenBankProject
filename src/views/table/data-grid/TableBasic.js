// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { DataGrid } from '@mui/x-data-grid'
import CardHeader from '@mui/material/CardHeader'

// ** Data Import
// import { rows } from 'src/@fake-db/table/static-data'
import ServerSideToolbar from 'src/views/table/data-grid/ServerSideToolbar'

const TableBasic = props => {
  console.log('TableBasic props ', props)

  return (
    <Card>
      <Box sx={{ height: 700 }}>
        <DataGrid {...props} onRowClick={props.reloadAccount} />
      </Box>
    </Card>
  )
}

export default TableBasic
