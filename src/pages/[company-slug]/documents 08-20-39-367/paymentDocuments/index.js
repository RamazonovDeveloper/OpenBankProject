import { Box, Card, Grid, Table, TableBody, TableRow, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import TableCell from '@mui/material/TableCell'
import { useEffect, useState } from 'react'
import useDocumentsFilter from 'src/hooks/useDocuments'
import HorizontalLinearStepper from 'src/views/components/stepper/HorizontalLinearStepper'

const PaymentDocumentsItem = ({ props }) => {
  // const { paymentId } = props

  const { singleDocument, getDocumentsByItsId, setSingleDocument } = useDocumentsFilter()

  useEffect(() => {
    getDocumentsByItsId(props)
  }, [])

  console.log('7 7 7 7 7 7 7 PaymentDocumentsItem props is ........', props)
  console.log('7 7 7 7 7 7 7 PaymentDocumentsItem props is ........', singleDocument)

  const MUITableCell = styled(TableCell)(({ theme }) => ({
    borderBottom: 0,
    padding: `${theme.spacing(1, 0)} !important`
  }))

  const [state, setState] = useState(0)

  const handleClick = props => {
    setState(props)
  }

  return (
    <Grid>
      <Card sx={{ padding: '20px', minHeight: '80vh' }}>
        <Table sx={{ borderCollapse: 'separate', borderSpacing: '0px 10px' }}>
          <TableBody>
            <TableRow>
              <MUITableCell>
                <Typography sx={{ fontSize: '17px', color: '#777373' }}>Дата создания документа</Typography>
              </MUITableCell>
              <MUITableCell>
                <Typography sx={{ fontSize: '17px', color: '#342C2C' }}>{singleDocument.date}</Typography>
              </MUITableCell>
            </TableRow>
            <TableRow>
              <MUITableCell>
                <Typography sx={{ fontSize: '17px', color: '#777373' }}>Документ</Typography>
              </MUITableCell>
              <MUITableCell>
                <Typography sx={{ fontSize: '17px', color: '#342C2C' }}>{singleDocument.name}</Typography>
              </MUITableCell>
            </TableRow>
            <TableRow>
              <MUITableCell>
                <Typography sx={{ fontSize: '17px', color: '#777373' }}>Инициатор</Typography>
              </MUITableCell>
              <MUITableCell>
                <Typography sx={{ fontSize: '17px', color: '#342C2C' }}>Давлатов Фуркат Бахтийорович</Typography>
              </MUITableCell>
            </TableRow>
            <TableRow>
              <MUITableCell>
                <Typography sx={{ fontSize: '17px', color: '#777373' }}>Статус подписания</Typography>
              </MUITableCell>
              <MUITableCell>
                <Typography sx={{ fontSize: '17px', color: '#342C2C', width: '30%' }}>
                  <HorizontalLinearStepper signers={singleDocument.signers || []} />
                </Typography>
              </MUITableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', mt: '20px' }}>
          <Box>
            <Typography sx={{ color: '#342C2C', fontSize: '17px', fontWeight: '500', marginBottom: '10px' }}>
              Подписанты
            </Typography>
            <Card sx={{ padding: '0 20px', backgroundColor: '#EEEEEE', boxShadow: 'none' }}>
              {/* <Box sx={{display:"grid", padding:"20px 0", gridTemplateColumns:"3fr 4fr", borderBottom:"1px solid #D2D0D0"}}>
                            <Box sx={{display:"flex", flexDirection:"column", color:"#777373",  rowGap:"20px"}}>
                                <Typography sx={{color:"#777373", fontSize:"17px"}}>Наименование организации</Typography>
                                <Typography sx={{color:"#777373", fontSize:"17px"}}>ФИО подписанта</Typography>
                                <Typography sx={{color:"#777373", fontSize:"17px"}}>Статус подписания</Typography>
                            </Box>
                            <Box sx={{display:"flex", flexDirection:"column", rowGap:"20px"}}>
                                <Typography sx={{color:"#342C2C", fontSize:"17px"}}>ООО “Компания”</Typography>
                                <Typography sx={{color:"#342C2C", fontSize:"17px"}}>Давлатов  Фуркат Бахтийорович</Typography>
                                <Typography sx={{color:"#342C2C", fontSize:"17px"}}>Подписан 08.08.2023г.</Typography>
                            </Box>
                        </Box>
                        <Box sx={{display:"grid", padding:"20px 0", gridTemplateColumns:"3fr 4fr", borderBottom:"1px solid #D2D0D0"}}>
                            <Box sx={{display:"flex", flexDirection:"column", color:"#777373",  rowGap:"20px"}}>
                                <Typography sx={{color:"#777373", fontSize:"17px"}}>Наименование организации</Typography>
                                <Typography sx={{color:"#777373", fontSize:"17px"}}>ФИО подписанта</Typography>
                                <Typography sx={{color:"#777373", fontSize:"17px"}}>Статус подписания</Typography>
                            </Box>
                            <Box sx={{display:"flex", flexDirection:"column", rowGap:"20px"}}>
                                <Typography sx={{color:"#342C2C", fontSize:"17px"}}>ООО “Компания”</Typography>
                                <Typography sx={{color:"#342C2C", fontSize:"17px"}}>Давлатов  Фуркат Бахтийорович</Typography>
                                <Typography sx={{color:"#342C2C", fontSize:"17px"}}> <span style={{width:"10px", height:"10px", backgroundColor:"#4E0F8A", display:"inline-block", borderRadius:"50%"}}></span> Подписан 08.08.2023г. </Typography>
                            </Box>
                        </Box> */}

              {singleDocument.signers?.map((item, index) => {
                return (
                  <Box
                    key={index}
                    sx={{
                      display: 'grid',
                      padding: '20px 0',
                      gridTemplateColumns: '3fr 4fr',
                      borderBottom: '1px solid #D2D0D0'
                    }}
                  >
                    <Box sx={{ display: 'flex', flexDirection: 'column', color: '#777373', rowGap: '20px' }}>
                      <Typography sx={{ color: '#777373', fontSize: '17px' }}>Наименование организации</Typography>
                      <Typography sx={{ color: '#777373', fontSize: '17px' }}>ФИО подписанта</Typography>
                      <Typography sx={{ color: '#777373', fontSize: '17px' }}>Статус подписания</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: '20px' }}>
                      <Typography sx={{ color: '#342C2C', fontSize: '17px' }}>ООО “Компания”</Typography>
                      <Typography sx={{ color: '#342C2C', fontSize: '17px' }}>Давлатов Фуркат Бахтийорович</Typography>
                      <Typography sx={{ color: '#342C2C', fontSize: '17px' }}>
                        {' '}
                        <span
                          style={{
                            width: '10px',
                            height: '10px',
                            backgroundColor: '#4E0F8A',
                            display: 'inline-block',
                            borderRadius: '50%'
                          }}
                        ></span>{' '}
                        Подписан 08.08.2023г.{' '}
                      </Typography>
                    </Box>
                  </Box>
                )
              })}

              <Box sx={{ display: 'grid', padding: '20px 0' }}>
                <Typography sx={{ color: '#342C2C', fontSize: '17px', fontWeight: '500', marginBottom: '10px' }}>
                  Выберите страховую компанию
                </Typography>
                {singleDocument.insurances && (
                  <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', rowGap: '20px' }}>
                    {singleDocument.insurances.map((item, index) => {
                      return (
                        <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                          <input
                            className='my_radio_input'
                            name='insurance'
                            defaultChecked={index == state ? true : false}
                            onClick={() => handleClick(index)}
                            id='gross'
                            type='radio'
                          />
                          <label style={{ display: 'flex', alignItems: 'center' }} htmlFor='gross'>
                            {/* <img style={{marginLeft:"16px", marginRight:'6px',}} src="/images/gross.png" alt="" /> */}
                            <Typography
                              sx={{ fontSize: '17px', color: '#1D1515', lineHeight: '22px', marginLeft: '16px' }}
                            >
                              {item.name}
                            </Typography>
                          </label>
                        </Box>
                      )
                    })}
                  </Box>
                )}
              </Box>
            </Card>
          </Box>
          <Box>
            <Typography sx={{ color: '#342C2C', fontSize: '17px', fontWeight: '500', marginBottom: '10px' }}>
              Документ
            </Typography>
            <Card
              sx={{
                padding: '20px',
                backgroundColor: '#EEEEEE',
                boxShadow: 'none',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '10px'
              }}
            >
              <Box>
                <Box sx={{ backgroundColor: '#D2D0D0', padding: '15px 10px', borderRadius: '9px' }}>
                  <Typography sx={{ color: '#342C2C', mb: '15px' }}>Договор возмездного оказания ...</Typography>
                  {singleDocument && (
                    <iframe width='100%' src={singleDocument?.insurances[state]?.link} frameBorder='0'></iframe>
                  )}
                </Box>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
                <Box sx={{}}>
                  <Typography sx={{ marginBottom: '8px', fontSize: '15px' }}>Отправить на печать</Typography>
                  <button className='main_btn' style={{ textTransform: 'capitalize' }}>
                    Печать{' '}
                    <span>
                      <img src='/images/transaction/printIcon.png' />
                    </span>
                  </button>
                </Box>
                <Box sx={{}}>
                  <Typography sx={{ marginBottom: '8px', fontSize: '15px' }}>Сохранить </Typography>
                  {singleDocument && (
                    <button className='main_btn' style={{ textTransform: 'capitalize' }}>
                      <a
                        target='_blank'
                        href={singleDocument?.insurances[state]?.link}
                        download={true}
                        rel='noreferrer'
                        style={{ color: 'white', listStyleType: 'none' }}
                      >
                        PDF{' '}
                      </a>
                      <span>
                        <img src='/images/transaction/downloadIcon.png' />
                      </span>
                    </button>
                  )}
                </Box>
              </Box>
            </Card>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'end', marginTop: '100px', marginBottom: '0px' }}>
          <Box sx={{ display: 'flex', gap: '20px' }}>
            <button className='main_btn gray_btn'>Отклонить</button>
            <button className='main_btn'>Подписать</button>
          </Box>
        </Box>
      </Card>
      {/* <Card sx={{padding:"20px"}}>
            <Box sx={{display:"flex", justifyContent:"space-between", width:"60%"}}>
                <Typography>Дата создания документа</Typography>
                <Typography>23.06.2023, 11:45</Typography>
            </Box>
            <Box>
                <Typography>Документ</Typography>
                <Typography>Договор возмездного оказания услуг №1 от 08.06.2023 г.</Typography>
            </Box>
            <Box>
                <Typography>Инициатор</Typography>
                <Typography>Давлатов  Фуркат Бахтийорович</Typography>
            </Box>
        </Card> */}
    </Grid>
  )
}

export default PaymentDocumentsItem
