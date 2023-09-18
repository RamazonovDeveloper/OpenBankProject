import { Card, CardContent } from '@mui/material'
import React from 'react'
import { Typography } from '@mui/material'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TableCell from '@mui/material/TableCell'
import { styled, useTheme } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TakeCreditPayments from '../../../preview/takeCreditItem/TakeCreditPayments'

export default function WorkingCapital() {
  const MUITableCell = styled(TableCell)(({ theme }) => ({
    borderBottom: 0,
    padding: `${theme.spacing(1, 0)} !important`
  }))

  return (
    <div>
      <Typography variant='h6'>Пополнение оборотных средств</Typography>
      <Card style={{ marginTop: '10px', marginBottom: '10px' }}>
        <CardContent>
          <ul style={{ listStyle: 'circle' }}>
            <li>
              <span
                style={{
                  width: '10px',
                  height: '10px',
                  display: 'inline-block',
                  backgroundColor: '#4E0F8A',
                  borderRadius: '50%',
                  marginRight: '10px'
                }}
              ></span>
              Валюта - UZS
            </li>
            <li>
              <span
                style={{
                  width: '10px',
                  height: '10px',
                  display: 'inline-block',
                  backgroundColor: '#4E0F8A',
                  borderRadius: '50%',
                  marginRight: '10px'
                }}
              ></span>
              Срок кредита - до 3 лет (Льготный период на основной долг - 6 месяцев)
            </li>
            <li>
              <span
                style={{
                  width: '10px',
                  height: '10px',
                  display: 'inline-block',
                  backgroundColor: '#4E0F8A',
                  borderRadius: '50%',
                  marginRight: '10px'
                }}
              ></span>
              Процентная ставка - 26%
            </li>
          </ul>
        </CardContent>
      </Card>
      <Typography variant='h6'>Условия кредита</Typography>
      <Card style={{ marginTop: '10px', marginBottom: '10px' }}>
        <CardContent>
          <Grid container>
            <Grid item md={8} sm={9} xs={12} sx={{ mb: { sm: 0, xs: 4 } }}>
              <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
                <Table>
                  <TableBody>
                    <Typography variant='h6'>Пополнение оборотных средств</Typography>
                    <TableRow>
                      <MUITableCell>
                        <Typography variant='body2'>Ставка</Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography variant='body2'>Сумма кредита</Typography>
                      </MUITableCell>
                    </TableRow>
                    <TableRow>
                      <MUITableCell>
                        <Typography variant='h6'>26%</Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography variant='h6'> от 15 млн сумов до 300 млн сумов </Typography>
                      </MUITableCell>
                    </TableRow>
                    <TableRow>
                      <MUITableCell>
                        <Typography variant='body2'>Срок кредита</Typography>
                      </MUITableCell>
                    </TableRow>
                    <TableRow>
                      <MUITableCell>
                        <Typography variant='h6'>36 месяцев</Typography>
                      </MUITableCell>
                    </TableRow>
                    <TableRow>
                      <MUITableCell>
                        <Typography variant='body2'>Тип платежа</Typography>
                      </MUITableCell>
                    </TableRow>
                    <TableRow>
                      <MUITableCell>
                        <Typography variant='h6'>Аннуитентный</Typography>
                      </MUITableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Button variant='contained' size='large'>
        Отправить заявку
      </Button>

      {/* <TakeCreditPayments/> */}
    </div>
  )
}
