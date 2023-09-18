import React from 'react'

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
import { styled } from '@mui/material/styles'
import TableCell from '@mui/material/TableCell'
import { Button, Input, TextField } from '@mui/material'

function EarlyCard() {

    const MUITableCell = styled(TableCell)(({ theme }) => ({
        borderBottom: 0,
        padding: `${theme.spacing(1, 2)} !important`
      }))

  return (
    <>
        <Card >
            <CardContent md={6}>
            <Grid md={6} container>
                <Grid item  sx={{ mb: { sm: 0, xs: 4 } }}>
                <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
                    <Table>
                    <TableBody>
                        <TableRow>
                        <MUITableCell>
                            <Typography variant='body2'>Дата следующего платежа</Typography>
                        </MUITableCell>
                        <MUITableCell>
                            <Typography variant='h6'>30.04.2023</Typography>
                        </MUITableCell>
                        </TableRow>
                        <TableRow style={{marginTop:"20px"}}>
                            <MUITableCell>
                                <Typography variant='body2'>Дата досрочного погашения</Typography>
                            </MUITableCell>
                            <MUITableCell>
                                <Typography variant='h6'><TextField color="secondary" focused /></Typography>
                            </MUITableCell>
                        </TableRow>
                        <TableRow style={{marginTop:"20px"}}>
                            <MUITableCell>
                                <Typography variant='body2'>Сумма платежа</Typography>
                            </MUITableCell>
                            <MUITableCell>
                                <Typography variant='h6'><TextField color="secondary" focused /></Typography>
                            </MUITableCell>
                        </TableRow>
                        <TableRow style={{marginTop:"20px"}}>
                            <MUITableCell>
                                <Typography variant='body2'>Сумма досрочного погашения</Typography>
                            </MUITableCell>
                            <MUITableCell>
                                <Typography variant='h6'><TextField color="secondary" focused /></Typography>
                            </MUITableCell>
                        </TableRow>
                    </TableBody>
                    </Table>
                </Box>
                </Grid>
                <Button 
                    style={{width: '300px',marginTop:"20px",marginRight:"auto",marginLeft:"auto"}}
                    variant='contained' 
                    >Оплатить</Button>
            </Grid>
            </CardContent>
        
        </Card>
    </>
  )
}

export default EarlyCard
