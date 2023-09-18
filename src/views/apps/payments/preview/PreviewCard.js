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

const PreviewCard = ({ data }) => {
  const [companyInfo] = useStorage('companyInfo', '', window.localStorage)

  // ** Hook
  const theme = useTheme()
  if (data !== null) {
    return (
      <Card>
        <CardContent>
          <Grid container>
            <Grid item sm={12} xs={12} sx={{ mb: { sm: 0, xs: 4 } }}>
              <Box>
                <Table>
                  <TableBody>
                    <TableRow>
                      <MUITableCell>
                        <Typography variant='body1'>Документ</Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography variant='body2'>{data.id}</Typography>
                      </MUITableCell>
                    </TableRow>
                    <TableRow>
                      <MUITableCell>
                        <Typography variant='body1'>Дата оплаты:</Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography variant='body2'>{data.sent_date}</Typography>
                      </MUITableCell>
                    </TableRow>
                    <TableRow>
                      <MUITableCell>
                        <Typography variant='body1'>Статус:</Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography variant='body2'>Создан</Typography>
                      </MUITableCell>
                    </TableRow>
                    <TableRow>
                      <MUITableCell>
                        <Typography variant='body1'>Сумма оплаты: </Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography variant='body2'>{data.amount} UZS</Typography>
                      </MUITableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Grid>
          </Grid>
        </CardContent>

        <Divider
          sx={{ mt: theme => `${theme.spacing(3.5)} !important`, mb: theme => `${theme.spacing(3.5)} !important` }}
        />

        <CardContent>
          <Grid container>
            <Grid item xs={12} sm={12} sx={{ my: 5, mb: { lg: 0, xs: 4 } }}>
              <div>
                <Typography variant='h6' sx={{ mb: 3, color: 'text.primary', letterSpacing: '.1px' }}>
                  Получатель:
                </Typography>
                <TableContainer>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <MUITableCell>
                          <Typography variant='body1'>Наименование :</Typography>
                        </MUITableCell>
                        <MUITableCell>
                          <Typography variant='body2'>{data.receiver_name}</Typography>
                        </MUITableCell>
                      </TableRow>
                      <TableRow>
                        <MUITableCell>
                          <Typography variant='body1'>ИНН :</Typography>
                        </MUITableCell>
                        <MUITableCell>
                          <Typography variant='body2'>{data.receiver_inn}</Typography>
                        </MUITableCell>
                      </TableRow>
                      <TableRow>
                        <MUITableCell>
                          <Typography variant='body1'>МФО банка:</Typography>
                        </MUITableCell>
                        <MUITableCell>
                          <Typography variant='body2'>{data.receiver_mfo}</Typography>
                        </MUITableCell>
                      </TableRow>
                      <TableRow>
                        <MUITableCell>
                          <Typography variant='body1'>Счет :</Typography>
                        </MUITableCell>
                        <MUITableCell>
                          <Typography variant='body2'>{data.receiver_account}</Typography>
                        </MUITableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </Grid>
          </Grid>

          <Divider
            sx={{ mt: theme => `${theme.spacing(3.5)} !important`, mb: theme => `${theme.spacing(3.5)} !important` }}
          />

          <Grid item sm={12} xs={12} sx={{ my: 5 }}>
            <Box>
              <Table>
                <TableBody>
                  <TableRow>
                    <MUITableCell>
                      <Typography variant='h6'>Детали платежа:</Typography>
                    </MUITableCell>
                  </TableRow>
                  <TableRow>
                    <MUITableCell width={340}>
                      <Typography variant='body1'>Код назначения: </Typography>
                    </MUITableCell>
                    <MUITableCell>
                      <Typography variant='body2'>{data.purpose_code}</Typography>
                    </MUITableCell>
                  </TableRow>
                  <TableRow>
                    <MUITableCell>
                      <Typography variant='body1'>Назначение платежа:</Typography>
                    </MUITableCell>
                    <MUITableCell>
                      <Typography variant='body2'>{data.purpose}</Typography>
                    </MUITableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Grid>

          <Divider
            sx={{ mt: theme => `${theme.spacing(3.5)} !important`, mb: theme => `${theme.spacing(3.5)} !important` }}
          />

          <Grid item xs={12} sm={12} sx={{ mb: { lg: 0, xs: 4 } }}>
            <div>
              <Typography variant='h6' sx={{ mb: 3, color: 'text.primary', letterSpacing: '.1px' }}>
                Отправитель:
              </Typography>
              <TableContainer>
                <Table>
                  <TableBody>
                    <TableRow>
                      <MUITableCell>
                        <Typography width={280} variant='body1'>
                          Наименование :
                        </Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography variant='body2'>{companyInfo?.name}</Typography>
                      </MUITableCell>
                    </TableRow>
                    <TableRow>
                      <MUITableCell>
                        <Typography variant='body1'>ИНН отпавителя:</Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography variant='body2'>{companyInfo?.inn}</Typography>
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
                    <TableRow>
                      <MUITableCell>
                        <Typography variant='body1'>Счет :</Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography variant='body2'>{data.doc_account}</Typography>
                      </MUITableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Grid>
        </CardContent>
        <Divider sx={{ mt: theme => `${theme.spacing(4.5)} !important`, mb: '0 !important' }} />
      </Card>
    )
  } else {
    return null
  }
}

export default PreviewCard
