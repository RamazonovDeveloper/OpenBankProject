// ** React Imports
import { useState, Fragment } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import Collapse from '@mui/material/Collapse'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import TableContainer from '@mui/material/TableContainer'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const createData = (name, calories, fat, carbs, protein, price) => {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        date: '2020-01-05',
        customerId: '11091700',
        amount: 3
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
        amount: 1
      }
    ]
  }
}

const Row = props => {
  // ** Props
  const { row } = props

  // ** State
  const [open, setOpen] = useState(false)

  return (
    <Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
            <Icon icon={open ? 'mdi:chevron-up' : 'mdi:chevron-down'} />
          </IconButton>
        </TableCell>
        <TableCell>{row.dealNomer}</TableCell>
        <TableCell>{row.date}</TableCell>
        <TableCell>
          <Typography variant='subtitle2' gutterBottom component='div'>
            {row.contragent[0]}
          </Typography>
          <Typography variant='subtitle2' gutterBottom component='div'>
            {row.contragent[1]}
          </Typography>
        </TableCell>
        <TableCell>{row.bank}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={6} sx={{ py: '0 !important' }}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ m: 2 }}>
              <Typography variant='h6' gutterBottom component='div'>
                Эквайринг истории
              </Typography>
              <Table size='small' aria-label='purchases'>
                {/* <TableHead>
                  <TableRow>
                    <TableCell>Merchant ID</TableCell>
                    <TableCell>Адрес</TableCell>
                    <TableCell align='right'>Время работы</TableCell>
                    <TableCell align='right'>Время тех. обслуживания оборудования</TableCell>
                    <TableCell align='right'>Статус</TableCell>
                    <TableCell align='right'>Тариф онлайн-кассы</TableCell>
                    <TableCell align='right'>Руководитель точки</TableCell>
                    <TableCell align='right'>Телефон руководителя</TableCell>
                    <TableCell align='right'>Эл. почта руководителя</TableCell>
                  </TableRow>
                </TableHead> */}
                <TableBody>
                  <TableRow>
                    <TableCell>Merchant ID</TableCell>
                    <TableCell>{row.id}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Адрес</TableCell>
                    <TableCell>
                      <Typography variant='subtitle2' gutterBottom component='div'>
                        {row.contragent[0]}
                      </Typography>
                      <Typography variant='subtitle2' gutterBottom component='div'>
                        {row.contragent[1]}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Время работы</TableCell>
                    <TableCell>10:00 — 20:00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Время тех. обслуживания оборудования</TableCell>
                    <TableCell>11:00 — 21:00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Статус</TableCell>
                    <TableCell>{row.status}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Тариф онлайн-кассы</TableCell>
                    <TableCell>{row.depositSum}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Руководитель точки</TableCell>
                    <TableCell>{row.date}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Телефон руководителя</TableCell>
                    <TableCell>7912******23</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Эл. почта руководителя</TableCell>
                    <TableCell>Agrobank@mail.com</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  )
}

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
//   createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
//   createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
//   createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5)
// ]

const TableCollapsible = ({ rows }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label='collapsible table'>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>MARCHANT ID</TableCell>
            <TableCell>ДАТА</TableCell>
            <TableCell>НАЗВАНИЕ ТОЧКИ</TableCell>
            <TableCell>БАНК</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableCollapsible
