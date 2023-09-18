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
                              {/* <span style={{ marginLeft: '54px' }}>
                                <svg
                                  width='24'
                                  height='24'
                                  viewBox='0 0 24 24'
                                  fill='none'
                                  xmlns='http://www.w3.org/2000/svg'
                                >
                                  <path
                                    d='M20.5954 1.39502C20.0891 1.39502 19.5829 1.58252 19.2004 1.96502L18.7954 2.35502C18.6979 2.30439 18.5873 2.28939 18.4804 2.31002C18.3885 2.33064 18.306 2.37752 18.2404 2.44502L3.16539 17.52C3.11852 17.5669 3.08289 17.6231 3.06039 17.685L1.47039 21.915C1.40664 22.0894 1.44977 22.2863 1.58289 22.4175C1.71414 22.5506 1.91102 22.5938 2.08539 22.53L6.31539 20.94C6.37726 20.9175 6.43352 20.8819 6.48039 20.835L21.5554 5.76002C21.7166 5.59314 21.7373 5.33439 21.6004 5.14502L21.9904 4.75502C22.7554 3.99002 22.7554 2.73002 21.9904 1.96502C21.6079 1.58252 21.1016 1.39502 20.5954 1.39502ZM20.5954 2.35502C20.8579 2.35502 21.1223 2.44689 21.3154 2.64002C21.7035 3.02814 21.7035 3.69189 21.3154 4.08002L20.9404 4.47002L19.5004 3.03002L19.8754 2.64002C20.0685 2.44689 20.3329 2.35502 20.5954 2.35502ZM18.5704 3.45002L20.5504 5.43002L19.2304 6.73502L17.2654 4.77002L18.5704 3.45002ZM16.5754 5.44502L18.5554 7.42502L6.12039 19.845L5.76039 19.47V18.72C5.76039 18.4556 5.54477 18.24 5.28039 18.24H4.53039L4.15539 17.88L16.5754 5.44502ZM3.67539 18.765L3.97539 19.065C4.06727 19.155 4.19289 19.2038 4.32039 19.2H4.80039V19.68C4.79664 19.8075 4.84539 19.9331 4.93539 20.025L5.23539 20.325L3.40539 21.015L2.98539 20.595L3.67539 18.765Z'
                                    fill='#342C2C'
                                  />
                                </svg>
                              </span> */}
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
