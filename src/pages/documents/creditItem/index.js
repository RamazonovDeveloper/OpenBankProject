import { Box, Card, Grid, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import TableCell from '@mui/material/TableCell'
import { useEffect, useRef, useState } from 'react'
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



  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false)
  const pdfRef = useRef(null)

  const handleScroll = () => {
    const pdfElement = pdfRef.current

    if (pdfElement) {
      const { scrollTop, scrollHeight, clientHeight } = pdfElement

      if (scrollTop + clientHeight >= scrollHeight) {
        setIsScrolledToBottom(true)
      } else {
        setIsScrolledToBottom(false)
      }
      console.log('scrollTop is :' + scrollTop + 'scrollHeight' + scrollHeight + 'clientHeight' + scrollHeight);
    }

    console.log('TTTTTTTTTTTTTTTTTTTTTTTTTTTT')
    console.log(isScrolledToBottom)
  }

  return (
    <Grid>
      <Card sx={{ padding: '20px' }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 3fr' }}>
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
        {/* <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'stretch', gap: '30px', mt: '20px' }}> */}
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
                        borderBottom: singleDocument.signers.length != index + 1 ? '1px solid #D2D0D0' : 'none'
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
                gap: '10px'
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '20px' }}>
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
              <Box>
                <Box
                  sx={{
                    backgroundColor: '#D2D0D0',
                    padding: '15px 10px',
                    borderRadius: '9px',
                    width: '100%',
                    minHeight: '300px',
                    marginTop: '20px'
                  }}
                >
                  <Typography sx={{ color: '#342C2C', mb: '15px' }}>Договор возмездного оказания ...</Typography>
                  {singleDocument && (
                    // <iframe
                    //   ref={pdfRef}
                    //   onScroll={handleScroll}
                    //   width='100%'
                    //   height={'300px'}
                    //   src={singleDocument?.link}
                    //   frameBorder='0'
                    // ></iframe>
                    <div ref={pdfRef} onScroll={handleScroll} style={{ height: '300px', overflowY: 'scroll'}}>
                      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odit dolor voluptate sequi eius perspiciatis laudantium accusamus deleniti assumenda exercitationem beatae facere expedita similique non earum molestias consectetur, alias id amet repellat iure saepe aperiam, cumque atque. Voluptates distinctio doloribus, pariatur commodi debitis architecto aut aliquam quos perspiciatis omnis voluptatem nulla quo! Consequatur dolorem quis quaerat voluptatibus aut, repudiandae saepe fugit quam praesentium, perferendis a excepturi quo. Eligendi accusamus enim similique cum esse vero deleniti magni odio modi cupiditate excepturi sint eveniet, quas vitae atque expedita fuga quaerat temporibus in molestiae voluptatum? Fugiat ipsam magnam quo voluptatibus eum nobis iste placeat animi illum. Perferendis molestiae ducimus excepturi quam rem dicta, eius nam dignissimos dolore, aperiam fugit quisquam officiis ea adipisci incidunt doloremque error est quasi placeat iusto? Tempore voluptatibus aliquam nulla fugiat cum omnis veritatis voluptatem, modi laudantium, vitae architecto pariatur optio earum est tenetur ipsam quod placeat minima maxime nihil. Fugit, labore modi, libero repellat hic non voluptatem quas reiciendis, dicta vel debitis aliquid eligendi tempora similique. Labore, ipsam atque. Quae necessitatibus qui autem sit suscipit, eligendi nostrum reiciendis sint voluptatibus! Repellendus perspiciatis eum aperiam sapiente, deserunt laborum sed aliquid suscipit! Sunt suscipit corporis deserunt dolorum impedit labore illo obcaecati dolore sequi cum perferendis est provident officia ex voluptas, quae culpa, quis magnam eos repellendus laudantium delectus blanditiis fuga? Quod illo eaque nobis sed molestiae voluptas amet perferendis ut vel, ducimus error quis ullam perspiciatis harum suscipit laborum placeat quasi, architecto veritatis sequi! Amet, fugit molestias. Nostrum cum excepturi iusto dolores consequatur nobis fuga velit atque consequuntur iste pariatur hic necessitatibus dolor, enim quisquam! Impedit sint, rerum, voluptate ullam maxime accusamus porro voluptatibus et deserunt tempora aut consectetur facere quam ducimus nam consequuntur a excepturi neque. Nostrum, facilis. Assumenda sint, ipsa aspernatur explicabo eius quidem atque necessitatibus. Cum, officia eaque!</p>
                      <p>salom bu label</p>
                    </div>
                  )}
                  {/* <iframe width='100%' src='/sample.pdf' frameborder="0"></iframe> */}
                </Box>
              </Box>
            </Card>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'end', marginTop: '100px', marginBottom: '0px' }}>
          {singleDocument && <DocumentAction data={singleDocument} isScrolledToBottom={isScrolledToBottom} getInfo={getDocumentsByItsId} />}
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
