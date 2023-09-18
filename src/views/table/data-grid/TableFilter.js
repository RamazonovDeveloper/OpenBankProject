// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { DataGrid } from '@mui/x-data-grid'
import CardHeader from '@mui/material/CardHeader'

// ** Data Import
// import { rows } from 'src/@fake-db/table/static-data'
import ServerSideToolbar from 'src/views/table/data-grid/ServerSideToolbar'

const TableFilter = props => {
  console.log('TableFilter props ', props)

  return (
    <Card>
      <Box sx={{ height: 700 }}>
        <DataGrid
          {...props}
          sx={{ cursor: 'pointer' }}
          onRowClick={props.handleClick}
          localeText={{
            toolbarExport: 'Скачать'
          }}
          getRowHeight={() => 'auto'}
          components={{ Toolbar: ServerSideToolbar }}
          componentsProps={{
            toolbar: {
              ...props,
              baseButton: {
                size: 'medium',
                variant: 'outlined'
              }
            }
          }}
        />
      </Box>
    </Card>
  )
}

export default TableFilter
