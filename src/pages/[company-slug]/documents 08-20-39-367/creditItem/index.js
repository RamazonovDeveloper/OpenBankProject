import { useEffect, useState } from 'react'

import { Box, Card, Grid, Table, TableBody, TableRow, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import TableCell from '@mui/material/TableCell'
import useDocumentsFilter from 'src/hooks/useDocuments'
import HorizontalLinearStepper from 'src/views/components/stepper/HorizontalLinearStepper'

import EIMZO from 'src/lib/Eimzo'
import useEimzo from 'src/hooks/useEimzo'

const DocumentsCreditItem = props => {
  console.log('DocumentsCreditItem props is ........', props)

  const [certificates, setCertificates] = useState([])
  const EIMZOClient = new EIMZO()

  const { loadKey, createPkcs7, append_pkcs7_attached } = useEimzo()
  const { singleDocument, getDocumentsByItsId, setSingleDocument } = useDocumentsFilter()

  useEffect(() => {
    getDocumentsByItsId(props)
  }, [])

  useEffect(() => {
    const listAllKeys = async () => {
      const certs = await EIMZOClient.install()
      const data = await EIMZOClient.listAllUserKeys()
      console.log(data)
      setCertificates(data)
    }
    listAllKeys()
  }, [])

  const MUITableCell = styled(TableCell)(({ theme }) => ({
    borderBottom: 0,
    padding: `${theme.spacing(1, 0)} !important`
  }))

  const putHash = async () => {
    let companyInfo = JSON.parse(localStorage.getItem('companyInfo'))
    if (companyInfo) {
      let companyInn = companyInfo.inn

      let itm = certificates.filter(item => {
        return item.TIN == companyInn
      })[0]

      console.log('itm', itm)

      if (itm) {
        const key = await loadKey(itm)
        console.log('key itm', key)

        let hash
        if (data.pkcs7) {
          hash = await append_pkcs7_attached(data.pkcs7, key.id)
          console.log('loan hash hash', hash)

          let paramas = {
            uuid_code: data.uuid_code,
            hash: hash.pkcs7_64
          }
          setSighnToDocument(paramas)
          getInfo()
          setOpen(true)
        } else {
          hash = await createPkcs7(key)
          console.log('false')
          console.log('loan hash', hash)

          let paramas = {
            uuid_code: data.uuid_code,
            hash: hash
          }
          setSighnToDocument(paramas)
          getInfo()
          setOpen(true)
        }
      }
    }
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
                <Typography sx={{ fontSize: '17px', color: '#342C2C' }}>23.06.2023, 11:45</Typography>
              </MUITableCell>
            </TableRow>
            <TableRow>
              <MUITableCell>
                <Typography sx={{ fontSize: '17px', color: '#777373' }}>Документ</Typography>
              </MUITableCell>
              <MUITableCell>
                <Typography sx={{ fontSize: '17px', color: '#342C2C' }}>
                  Договор возмездного оказания услуг №1 от 08.06.2023 г.
                </Typography>
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
                  {singleDocument && <iframe width='100%' src={singleDocument?.link} frameBorder='0'></iframe>}
                  {/* <iframe width='100%' src='/sample.pdf' frameborder="0"></iframe> */}
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
                  <button className='main_btn' style={{ textTransform: 'capitalize' }}>
                    PDF{' '}
                    <span>
                      <img src='/images/transaction/downloadIcon.png' />
                    </span>
                  </button>
                </Box>
              </Box>
            </Card>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'end', marginTop: '100px', marginBottom: '0px' }}>
          <Box sx={{ display: 'flex', gap: '20px' }}>
            <button className='main_btn gray_btn'>Отклонить</button>
            <button className='main_btn' onClick={() => putHash()}>
              Подписать
            </button>
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

export default DocumentsCreditItem
