import { Box, Button, Card, Grid, Table, TableBody, TableRow, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import TableCell from '@mui/material/TableCell'
import { useEffect, useState } from 'react'
import useDocumentsFilter from 'src/hooks/useDocuments'
import DocumentAction from 'src/views/apps/document/preview/DocumentAction'
import HorizontalLinearStepper from 'src/views/components/stepper/HorizontalLinearStepper'
import HorizontalLinearStepperMain from 'src/views/components/stepper/HorizontalLinearStepperMain'

const PaymentDocumentsItem = ({ props }) => {
  const { singleDocument, getDocumentsByItsId, setSingleDocument } = useDocumentsFilter()

  console.log('singleDocument', singleDocument)

  useEffect(() => {
    getDocumentsByItsId(props)
  }, [])

  // console.log("7 7 7 7 7 7 7 PaymentDocumentsItem props is ........", singleDocument);

  const MUITableCell = styled(TableCell)(({ theme }) => ({
    borderBottom: 0,
    padding: `${theme.spacing(1, 0)} !important`
  }))

  const [state, setState] = useState(0)
  const [link, setLink] = useState('')

  const handleClick = props => {
    setState(props)
    setLink(singleDocument.rivals[props].link)
  }

  useEffect(() => {
    if (singleDocument) {
      if (singleDocument.rivals) {
        if (singleDocument.rivals.length > 0) {
          setLink(singleDocument.rivals[0].link)
        }
      }
    }
  }, [singleDocument])

  return (
    <Grid>
      <Card sx={{ padding: '20px', minHeight: '80vh' }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 3fr', mt: '20px' }}>
          <Box>
            <Typography sx={{ color: '#777373', fontSize: '17px', mb: '20px' }}>Дата создания документа</Typography>
            <Typography sx={{ color: '#777373', fontSize: '17px', mb: '20px' }}>Документ</Typography>
            <Typography sx={{ color: '#777373', fontSize: '17px', mb: '20px' }}>Инициатор</Typography>
            <Typography sx={{ color: '#777373', fontSize: '17px', mb: '20px' }}>Статус подписания</Typography>
          </Box>
          <Box>
            <Typography sx={{ color: '#342C2C', fontSize: '17px', mb: '20px' }}>{singleDocument.date}</Typography>
            <Typography sx={{ color: '#342C2C', fontSize: '17px', mb: '20px' }}>{singleDocument.name}</Typography>
            <Typography sx={{ color: '#342C2C', fontSize: '17px', mb: '20px' }}>{singleDocument.employee}</Typography>
            <Typography sx={{ color: '#342C2C', fontSize: '17px', mb: '20px' }}>
              <Typography sx={{ fontSize: '17px', color: '#342C2C', width: '30%' }}>
                <HorizontalLinearStepperMain data={singleDocument.signers} />
              </Typography>
            </Typography>
          </Box>
        </Box>
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

              {singleDocument.signers?.length > 0 ? (
                singleDocument.signers?.map((item, index) => {
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
                        <Typography sx={{ color: '#342C2C', fontSize: '17px' }}>
                          {item.signer || 'not found'}
                        </Typography>
                        <Typography sx={{ color: '#777373', fontSize: '17px' }}>
                          {item.full_name || 'not found'}
                        </Typography>
                        <Typography sx={{ color: '#342C2C', fontSize: '17px' }}>
                          {item.has_signed ? (
                            <>
                              <span
                                style={{
                                  width: '10px',
                                  height: '10px',
                                  backgroundColor: '#4E0F8A',
                                  display: 'inline-block',
                                  borderRadius: '50%'
                                }}
                              ></span>{' '}
                              Подписан {item.signing_time}
                            </>
                          ) : (
                            <>
                              <span
                                style={{
                                  width: '10px',
                                  height: '10px',
                                  backgroundColor: '#D23232',
                                  display: 'inline-block',
                                  borderRadius: '50%'
                                }}
                              ></span>{' '}
                              На рассмотрении {item.signing_time}
                            </>
                          )}
                        </Typography>
                      </Box>
                    </Box>
                  )
                })
              ) : (
                <Typography sx={{ my: '40px', fontSize: '20px' }}>Пока нет подписантов</Typography>
              )}
              {singleDocument.rivals && singleDocument.rivals.length > 0 && (
                <Box sx={{ display: 'grid', padding: '20px 0' }}>
                  <Typography sx={{ color: '#342C2C', fontSize: '17px', fontWeight: '500', marginBottom: '10px' }}>
                    Выберите страховую компанию
                  </Typography>
                  <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', rowGap: '20px' }}>
                    {singleDocument.rivals.map((item, index) => {
                      return (
                        <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                          <input
                            className='my_radio_input'
                            name='insurance'
                            defaultChecked={index == state ? true : false}
                            onClick={() => handleClick(index)}
                            id={item.uuid_code}
                            type='radio'
                          />
                          <label style={{ display: 'flex', alignItems: 'center' }} htmlFor={item.uuid_code}>
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
                </Box>
              )}
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
                    <iframe width='100%' src={link ? link : singleDocument.link} frameBorder='0'></iframe>
                  )}
                </Box>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
                <Box sx={{}}>
                  <Typography sx={{ marginBottom: '8px', fontSize: '15px' }}>Отправить на печать</Typography>
                  <a
                    href=''
                    onClick={event => {
                      event.preventDefault()
                      window.open(link ? link : singleDocument.link, 'PRINT', 'height=auto,width=auto')
                    }}
                    className='main_btn'
                    style={{ textTransform: 'capitalize', textDecoration: 'none' }}
                  >
                    Печать{' '}
                    <span>
                      <img src='/images/transaction/printIcon.png' />
                    </span>
                  </a>
                </Box>
                <Box sx={{}}>
                  <Typography sx={{ marginBottom: '8px', fontSize: '15px' }}>Сохранить </Typography>
                  <a
                    href={link ? link : singleDocument.link}
                    target='_blank'
                    className='main_btn'
                    style={{ textTransform: 'capitalize', textDecoration: 'none' }}
                    rel='noreferrer'
                  >
                    PDF{' '}
                    <span>
                      <img src='/images/transaction/downloadIcon.png' />
                    </span>
                  </a>
                </Box>
              </Box>
            </Card>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'end', marginTop: '100px', marginBottom: '0px' }}>
          {singleDocument && <DocumentAction data={singleDocument} getInfo={getDocumentsByItsId} />}
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
