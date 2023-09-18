import { Box, Card, Grid, Table, TableBody, TableRow, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import TableCell from '@mui/material/TableCell'
import { useEffect } from 'react'
import useDocumentsFilter from 'src/hooks/useDocuments'
import DocumentAction from 'src/views/apps/document/preview/DocumentAction'
import DocumentPreviewStatus from 'src/views/components/Status/DocumentPreviewStatus'
import HorizontalLinearStepper from 'src/views/components/stepper/HorizontalLinearStepper'
import HorizontalLinearStepperMain from 'src/views/components/stepper/HorizontalLinearStepperMain'

const DocumentsCreditItem = ({ props }) => {
  console.log('DocumentsCreditItem props is ........', props)

  const { singleDocument, getDocumentsByItsId, setSingleDocument } = useDocumentsFilter()

  useEffect(() => {
    getDocumentsByItsId(props)
  }, [])

  console.log('DocumentsCreditItem singleDocument -> ', singleDocument)

  const MUITableCell = styled(TableCell)(({ theme }) => ({
    borderBottom: 0,
    padding: `${theme.spacing(1, 0)} !important`
  }))

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
                          <DocumentPreviewStatus status={item.has_signed} />
                        </Typography>
                      </Box>
                    </Box>
                  )
                })
              ) : (
                <Typography sx={{ my: '40px', fontSize: '20px' }}>Пока нет подписантов</Typography>
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
                <Box sx={{ backgroundColor: '#D2D0D0', padding: '15px 10px', borderRadius: '9px', width: '243px' }}>
                  <Typography sx={{ color: '#342C2C', mb: '15px' }}>Договор возмездного оказания ...</Typography>
                  {singleDocument && <iframe width='100%' src={singleDocument?.link} frameBorder='0'></iframe>}
                  {/* <iframe width='100%' src='/sample.pdf' frameborder="0"></iframe> */}
                </Box>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
                <Box sx={{}}>
                  <Typography sx={{ marginBottom: '8px', fontSize: '14px', letterSpacing: '-0.8px' }}>
                    Отправить на печать
                  </Typography>
                  <a
                    href=''
                    onClick={event => {
                      event.preventDefault()
                      window.open(singleDocument.link, 'PRINT', 'height=auto,width=auto')
                    }}
                    className='action_btn'
                    style={{ textTransform: 'capitalize', textDecoration: 'none' }}
                  >
                    Печать{' '}
                    <span>
                      <img src='/images/transaction/printIcon.png' />
                    </span>
                  </a>
                </Box>
                <Box sx={{}}>
                  <Typography sx={{ marginBottom: '8px', fontSize: '14px', letterSpacing: '-0.8px' }}>
                    Сохранить{' '}
                  </Typography>
                  <a
                    href={singleDocument.link}
                    target='_blank'
                    className='action_btn'
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

export default DocumentsCreditItem
