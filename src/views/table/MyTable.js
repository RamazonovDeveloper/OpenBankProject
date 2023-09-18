// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { DataGrid } from '@mui/x-data-grid'
import CardHeader from '@mui/material/CardHeader'
import StatusSign from 'src/views/components/Status/StatusSign'
import TransStatus from 'src/views/components/Status/TransStatus'

// ** Data Import
import {
  CircularProgress,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'

import Paper from '@mui/material/Paper'
import { array } from 'yup'
import HorizontalLinearStepper from '../components/stepper/HorizontalLinearStepper'
import AccountStatus from '../components/Status/AccountStatus'
import AccountStateStatus from '../components/Status/AccountStateStatus'
import DocumentStatus from '../components/Status/DocumentStatus'

const MyTable = ({ rows, columns, handleClick, loading }) => {
  console.log('rows -> ', rows)
  console.log('columns -> ', columns)

  if (loading) {
    return (
      <Box sx={{ display: 'flex', width: '100%', height: '70vh', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    )
  } else if (rows.length == 0) {
    return (
      <Box sx={{ display: 'flex', width: '100%', height: '70vh', alignItems: 'center', justifyContent: 'center' }}>
        <Typography
          sx={{
            mt: '5px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          Нет данных
        </Typography>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '16px'
      }}
    >
      <table className='my_table'>
        <tr className='my_table_header_row'>
          {columns.map((item, index) => {
            return item.field == 'thisIsVector' ? (
              <th key={index} className='my_table_header_row_th white'>
                {''}
              </th>
            ) : (
              <th className='my_table_header_row_th'>{item.headerName}</th>
            )
          })}
        </tr>

        {rows.length > 0 &&
          rows.map((row, index) => (
            <tr key={index} className='my_table_row' onClick={() => handleClick(row)}>
              {columns.map((item, index) =>
                columns[0].field == 'thisIsVector' && index == 0 ? (
                  ''
                ) : (
                  <td
                    className={
                      index == 0
                        ? 'my_table_body_td my_table_body_td_left'
                        : index == columns.length - 1
                        ? 'my_table_body_td my_table_body_td_right'
                        : 'my_table_body_td'
                    }
                  >
                    {(() => {
                      switch (item.field) {
                        case 'type':
                          return item.isFieldTrans ? (
                            row[item.field] === 1 ? (
                              <svg
                                style={{ marginTop: '4px', marginLeft: '15px' }}
                                width='24'
                                height='24'
                                viewBox='0 0 24 24'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                              >
                                <path
                                  d='M5.7002 5.70001H12.3002M5.7002 5.70001V12.3M5.7002 5.70001L18.3002 18.3'
                                  stroke='#D23232'
                                  stroke-width='1.5'
                                  stroke-linecap='round'
                                  stroke-linejoin='round'
                                />
                              </svg>
                            ) : (
                              <svg
                                style={{ marginTop: '4px', marginLeft: '15px' }}
                                width='24'
                                height='24'
                                viewBox='0 0 24 24'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                              >
                                <path
                                  d='M18.3002 18.3H11.7002M18.3002 18.3V11.7M18.3002 18.3L5.7002 5.70001'
                                  stroke='#2DC28D'
                                  stroke-width='1.5'
                                  stroke-linecap='round'
                                  stroke-linejoin='round'
                                />
                              </svg>
                            )
                          ) : (
                            <AccountStatus status={row[item.field]} />
                          )
                        case 'status':
                          return (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <TransStatus status={row[item.field]} />
                            </Box>
                          )
                        case 'state':
                          return <AccountStateStatus status={row[item.field]} />
                        case 'sign_status':
                          return <DocumentStatus status={row[item.field]} />
                        default:
                          return row[item.field]
                      }
                    })()}
                  </td>
                )
              )}
            </tr>
          ))}
      </table>
    </Box>
  )
}

export default MyTable
