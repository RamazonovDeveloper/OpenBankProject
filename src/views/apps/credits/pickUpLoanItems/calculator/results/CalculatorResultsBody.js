import {React, useState} from 'react'
import { Box, Button, Card, CardContent, Grid } from '@mui/material'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableContainer from '@mui/material/TableContainer';
import TableCell from '@mui/material/TableCell'
import { styled, useTheme } from '@mui/material/styles'
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal';


export default function () {

    
const MUITableCell = styled(TableCell)(({ theme }) => ({
    borderBottom: 0,
    padding: `${theme.spacing(1, 0)} !important`
  }))

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const rows = [
    {
        id:1,
        date:"25.02.2023",
        amount:"100 000.00 UZS"
    },
    {
        id:2,
        date:"25.02.2023",
        amount:"100 000.00 UZS"
    },
    {
        id:3,
        date:"25.02.2023",
        amount:"100 000.00 UZS"
    },
  ]


  return (
    <div>
      <Card>
        <CardContent>
          <Grid container>
            <Grid item md={8} sm={9} xs={12} sx={{ mb: { sm: 0, xs: 4 } }}>
              <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
                <Table>
                  <TableBody>
                    <TableRow>
                      <MUITableCell>
                        <Typography variant='body2'>Сумма кредита</Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography variant='body2'>Ставка</Typography>
                      </MUITableCell>
                    </TableRow>
                    <TableRow>
                      <MUITableCell>
                        <Typography variant='h6'> 3 000 000.00 UZS </Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography variant='h6'>4%</Typography>
                      </MUITableCell>
                    </TableRow>
                    <TableRow>
                      <MUITableCell>
                        <Typography variant='body2'>Срок кредита</Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography variant='body2'>Тип платежа</Typography>
                      </MUITableCell>
                    </TableRow>
                    <TableRow>
                      <MUITableCell>
                        <Typography variant='h6'>20 лет 11 месяцев</Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography variant='h6'>Аннуитентный</Typography>
                      </MUITableCell>
                    </TableRow>
                    
                  </TableBody>
                </Table>
              </Box>
            </Grid>
            <Grid item md={12} sm={12} xs={12} sx={{ mt: { sm: 10, xs: 10 } }}>
                <Typography variant='h5'>График погашения</Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 300 }} aria-label="custom pagination table">
                        <TableBody>
                        {rows.map((row) => (
                            <TableRow onClick={() => handleOpen()} key={row.name}>
                                <TableCell style={{ width: "5px" }}>
                                    {row.id}
                                </TableCell>
                                <TableCell style={{ width: "5px" }} >
                                    {/* align="right" */}
                                    {row.date}
                                </TableCell>
                                <TableCell style={{ width: 5 }} align="left">
                                    {row.amount}
                                </TableCell>
                            </TableRow>
                        ))}
                        {/* {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                            </TableRow>
                        )} */}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
          </Grid>
        </CardContent>
    </Card>

    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
            25.02.2023
            </Typography>
            <TableBody>
                <TableRow style={{width:"100%",display:"flex", justifyContent:"space-between"}}>
                    <MUITableCell>
                        <Typography variant='body2'>Основная сумма</Typography>
                    </MUITableCell>
                    <MUITableCell>
                        <Typography variant='h6'> 100 000.00 UZS</Typography>
                    </MUITableCell>
                </TableRow>
                <TableRow style={{width:"100%",display:"flex", justifyContent:"space-between"}}>
                    <MUITableCell>
                        <Typography variant='body2'>Начисленные проценты</Typography>
                    </MUITableCell>
                    <MUITableCell>
                        <Typography variant='h6'>  50 000.00 UZS</Typography>
                    </MUITableCell>
                </TableRow>
                <TableRow style={{width:"100%",display:"flex", justifyContent:"space-between"}}>
                    <MUITableCell>
                        <Typography variant='body2'>Остаток</Typography>
                    </MUITableCell>
                    <MUITableCell>
                        <Typography variant='h6'>90 000 000.00 UZS</Typography>
                    </MUITableCell>
                </TableRow>
            </TableBody>
        </Box>
    </Modal>

    </div>
  )
}
