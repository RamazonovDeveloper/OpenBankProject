import React from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import Divider from '@mui/material/Divider'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'
import TableContainer from '@mui/material/TableContainer'
import TableCell from '@mui/material/TableCell'


function TakeCreditAbout() {

    const MUITableCell = styled(TableCell)(({ theme }) => ({
        borderBottom: 0,
        padding: `${theme.spacing(1, 0)} !important`
      }))

  return (
    <div>
      <Card>
        <CardContent>
          <Grid container>
            <Grid item md={8} sm={9} xs={12} sx={{ mb: { sm: 0, xs: 4 } }}>
              <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
                <Table>
                  <TableBody>
                    <Typography variant='h5'>Ближайший платеж</Typography>
                    <TableRow>
                      <MUITableCell>
                        <Typography variant='body2'>Ближайший платеж</Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography variant='h6'>100 000.00 UZS - 25.04.2023 </Typography>
                      </MUITableCell>
                    </TableRow>
                    <TableRow>
                      <MUITableCell>
                        <Typography variant='body2'>Основной долг</Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography variant='h6'>80 000.00 UZS</Typography>
                      </MUITableCell>
                    </TableRow>
                    <TableRow>
                      <MUITableCell>
                        <Typography variant='body2'>Проценты</Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography variant='h6'>20 000.00 UZS</Typography>
                      </MUITableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Grid>
            {/* <Grid item md={12} sm={12} xs={12}>
            </Grid> */}
          </Grid>
        </CardContent>

        <Divider
          sx={{ mt: theme => `${theme.spacing(6.5)} !important`, mb: theme => `${theme.spacing(5.5)} !important` }}
        />

        <CardContent>
          <Grid container>
            <Grid item md={8} sm={9} xs={12} sx={{ mb: { sm: 0, xs: 4 } }}>
              <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
                <Table>
                  <TableBody>
                    <Typography variant='h5'>Данные о кредите</Typography>
                    <TableRow>
                      <MUITableCell>
                        <Typography variant='body2'>Ближайший платеж</Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography variant='h6'>100 000.00 UZS - 25.04.2023 </Typography>
                      </MUITableCell>
                    </TableRow>
                    <TableRow>
                      <MUITableCell>
                        <Typography variant='body2'>Основной долг</Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography variant='h6'>80 000.00 UZS</Typography>
                      </MUITableCell>
                    </TableRow>
                    <TableRow>
                      <MUITableCell>
                        <Typography variant='body2'>Проценты</Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography variant='h6'>20 000.00 UZS</Typography>
                      </MUITableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Grid>
            {/* <Grid item md={12} sm={12} xs={12}>
            </Grid> */}
          </Grid>
        </CardContent>

      </Card>
    </div>
  )
}

export default TakeCreditAbout
