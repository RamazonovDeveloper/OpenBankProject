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
import useStorage from 'src/hooks/useStorage'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

const MUITableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: 0,
  padding: `${theme.spacing(1, 0)} !important`
}))

const CalcWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  '&:not(:last-of-type)': {
    marginBottom: theme.spacing(2)
  }
}))

const LoanAgreementCard = ({ data }) => {
  const [companyInfo] = useStorage('companyInfo', '', window.localStorage)

  console.log('LoanAgreementCard SINGLE DATA IS :')
  console.log(data)

  // ** Hook
  const theme = useTheme()
  if (data !== null) {
    return (
      <Card>
        <CardContent>
          <Typography style={{ marginBottom: '20px' }} variant='h6'>
            Документ
          </Typography>
          <Grid container>
            <Grid item sm={12} xs={12} sx={{ mb: { sm: 0, xs: 4 } }}>
              <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
                <Table>
                  <TableBody>
                    {/* ID START*/}
                    <TableRow>
                      <MUITableCell>
                        <Typography variant='body1'>ID:</Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography variant='body2'>{data.id}</Typography>
                      </MUITableCell>
                    </TableRow>
                    {/* ID END */}
                    <TableRow>
                      <MUITableCell>
                        <Typography variant='body1'>Организация</Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography variant='body2'>{data.sender}</Typography>
                        {/* <Typography variant='body2'>Agrobank ATB Shayxontoxur Filiali</Typography> */}
                      </MUITableCell>
                    </TableRow>
                    <TableRow>
                      <MUITableCell>
                        <Typography variant='body1'>Дата:</Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography variant='body2'>{data.date}</Typography>
                      </MUITableCell>
                    </TableRow>
                    <TableRow>
                      <MUITableCell>
                        <Typography variant='body1'>Тип документа:</Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography variant='body2'>{data.type}</Typography>
                      </MUITableCell>
                    </TableRow>
                    {/* <TableRow>
                      <MUITableCell>
                        <Typography variant='body1'>Название документа: </Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography variant='body2'>Айланма маблагни тулдириш кредити шартномаси</Typography>
                      </MUITableCell>
                    </TableRow>
                    <TableRow>
                      <MUITableCell>
                        <Typography variant='body1'>Статус подписания: </Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography variant='body2'>В ожидании подписи</Typography>
                      </MUITableCell>
                    </TableRow> */}
                  </TableBody>
                </Table>
              </Box>
            </Grid>
          </Grid>
        </CardContent>

        <Divider
          sx={{ mt: theme => `${theme.spacing(6.5)} !important`, mb: theme => `${theme.spacing(5.5)} !important` }}
        />

        <CardContent>
          <Grid container>
            <Grid item xs={12} sm={12} sx={{ mb: { lg: 0, xs: 4 } }}>
              <div>
                <Typography variant='h6' sx={{ mb: 3, color: 'text.primary', letterSpacing: '.1px' }}>
                  Подписанты
                </Typography>
                {/* <TableContainer>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <MUITableCell>
                          <Typography variant='body1'>Организация</Typography>
                        </MUITableCell>
                        <MUITableCell>
                          <Typography variant='body2'>Agrobank ATB Shayxontoxur Filiali</Typography>
                        </MUITableCell>
                      </TableRow>
                      <TableRow>
                        <MUITableCell>
                          <Typography variant='body1'>Дата</Typography>
                        </MUITableCell>
                        <MUITableCell>
                          <Typography variant='body2'>20.05.2023 09:03:18</Typography>
                        </MUITableCell>
                      </TableRow>
                      <TableRow>
                        <MUITableCell>
                          <Typography variant='body1'>Подписант</Typography>
                        </MUITableCell>
                        <MUITableCell>
                          <Typography variant='body2'>Alisher Sheraliyev Ibroximovich</Typography>
                        </MUITableCell>
                      </TableRow>
                      <TableRow>
                        <MUITableCell>
                          <Typography variant='body1'>Подпись: </Typography>
                        </MUITableCell>
                        <MUITableCell>
                          <Typography variant='body2'></Typography>
                        </MUITableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer> */}
              </div>
            </Grid>
            {data.signers.length > 0 ? (
              data.signers.map((item, index) => {
                return (
                  <Grid key={index} item xs={12} sm={12} sx={{ my: 5, mb: { lg: 0, xs: 4 } }}>
                    <TableContainer>
                      <TableContainer>
                        <TableBody>
                          <TableRow>
                            <MUITableCell>
                              <Typography width={240} variant='body1'>
                                Организация
                              </Typography>
                            </MUITableCell>
                            <MUITableCell>
                              <Typography variant='body2'>{item.company_name}</Typography>
                            </MUITableCell>
                          </TableRow>
                          <TableRow>
                            <MUITableCell>
                              <Typography variant='body1'>Дата</Typography>
                            </MUITableCell>
                            <MUITableCell>
                              <Typography variant='body2'>{item.signing_time}</Typography>
                            </MUITableCell>
                          </TableRow>
                          <TableRow>
                            <MUITableCell>
                              <Typography variant='body1'>Подписант</Typography>
                            </MUITableCell>
                            <MUITableCell>
                              <Typography variant='body2'>
                                {item.first_name} {item.last_name}
                              </Typography>
                            </MUITableCell>
                          </TableRow>
                          <TableRow>
                            <MUITableCell>
                              <Typography variant='body1'>Подпись: </Typography>
                            </MUITableCell>
                            <MUITableCell>
                              <Typography variant='body2'>{item.certificate}</Typography>
                            </MUITableCell>
                          </TableRow>
                        </TableBody>
                      </TableContainer>
                    </TableContainer>

                    <Divider
                      sx={{
                        mt: theme => `${theme.spacing(6.5)} !important`,
                        mb: theme => `${theme.spacing(5.5)} !important`
                      }}
                    />
                  </Grid>
                )
              })
            ) : (
              <Typography variant='body' sx={{ mb: 3, color: 'text.primary', letterSpacing: '.1px' }}>
                Пока нет подписантов
              </Typography>
            )}
            {/* <Grid item xs={12} sm={12} sx={{ my: 5, mb: { lg: 0, xs: 4 } }}>
              <div>
              <TableContainer>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <MUITableCell>
                          <Typography variant='body1'>Организация</Typography>
                        </MUITableCell>
                        <MUITableCell>
                          <Typography variant='body2'>Agrobank ATB Shayxontoxur Filiali</Typography>
                        </MUITableCell>
                      </TableRow>
                      <TableRow>
                        <MUITableCell>
                          <Typography variant='body1'>Дата</Typography>
                        </MUITableCell>
                        <MUITableCell>
                          <Typography variant='body2'>20.05.2023 09:03:18</Typography>
                        </MUITableCell>
                      </TableRow>
                      <TableRow>
                        <MUITableCell>
                          <Typography variant='body1'>Подписант</Typography>
                        </MUITableCell>
                        <MUITableCell>
                          <Typography variant='body2'>Alisher Sheraliyev Ibroximovich</Typography>
                        </MUITableCell>
                      </TableRow>
                      <TableRow>
                        <MUITableCell>
                          <Typography variant='body1'>Подпись: </Typography>
                        </MUITableCell>
                        <MUITableCell>
                          <Typography variant='body2'></Typography>
                        </MUITableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              <TableContainer>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <MUITableCell>
                          <Typography variant='body1'>Наименование отправителя:</Typography>
                        </MUITableCell>
                        <MUITableCell>
                          <Typography variant='body1'>{companyInfo?.name}</Typography>
                        </MUITableCell>
                      </TableRow>
                      <TableRow>
                        <MUITableCell>
                          <Typography variant='body1'>ИНН отправителя:</Typography>
                        </MUITableCell>
                        <MUITableCell>
                          <Typography variant='body2'>{companyInfo?.inn}</Typography>
                        </MUITableCell>
                      </TableRow>
                      <TableRow>
                        <MUITableCell>
                          <Typography variant='body1'>Счет отправителя:</Typography>
                        </MUITableCell>
                        <MUITableCell>
                          <Typography variant='body2'>{data.doc_account}</Typography>
                        </MUITableCell>
                      </TableRow>
                      <TableRow>
                        <MUITableCell>
                          <Typography variant='body1'>МФО банка:</Typography>
                        </MUITableCell>
                        <MUITableCell>
                          <Typography variant='body2'>{data.doc_mfo}</Typography>
                        </MUITableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </Grid> */}
          </Grid>
        </CardContent>
        <Divider sx={{ mt: theme => `${theme.spacing(4.5)} !important`, mb: '0 !important' }} />
      </Card>
    )
  } else {
    return null
  }
}

export default LoanAgreementCard
